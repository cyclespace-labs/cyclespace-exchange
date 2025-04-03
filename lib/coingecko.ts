const API_BASE = 'https://api.coingecko.com/api/v3';

export async function fetchCoinHistory(coinId: string, days: number = 7) {
  const url = `${API_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`;
  const res = await fetch(url);
  return res.json();
}