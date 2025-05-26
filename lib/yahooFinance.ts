import yahooFinance from 'yahoo-finance2';

type Quote = {
  symbol: string;
  regularMarketPrice?: number | null;
};

export const fetchYahooFinanceData = async (
  symbols: string[]
): Promise<Record<string, number | null>> => {
  try {
    const quotes = await yahooFinance.quote(symbols);

    const results: Record<string, number | null> = {};

    if (Array.isArray(quotes)) {
      quotes.forEach((quote: Quote) => {
        results[quote.symbol.replace('.NS','')] = quote.regularMarketPrice ?? null;
      });
    } else {
      results[(quotes as Quote).symbol] = (quotes as Quote).regularMarketPrice ?? null;
    }

    return results;
  } catch (err) {
    console.error('Yahoo API error:', err);
    return {};
  }
};
