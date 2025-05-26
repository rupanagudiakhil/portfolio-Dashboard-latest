## Getting Started

## Project Title:
Portfolio Dashboard

## Description:
This project is a dynamic web application built using React.js/Next.js, designed to provide modern investors with 
real-time insights into their stock portfolio performance. The dashboard empowers users to make informed decisions—whether 
to buy, hold, or sell—by displaying up-to-date financial data in an interactive and visually appealing format.
It Also displays Group stocks by sector (e.g., Financials, Technology) with sector-level summaries and in the form of Pie chart.


The application retrieves financial metrics from reliable sources:
	1)Current Market Price (CMP) is fetched from Yahoo Finance
	2)P/E Ratio and Latest Earnings are retrieved using a Google Sheets integration via Google Finance 
	   and custom Google Apps Script web app

##Deployed Portfolio Dashboard application url: https://portfolio-dashboard-latest.vercel.app/


## Technology Stack
	• Frontend: Next.js (React framework)
	• Backend :NodeJs
	• Styling: Tailwind CSS, Typescript, Recharts
	• Data Fetching: Yahoo Finance Library and Google Sheet App Script
	


## API Reference
 As mentioned in the description the current application uses two API' Yahoo and Google Finance.
 
1. Yahoo Finance (Unofficial Library)
Library: yahoo-finance2
GitHub: https://github.com/gadicc/node-yahoo-finance2
Description:
This is an unofficial Node.js wrapper for Yahoo Finance. It allows querying for live stock data, historical prices, and more. 
Used to fetch: CMP (Current Market Price)
Yahoo Finance does not provide an official public API. This library uses web-scraped data and is subject to changes on Yahoo's side.

2. Google Sheets

Google Finance has no official API, So I have used Google Sheets API (via Google Apps Script Web App)
This project uses data served from a Google Sheet using Google Apps Script. The sheet contains stock information such as 
stock name, P/E ratio, and EPS, which is automatically updated using built-in formulas like GOOGLEFINANCE.

A Google Apps Script Web App is deployed to expose this data as a public HTTP endpoint in JSON format. 
This allows the frontend application to fetch financial metrics like P/E ratio and latest earnings dynamically.

## Installation:
First, run the development server:

npm install
npm run dev
Open [http://localhost:3000] with your browser to see the result.

You can start editing the page by modifying pages/index.tsx. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.