import { AuthApiError, authApi, getAccessToken } from '@/lib/auth-api';

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
const DASHBOARD_PATH = '/api/v1/dashboard/summary';

type JsonRecord = Record<string, unknown>;

export type WorkspaceDashboardSummary = {
  totalProjects: number;
  activeProjects: number;
  archivedProjects: number;
  projectsByStatus: Record<string, number>;
  totalTasks: number;
  tasksByStatus: Record<string, number>;
  completedTasks: number;
  overdueTasks: number;
  unassignedTasks: number;
  completionRate: number;
  overdueRate: number;
  averageCompletionTimeHours: number;
  tasksDueNext7Days: number;
  tasksDueNext30Days: number;
  activeUsers: number;
  recentActivityCount: number;
  generatedAt: string;
  rangeStart: string;
  rangeEnd: string;
};

const asRecord = (value: unknown): JsonRecord | null => (
  typeof value === 'object' && value !== null && !Array.isArray(value)
    ? value as JsonRecord
    : null
);

const correlationId = () => (
  globalThis.crypto?.randomUUID?.()
  ?? `dashboard-${Date.now()}-${Math.random().toString(16).slice(2)}`
);

const apiUrl = () => {
  if (!API_URL) {
    throw new AuthApiError('Arima API URL is not configured.');
  }
  return `${API_URL}${DASHBOARD_PATH}`;
};

const requiredNumber = (value: unknown, field: string) => {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    throw new AuthApiError(`The dashboard response contains an invalid ${field}.`);
  }
  return value;
};

const requiredString = (value: unknown, field: string) => {
  if (typeof value !== 'string' || !value) {
    throw new AuthApiError(`The dashboard response contains an invalid ${field}.`);
  }
  return value;
};

const countMap = (value: unknown, field: string): Record<string, number> => {
  const record = asRecord(value);
  if (!record) {
    throw new AuthApiError(`The dashboard response contains an invalid ${field}.`);
  }
  return Object.fromEntries(
    Object.entries(record).map(([key, count]) => [
      key,
      requiredNumber(count, `${field}.${key}`),
    ]),
  );
};

const unwrap = (value: unknown): JsonRecord => {
  const record = asRecord(value);
  if (!record) {
    throw new AuthApiError('The dashboard service returned an invalid response.');
  }
  return asRecord(record.data) ?? record;
};

const parseDashboardSummary = (payload: unknown): WorkspaceDashboardSummary => {
  const record = unwrap(payload);
  return {
    totalProjects: requiredNumber(record.total_projects, 'total_projects'),
    activeProjects: requiredNumber(record.active_projects, 'active_projects'),
    archivedProjects: requiredNumber(record.archived_projects, 'archived_projects'),
    projectsByStatus: countMap(record.projects_by_status, 'projects_by_status'),
    totalTasks: requiredNumber(record.total_tasks, 'total_tasks'),
    tasksByStatus: countMap(record.tasks_by_status, 'tasks_by_status'),
    completedTasks: requiredNumber(record.completed_tasks, 'completed_tasks'),
    overdueTasks: requiredNumber(record.overdue_tasks, 'overdue_tasks'),
    unassignedTasks: requiredNumber(record.unassigned_tasks, 'unassigned_tasks'),
    completionRate: requiredNumber(record.completion_rate, 'completion_rate'),
    overdueRate: requiredNumber(record.overdue_rate, 'overdue_rate'),
    averageCompletionTimeHours: requiredNumber(
      record.average_completion_time_hours,
      'average_completion_time_hours',
    ),
    tasksDueNext7Days: requiredNumber(record.tasks_due_next_7_days, 'tasks_due_next_7_days'),
    tasksDueNext30Days: requiredNumber(record.tasks_due_next_30_days, 'tasks_due_next_30_days'),
    activeUsers: requiredNumber(record.active_users, 'active_users'),
    recentActivityCount: requiredNumber(record.recent_activity_count, 'recent_activity_count'),
    generatedAt: requiredString(record.generated_at, 'generated_at'),
    rangeStart: requiredString(record.range_start, 'range_start'),
    rangeEnd: requiredString(record.range_end, 'range_end'),
  };
};

const responseMessage = async (response: Response) => {
  try {
    const payload = asRecord(await response.json());
    const detail = payload?.detail;
    if (typeof detail === 'string' && detail) return detail;
    if (typeof payload?.message === 'string' && payload.message) return payload.message;
  } catch {
    // Keep the caller-facing error stable when a proxy returns a non-JSON body.
  }
  return 'Unable to load your workspace dashboard.';
};

const fetchSummary = async (token: string) => {
  try {
    return await fetch(apiUrl(), {
      method: 'GET',
      cache: 'no-store',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Correlation-ID': correlationId(),
      },
    });
  } catch {
    throw new AuthApiError('Unable to reach the dashboard service. Please try again.');
  }
};

const activeAccessToken = async () => {
  const existing = getAccessToken();
  if (existing) return existing;
  const session = await authApi.refresh();
  return session.accessToken;
};

export async function getWorkspaceDashboardSummary(): Promise<WorkspaceDashboardSummary> {
  let response = await fetchSummary(await activeAccessToken());
  if (response.status === 401) {
    const refreshed = await authApi.refresh();
    response = await fetchSummary(refreshed.accessToken);
  }
  if (!response.ok) {
    throw new AuthApiError(await responseMessage(response), response.status);
  }
  return parseDashboardSummary(await response.json());
}
