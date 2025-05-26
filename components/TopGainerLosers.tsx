// components/TopMovers.tsx
import React from 'react';

type Stock = {
  stockName: string;
  stockGoogle?: string;
  cmp?: number;
  purchasePrice: number;
  quantity: number;
  exchange?: 'NSE' | 'BSE';
  sector?: string;
  logourl?: string;
  peRatio?: number;
  latestEarnings?: number;
  gainLoss?: number;
};


type Props = {
  gainers: Stock[];
  losers: Stock[];
};

const TopGainerLosers: React.FC<Props> = ({ gainers, losers }) => {
  const renderList = (stocks: Stock[], type: 'gainer' | 'loser') => {
    const isGainer = type === 'gainer';

    return (
      <div className="border border-gray-300 rounded-md p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span>{isGainer ? 'Top Gainers' : 'Top Losers'}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ml-1 ${isGainer ? 'text-green-600' : 'text-red-500'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isGainer ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7 7 7M12 3v18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7M12 21V3" />
            )}
          </svg>
        </h3>
        <ul className="space-y-1">
          {stocks.map((stock) => (
            <li
              key={stock.stockName}
              className="flex justify-between items-center border-b border-gray-300 py-2 last:border-b-0"
            >
              <div className="flex items-center gap-2">
                <img src={stock.logourl} alt={stock.stockName} className="w-6 h-6 object-contain" />
                <span>{stock.stockName}</span>
              </div>
              <span className={`${isGainer ? 'text-green-600' : 'text-red-600'} font-medium`}>
                {(((stock.cmp ?? 0) * stock.quantity) - (stock.purchasePrice * stock.quantity)).toFixed(2)
}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      {renderList(gainers, 'gainer')}
      {renderList(losers, 'loser')}
    </div>
  );
};

export default TopGainerLosers;
