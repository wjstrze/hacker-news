export const formatDate = (utcDate: string): string =>
  new Date(utcDate).toLocaleDateString();
