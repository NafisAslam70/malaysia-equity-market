const puppeteer = require('puppeteer');


const fetchNewsData = async (symbol) => {
  const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    const url = `https://finance.yahoo.com/quote/${symbol.symbol}/news?p=${symbol.symbol}`;
    await page.goto(url, { waitUntil: 'networkidle2' }); // Ensure all assets and XHR requests are done.

    const newsData = await page.evaluate(() => {
        const baseUrl = 'https://finance.yahoo.com';
        let newsItems = Array.from(document.querySelectorAll('ul.My\\(0\\) li.js-stream-content'));

        let defaultImage = null;  // To store the image of the first news item

        return newsItems.map((element, index) => {
            const title = element.querySelector('h3 a').innerText.trim();
            const summary = element.querySelector('p').innerText.trim();
            const link = baseUrl + element.querySelector('h3 a').getAttribute('href');

            let imageSrc;
            if (index === 0) {  // If it's the first news item
                imageSrc = element.querySelector('img').getAttribute('src');
                defaultImage = imageSrc;  // Save the first image
            } else if (index < 3) {  // For second and third news items
                const imageElement = element.querySelector('img');
                imageSrc = imageElement ? imageElement.getAttribute('src') : defaultImage;
            } else {  // For the fourth news item and onwards
                imageSrc = defaultImage;  // Use the saved first image
            }

            return { title, summary, link, imageSrc };
        });
    });

    await browser.close();
    return newsData;
};

// Example usage:
// const symbol = { symbol: '6012.KL' };
// fetchNewsData(symbol).then(news => console.log(news));

module.exports = fetchNewsData;



/// NO IMAGE PROBLEM...


// const puppeteer = require('puppeteer');

// const fetchNewsData = async (symbol) => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     const url = `https://finance.yahoo.com/quote/${symbol.symbol}/news?p=${symbol.symbol}`;
//     await page.goto(url, { waitUntil: 'networkidle2' }); // Ensure all assets and XHR requests are done.

//     const newsData = await page.evaluate(() => {
//         const baseUrl = 'https://finance.yahoo.com';
//         let newsItems = Array.from(document.querySelectorAll('ul.My\\(0\\) li.js-stream-content'));


//         return newsItems.map(element => {
//             const title = element.querySelector('h3 a').innerText.trim();
//             const summary = element.querySelector('p').innerText.trim();
//             const link = baseUrl + element.querySelector('h3 a').getAttribute('href');
//             const imageSrc = element.querySelector('img').getAttribute('src');

//             return { title, summary, link, imageSrc };
//         });
//     });

//     await browser.close();
//     return newsData;
// };

// // Example usage:
// const symbol = { symbol: '6012.KL' };
// fetchNewsData(symbol).then(news => console.log(news));

// module.exports = fetchNewsData;


//WITHOUT SECOND ITEM..REMOVE AD...USING AXIOS

// const axios = require('axios');
// const cheerio = require('cheerio');

// const fetchNewsData = async (symbol) => {
//   try {
//     const headers = {
//       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
//       'Accept-Language': 'en-US,en;q=0.9',
//     };

//     const url = `https://finance.yahoo.com/quote/${symbol.symbol}/news?p=${symbol.symbol}`;
//     const response = await axios.get(url, { headers });
//     const html = response.data;
//     const $ = cheerio.load(html);

//     const baseUrl = 'https://finance.yahoo.com';

//     const newsData = $('.js-stream-content')
//       .filter((index, element) => index !== 1) // Skip the second news item
//       .map((index, element) => {
//         let title = $(element).find('h3 a').text();
//         title = title.replace(/[\r\n]+/gm, ' ').trim(); // Replace newlines and trim

//         let summary = $(element).find('p').text();
//         summary = summary.replace(/[\r\n]+/gm, ' ').trim(); // Replace newlines and trim

//         let link = baseUrl + $(element).find('h3 a').attr('href');
//         link = link.replace(/[\r\n]+/gm, ' ').trim(); // Replace newlines and trim

//         const imageSrc = $(element).find('img').attr('src');

//         let paragraph = $(element).find('.js-stream-content').find('p').html();
//         if (paragraph) {
//           paragraph = paragraph.replace(/[\r\n]+/gm, ' ').trim(); // Replace newlines and trim
//         }

//         return { title, summary, link, imageSrc, paragraph };
//       }).get();

//     return newsData;
//   } catch (error) {
//     console.error('Error fetching news data:', error);
//     throw error;
//   }
// };

// module.exports = fetchNewsData;



///VERY FIISRTTT NEWS CODE

// const axios = require('axios');
// const cheerio = require('cheerio');

// const fetchNewsData = async (symbol) => {
//   try {
//     const headers = {
//       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
//       'Accept-Language': 'en-US,en;q=0.9',
//     };

//     const url = `https://finance.yahoo.com/quote/${symbol.symbol}/news?p=${symbol.symbol}`;
//     const response = await axios.get(url, { headers });
//     const html = response.data;
//     const $ = cheerio.load(html);

//     const baseUrl = 'https://finance.yahoo.com';

//     const newsData = $('.js-stream-content').map((index, element) => {
//       let title = $(element).find('h3 a').text();
//       title = title.replace(/[\r\n]+/gm, ' ').trim(); // Replace newlines and trim

//       let summary = $(element).find('p').text();
//       summary = summary.replace(/[\r\n]+/gm, ' ').trim(); // Replace newlines and trim

//       let link = baseUrl + $(element).find('h3 a').attr('href');
//       link = link.replace(/[\r\n]+/gm, ' ').trim(); // Replace newlines and trim

//       const imageSrc = $(element).find('img').attr('src');

//       let paragraph = $(element).find('.js-stream-content').find('p').html();
//       if (paragraph) {
//         paragraph = paragraph.replace(/[\r\n]+/gm, ' ').trim(); // Replace newlines and trim
//       }

//       return { title, summary, link, imageSrc, paragraph };
//     }).get();

//     return newsData;
//   } catch (error) {
//     console.error('Error fetching news data:', error);
//     throw error;
//   }
// };

// module.exports = fetchNewsData;
