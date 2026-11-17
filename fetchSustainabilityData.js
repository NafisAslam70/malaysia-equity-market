const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function fetchSustainabilityData(ticker) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
    };
    await page.setExtraHTTPHeaders(headers);

    const url = `https://finance.yahoo.com/quote/${ticker}/sustainability?p=${ticker}`;
    await page.goto(url, { waitUntil: 'networkidle2' });

    const selectors = [
        '#Col1-0-Sustainability-Proxy > section > div.Pb\\(20px\\).Bdbs\\(s\\).Bdbw\\(3px\\).Bdbc\\(\\$seperatorColor\\).smartphone_Pb\\(10px\\).smartphone_Px\\(20px\\).smartphone_Bdbw\\(4px\\).smartphone_Bdbc\\(\\$seperatorColor\\) > div > div.D\\(ib\\).W\\(34\\%\\).smartphone_D\\(b\\).smartphone_W\\(a\\) > div > div.D\\(ib\\) > div.Fz\\(36px\\).Fw\\(600\\).D\\(ib\\).Mend\\(5px\\)',
        // ... other selectors
    ];
    const data = await Promise.all(
        selectors.map(selector => page.$eval(selector, el => el.textContent))
    );

    const dataPath = path.join(__dirname, 'data', `${ticker}.json`);

    // write data to JSON file
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8', function(err) {
        if(err) {
            console.log('Error while writing data: ', err);
        }
    });

    await browser.close();

    // read data from JSON file
    const fileData = fs.readFileSync(dataPath, 'utf-8');

    return JSON.parse(fileData);
}

module.exports = fetchSustainabilityData;
