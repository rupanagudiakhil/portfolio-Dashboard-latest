import { useEffect, useState } from 'react';
import { StockData } from '../types/portfolio';
import SectorPieChart from './SectorPieChart';
import SectorSummaryTable from './SectorSummaryTable';
import TopGainerLosers from '@/components/TopGainerLosers';


const MOCK_PORTFOLIO: StockData[] = [
  {
    stockName: 'TCS.NS',
    stockGoogle: 'TCS',
    purchasePrice: 3000,
    quantity: 10,
    exchange: 'NSE',
    sector: 'Technology',
    logourl: '/logos/tcs.png',
  },
  {
    stockName: 'INFY.NS',
    stockGoogle: 'INFY',
    purchasePrice: 1500,
    quantity: 20,
    exchange: 'NSE',
    sector: 'Technology',
    logourl: 'logos/infosys.png',
  },
  {
    stockName: 'HDFCBANK.NS',
    stockGoogle: 'HDFCBANK',
    purchasePrice: 1500,
    quantity: 20,
    exchange: 'NSE',
    sector: 'Financials',
    logourl: 'logos/hdfc_bank.png',
  },
  {
    stockName: 'ICICIBANK.NS',
    stockGoogle: 'ICICIBANK',
    purchasePrice: 1500,
    quantity: 20,
    exchange: 'NSE',
    sector: 'Financials',
    logourl: 'logos/icici.png',
  },
  {
    stockName: 'WIPRO.NS',
    stockGoogle: 'WIPRO',
    purchasePrice: 247,
    quantity: 20,
    exchange: 'NSE',
    sector: 'Technology',
    logourl: 'logos/wipro.png'
  },
  {
    stockName: 'SBIN.NS',
    stockGoogle: 'SBIN',
    purchasePrice: 790,
    quantity: 20,
    exchange: 'NSE',
    sector: 'Financials',
    logourl: 'logos/state_bank_of_india.png'
  },
  {
    stockName: 'YESBANK.NS',
    stockGoogle: 'YESBANK',
    purchasePrice: 21,
    quantity: 20,
    exchange: 'NSE',
    sector: 'Financials',
    logourl: 'logos/yes_bank.png'
  },
  {
    stockName: 'RELIANCE.NS',
    stockGoogle: 'RELIANCE',
    purchasePrice: 1426,
    quantity: 10,
    exchange: 'NSE',
    sector: 'Industrial',
    logourl: 'logos/reliance_industries.png'
  },
  {
    stockName: 'TATAMOTORS.NS',
    stockGoogle: 'TATAMOTORS',
    purchasePrice: 718,
    quantity: 20,
    exchange: 'NSE',
    sector: 'Automotive',
    logourl: 'logos/tata_motors.png'
  }
];

function getSectorSummary(data: StockData[]) {
  const summary: Record<string, { investment: number; currentValue: number }> = {};

  data.forEach((stock) => {
    const investment = stock.quantity * stock.purchasePrice;
    const currentValue = (stock.cmp ?? 0) * stock.quantity;

    if (!summary[stock.sector]) {
      summary[stock.sector] = { investment: 0, currentValue: 0 };
    }

    summary[stock.sector].investment += investment;
    summary[stock.sector].currentValue += currentValue;
  });

  return Object.entries(summary).map(([sector, { investment, currentValue }]) => ({
    sector,
    investment,
    currentValue,
    gainLoss: currentValue - investment,
  }));
}

function getTopMovers(data: StockData[], count = 5) {
  const sorted = [...data]
    .filter(stock => stock.cmp !== undefined)
    .map(stock => ({
      ...stock,
      gainLoss: (stock.cmp! * stock.quantity) - (stock.purchasePrice * stock.quantity),
    }))
    .sort((a, b) => b.gainLoss - a.gainLoss);

  return {
    gainers: sorted.slice(0, count),
    losers: sorted.slice(-count).reverse()
  };
}

export default function PortfolioTable() {
  const [data, setData] = useState<StockData[]>(MOCK_PORTFOLIO);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');


  const updateData = async () => {
    try {

      const yahooSymbols = data.map(stock => stock.stockName);
      const googleSymbols = data.map(stock => stock.stockGoogle);



      const [yahooDataRes, googleDataRes] = await Promise.all([
        fetch('/api/yahoo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ symbols: yahooSymbols }),
        }).then(res => res.json()),

        fetch('/api/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ symbols: googleSymbols }),
        }).then(res => res.json()),
      ]);
      console.log(yahooDataRes, googleDataRes)
      const updated = data.map((stock, index) => ({
        ...stock,
        cmp: yahooDataRes.cmp[stock.stockGoogle],
        peRatio: googleDataRes.cmp[index]?.peRatio,
        latestEarnings: googleDataRes.cmp[index]?.eps,
        price: googleDataRes.cmp[index]?.price,
      }));

      setData(updated);

    } catch (error) {
      console.error('Failed to fetch stock data:', error);
    } finally {
      setLoading(false);

    }
  };

  useEffect(() => {
    updateData();
    const interval = setInterval(updateData, 15000);
    return () => clearInterval(interval);
  }, []);

  const filteredData = data.filter((stock) =>
    stock.stockName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filteredData)
  const { gainers, losers } = getTopMovers(data);
  const sectorSummary = getSectorSummary(data);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <span className="text-gray-600 text-lg">Loading portfolio data...</span>
      </div>
    );
  }

  return (
    <>


      <div className="overflow-x-auto p-4">
        <div className="mb-4 flex items-center justify-between">
          <input
            type="text"
            placeholder="Search stock..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3 border border-gray-300 rounded p-2"
          />
        </div>
        <div className="w-full overflow-x-auto shadow-md rounded-lg border border-gray-300">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white text-left sticky top-0 z-10 shadow-md">
              <tr>
                {['Stock', 'Qty', 'Purchase Price', 'Investment', 'CMP', 'Present Value', 'Gain/Loss', 'P/E', 'Earnings'].map((header) => (
                  <th
                    key={header}
                    className="p-3 border border-blue-800 font-semibold uppercase tracking-wider text-sm select-none"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((stock) => {
                const investment = stock.quantity * stock.purchasePrice;
                const presentValue = (stock.cmp ?? 0) * stock.quantity;
                const gainLoss = presentValue - investment;
                const gainLossClass = [
                  'flex items-center gap-1 justify-end',
                  gainLoss > 0 ? 'text-green-600' : gainLoss < 0 ? 'text-red-600' : 'text-gray-700',
                ].join(' ');
                return (
                  <tr key={stock.stockGoogle} className="border-t hover:bg-gray-50">
                    <td className="p-3 border border-gray-300 align-middle max-w-[160px]">
                      <div className="flex items-center gap-2">
                        <img src={stock.logourl} alt={stock.stockGoogle} className="w-6 h-6 object-contain flex-shrink-0" />
                        <span className="font-medium text-gray-800 truncate" title={stock.stockGoogle}>
                          {stock.stockGoogle}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 border border-gray-300 text-center align-middle">{stock.quantity}</td>
                    <td className="p-3 border border-gray-300 text-right align-middle">${stock.purchasePrice.toFixed(2)}</td>
                    <td className="p-3 border border-gray-300 text-right align-middle">${investment.toFixed(2)}</td>
                    <td className="p-3 border border-gray-300 text-right align-middle">${(stock.cmp ?? 0).toFixed(2)}</td>
                    <td className="p-3 border border-gray-300 text-right align-middle">${presentValue.toFixed(2)}</td>
                    <td className="p-3 border border-gray-300 align-middle">
                      <div className={gainLossClass}>
                        {gainLoss > 0 && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7 7 7M12 3v18" />
                          </svg>
                        )}
                        {gainLoss < 0 && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7-7-7M12 21V3" />
                          </svg>
                        )}
                        <span>{gainLoss.toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="p-3 border border-gray-300 text-right align-middle">{stock.peRatio ?? '-'}</td>
                    <td className="p-3 border border-gray-300 text-right align-middle">{stock.latestEarnings ?? '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded shadow-sm text-sm">
          <strong>Data Accuracy:</strong> Scraped or unofficial data may vary in accuracy. Please verify data independently if needed.
        </div>
        <h2 className="text-xl font-semibold mt-10 mb-4">Sector Distribution</h2>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <SectorPieChart data={sectorSummary} />
          </div>
          <SectorSummaryTable sectorSummary={sectorSummary} />
        </div>
        <TopGainerLosers gainers={gainers} losers={losers} />
      </div>
    </>
  );
}
