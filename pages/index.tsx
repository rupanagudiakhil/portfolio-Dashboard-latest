import Head from 'next/head';
import PortfolioTable from '../components/PortfolioTable';
import SectorPieChart from '../components/SectorPieChart';

export default function Home() {
  return (
    <>
      <Head>
        <title>Portfolio Dashboard</title>
      </Head>
      <main className="p-4 min-h-screen flex flex-col">
        <div className="flex items-center justify-between p-4 bg-gray-800 text-white rounded-lg">
          {/* Portfolio Icon (Pie Chart) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 drop-shadow-md"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 11V3a9 9 0 019 9h-8zM21 12A9 9 0 113 12a9 9 0 0118 0z"
            />
          </svg>

          <h1 className="text-2xl font-semibold text-white drop-shadow-sm tracking-wide">
            Portfolio Dashboard
          </h1>
        </div>

        <div className="flex-grow mt-4">
          <PortfolioTable />
        </div>

        <footer className="mt-8 bg-gray-100 border-t border-gray-300 p-4 rounded shadow text-center text-sm text-gray-600">

          Disclaimer: This dashboard is for informational purposes only
        </footer>
      </main>
    </>
  );
}
