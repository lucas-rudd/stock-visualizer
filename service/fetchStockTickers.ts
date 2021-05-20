// import XLSX from 'xlsx';
// import fs from 'fs';
import util from 'util';
import axios from 'axios';
import { parseString } from 'xml2js';
import { AxiosResponse } from 'axios';

const parseStringPromise = util.promisify(parseString);

interface UrlLocation {
    loc: string[]
}

interface Urlset {
    url: UrlLocation[]
}

interface StockAnalysisXMLData {
    urlset: Urlset;
}

// interface TickerMap {
//     Ticker: string;
//     Name: string;
//     Sector: string;
//     Industry: string;
//     Price: string;
//     Collection: string;
// }

// const IGNORE_WORDS = ['Corp.', 'Inc.', 'LLC', 'Ltd.', 'L.P.']
// const REMOVE_WORDS = new RegExp(/(Corp\.)|(Inc\.)|(LLC)|(Ltd\.)|(L\.P\.)/);

export const fetchStockTickers = async () => {
    const { data }: AxiosResponse<string> = await axios.get('https://stockanalysis.com/sitemap.xml');
    const result: StockAnalysisXMLData = await parseStringPromise(data) as StockAnalysisXMLData;
    const parsedData = result.urlset.url
        .filter((location: UrlLocation) => location.loc[0] !== 'https://stockanalysis.com/stocks/' && location.loc[0].includes('https://stockanalysis.com/stocks/'))
        .map((location) => {
            const splitArray = location.loc[0].split('/');
            return splitArray[splitArray.length-2];
        }).reduce((acc, curr) => {
            acc[curr.toUpperCase()] = curr.toUpperCase()
            return acc;
        }, {} as Record<string, string>);
    return parsedData
        // fs.writeFileSync('./consts.ts', `export const STOCK_TICKER_MAP: Record<string, string> =`+ JSON.stringify(parsedData), 'utf8');
}

// const getTickers = async () => {
//     const workbook = XLSX.readFile('secwiki_tickers.csv');
//     const tickerSheet = workbook.Sheets[workbook.SheetNames[0]];
//     const tickerMaps: TickerMap[] = XLSX.utils.sheet_to_json(tickerSheet);
//     const parsedData = tickerMaps.reduce((acc, curr) => {
//         if(curr.Ticker) {
//             // acc[curr.Ticker.toLowerCase()] = curr.Ticker.toLowerCase();
//             acc[curr.Ticker] = curr.Ticker;
//         }
//         if(curr.Name) {
//             // acc[curr.Name.toLowerCase()] = curr.Name.toLowerCase();
//             const nameWithRemovedWords = curr.Name.replace(REMOVE_WORDS, '');
//             acc[nameWithRemovedWords] = nameWithRemovedWords;
//             // curr.Name.split(' ').map(namePart => {
//             //     if(namePart) {
//             //         if(!IGNORE_WORDS.includes(namePart)) {
//             //             const trimmedName = namePart.replace(',', '').toLowerCase();
//             //             acc[trimmedName] = trimmedName;
//             //         }
                    
//             // })
//         }
//         return acc;
//     }, {} as Record<string, string>);
//     fs.writeFileSync('./consts.ts', `export const STOCK_TICKER_MAP: Record<string, string> =`+ JSON.stringify(parsedData), 'utf8');
// }