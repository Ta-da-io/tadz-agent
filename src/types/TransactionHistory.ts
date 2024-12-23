export interface Transaction {
  date?: string | null;
  amount?: number | null;
  token?: string | null;
  from?: string | null;
  to?: string | null;
  type?: 'buy' | 'sell' | string | null;
}

export interface TransactionHistoryData {
  text?: string | null;
  details?: Transaction[] | null;
  type?: 'history' | string | null;
}