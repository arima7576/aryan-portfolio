export const currency = (value: number, code = 'GBP') => new Intl.NumberFormat('en-GB', { style: 'currency', currency: code, maximumFractionDigits: 0 }).format(value);
export const percent = (value: number, digits = 1) => `${value >= 0 ? '+' : ''}${(value * 100).toFixed(digits)}%`;
export const date = (value: string) => new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value));
