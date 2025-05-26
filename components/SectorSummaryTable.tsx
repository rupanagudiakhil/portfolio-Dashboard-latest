import React from 'react';

type SectorSummaryItem = {
  sector: string;
  investment: number;
  currentValue: number;
  gainLoss: number;
};

type Props = {
  sectorSummary: SectorSummaryItem[];
};

const SectorSummaryTable: React.FC<Props> = ({ sectorSummary }) => {
  return (
    <div className="w-full lg:w-1/2 overflow-x-auto shadow-md rounded-lg border border-gray-300 inline-flex">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200">
              Sector
            </th>
            <th className="px-4 py-3 text-right font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200">
              Investment
            </th>
            <th className="px-4 py-3 text-right font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200">
              Current
            </th>
            <th className="px-4 py-3 text-right font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200">
              Gain/Loss
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {sectorSummary.map((sector, idx) => (
            <tr
              key={sector.sector}
              className={idx % 2 === 0 ? 'bg-gray-50 hover:bg-gray-100' : 'hover:bg-gray-100'}
            >
              <td className="px-4 py-3 whitespace-nowrap text-gray-800 font-medium">{sector.sector}</td>
              <td className="px-4 py-3 whitespace-nowrap text-right text-gray-700">
                ${sector.investment.toFixed(2)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-right text-gray-700">
                ${sector.currentValue.toFixed(2)}
              </td>
              <td
                className={`px-4 py-3 whitespace-nowrap text-right font-semibold ${
                  sector.gainLoss > 0
                    ? 'text-green-600'
                    : sector.gainLoss < 0
                    ? 'text-red-600'
                    : 'text-gray-700'
                }`}
              >
                <span className="inline-flex items-center space-x-1 justify-end w-full">
                  {sector.gainLoss > 0 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-600 block"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7 7 7M12 3v18" />
                    </svg>
                  )}
                  {sector.gainLoss < 0 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500 block"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7-7-7M12 21V3" />
                    </svg>
                  )}
                  <span>{sector.gainLoss.toFixed(2)}</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SectorSummaryTable;
