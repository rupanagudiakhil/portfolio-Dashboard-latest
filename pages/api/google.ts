// import { NextApiRequest, NextApiResponse } from 'next';
// import { fetchGoogleFinanceData } from '../../lib/googleFinance';

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   const { symbol } = req.query;
//   const data = await fetchGoogleFinanceData(symbol as string);
//   res.status(200).json(data);
// };

import { fetchGoogleFinanceData } from '../../lib/googleFinance';
import { NextApiRequest, NextApiResponse } from 'next';
export default async (req: NextApiRequest, res: NextApiResponse) => {
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { symbols } = req.body;
  if (!symbols || !Array.isArray(symbols)) {
    return res.status(400).json({ error: 'Invalid or missing symbols array' });
  }

  try {
    const cmp = await fetchGoogleFinanceData(symbols);
    res.status(200).json({ cmp });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};
