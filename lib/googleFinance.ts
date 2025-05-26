export async function fetchGoogleFinanceData( symbol: string[]): Promise<{ peRatio: number; earnings: number } | null> {
  console.log(symbol)
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxoWZ9X6DsMvufc_RaKkJhncxISeGiERUMrBvLusAQ90SwbVklwbeM2-U363oZATYzTqg/exec');
    const stockData = await response.json();
    return stockData;
  } catch (error) {
    return null;
  }
}
