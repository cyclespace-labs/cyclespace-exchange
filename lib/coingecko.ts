const API_BASE = 'https://api.coingecko.com/api/v3';

export async function fetchCoinHistory(coinId: any, days = 7) {
  if (!process.env.NEXT_PUBLIC_COINGECKO_API_KEY) {
    console.error('CoinGecko API key is missing');
    throw new Error('API key not configured');
  }

  const url = `${API_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`;
  const res = await fetch(url, {
    headers: {
      'x-cg-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY,
    },
  });
  return res.json();
}