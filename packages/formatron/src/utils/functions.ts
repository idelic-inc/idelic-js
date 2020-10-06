export const formatCurrency = (value?: any): string =>
  Number(value || 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
