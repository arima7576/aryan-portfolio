import { expect, test } from '@playwright/test';

async function mockAuthApi(page: import('@playwright/test').Page) {
  await page.route('**/api/v1/auth/**', async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const corsHeaders = {
      'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type, X-Correlation-ID, X-CSRF-Token, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    };
    if (request.method() === 'OPTIONS') {
      await route.fulfill({ status: 204, headers: corsHeaders });
      return;
    }
    if (url.pathname.endsWith('/csrf')) {
      await route.fulfill({ contentType: 'application/json', headers: corsHeaders, body: JSON.stringify({ csrf_token: 'test-csrf-token' }) });
      return;
    }
    if (url.pathname.endsWith('/refresh')) {
      await route.fulfill({ status: 401, contentType: 'application/json', headers: corsHeaders, body: JSON.stringify({ detail: 'No active session' }) });
      return;
    }
    if (url.pathname.endsWith('/login')) {
      const body = request.postDataJSON() as { email: string; remember_me: boolean };
      await route.fulfill({
        contentType: 'application/json',
        headers: corsHeaders,
        body: JSON.stringify({
          access_token: 'test-access-token',
          token_type: 'bearer',
          expires_in: 900,
          csrf_token: 'test-csrf-token',
          user: {
            id: 'test-user',
            email: body.email,
            first_name: 'Executive',
            last_name: 'User',
            email_verified: true,
            created_at: '2026-01-01T00:00:00Z',
          },
        }),
      });
      return;
    }
    await route.fulfill({ status: 404, contentType: 'application/json', headers: corsHeaders, body: JSON.stringify({ detail: 'Not found' }) });
  });
}

async function signIn(page: import('@playwright/test').Page, returnPath = '/executive') {
  await mockAuthApi(page);
  await page.goto('/login');
  await page.evaluate((path) => sessionStorage.setItem('arimaReturnPath', path), returnPath);
  await page.getByLabel('Email').fill('executive@example.com');
  await page.getByLabel('Password').fill('Secure-test-password1!');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL(new RegExp(returnPath.replace('?', '\\?')));
}

test('enters and exits the neural core with keyboard support', async ({ page }) => {
  await signIn(page);
  await expect(page.getByRole('button', { name: 'Enter Arima neural core' })).toBeVisible();
  await page.getByRole('button', { name: 'Enter Arima neural core' }).press('Enter');
  await expect(page.getByRole('heading', { name: 'Executive Intelligence' })).toBeVisible({ timeout: 4_000 });
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Enter Arima neural core' })).toBeVisible();
});

test('renders a direct chamber route after authenticated sign-in', async ({ page }) => {
  await signIn(page, '/executive?chamber=quant');
  await expect(page.getByRole('heading', { name: 'Quant Research' })).toBeVisible();
  await expect(page.getByText('MOCK RESEARCH DATA')).toHaveCount(0);
});

test('falls back to keyboard mode after a recognition network error', async ({ page }) => {
  await page.addInitScript(() => {
    class NetworkFailureRecognition {
      continuous = false;
      interimResults = false;
      lang = 'en-GB';
      onresult: ((event: unknown) => void) | null = null;
      onerror: ((event: { error: string }) => void) | null = null;
      onend: (() => void) | null = null;
      start() { window.setTimeout(() => this.onerror?.({ error: 'network' }), 0); }
      stop() { this.onend?.(); }
      abort() { this.onend?.(); }
    }
    Object.defineProperty(window, 'SpeechRecognition', { value: NetworkFailureRecognition });
    Object.defineProperty(navigator, 'mediaDevices', {
      value: { getUserMedia: async () => ({ getTracks: () => [{ stop() {} }] }) },
    });
  });
  await signIn(page);
  await page.getByRole('button', { name: 'Speak' }).click();
  await expect(page.getByText('Recognition service unavailable')).toBeVisible();
  await expect(page.getByLabel(/Keyboard fallback/)).toBeVisible();
});

test('honours reduced motion through the simplify control', async ({ page }) => {
  await signIn(page);
  await page.getByRole('button', { name: 'Simplify' }).click();
  await expect(page.getByRole('button', { name: 'Simplify' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Enter Arima neural core' }).click();
  await expect(page.getByRole('heading', { name: 'Executive Intelligence' })).toBeVisible();
});
