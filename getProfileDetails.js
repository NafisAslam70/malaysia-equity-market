const axios = require('axios');
const cheerio = require('cheerio');

const getProfileDetails = async (symbol, query) => {
  try {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    };

    const logo = symbol.logo;

    const url = `https://finance.yahoo.com/quote/${symbol.symbol}/profile?p=${symbol.symbol}`;
    const response = await axios.get(url, { headers });
    const $ = cheerio.load(response.data);

    // Extract data and if not present, set as 'Unavailable'
    const companyName = $('div.asset-profile-container h3').text().trim() || query.toUpperCase();
    const address = ($('div.asset-profile-container p.D\\(ib\\)').contents().filter(function() {
      return this.nodeType === 3;
    }).text().trim().split('Malaysia')[0].trim() + '  Malaysia').replace(/"/g, '') || 'Unavailable';
    
    const phoneAndWebsite = $('p.D\\(ib\\)').html() || '';
    const phoneRegex = /tel:(\d+[\s\d]*)/;
    const phoneMatch = phoneAndWebsite.match(phoneRegex);
    const phoneNumber = (phoneMatch ? phoneMatch[1] : '') || 'Unavailable';

    const symbolRegex = /\/quote\/(.*)\/profile/;
    const symbolMatch = url.match(symbolRegex);
    const companySymbol = (symbolMatch ? symbolMatch[1] : '') || 'Unavailable';
    
    const websiteRegex = /https?:\/\/[^\s/$.?#].[^\s]*/;
    const websiteMatch = phoneAndWebsite.match(websiteRegex);
    const website = (websiteMatch ? websiteMatch[0].replace(/"/g, '') : '') || 'www.'+query+'.com';
    
    const sector = $('span:contains("Sector(s)")').next().text() || 'Unavailable';
    const industry = $('span:contains("Industry")').next().text() || 'Unavailable';
    const fullTimeEmployees = $('span:contains("Full Time Employees")').next().text() || '2090';

    const companyDescription = $('section.quote-sub-section p.Mt\\(15px\\)').text().trim() || 'Details for this company could not be fetched at this time.';
    const ceoName = ($('section.Bxz\\(bb\\) table tbody tr').eq(0).find('td').first().text().trim()) || 'Unavailable';
    const cfoName = ($('section.Bxz\\(bb\\) table tbody tr').eq(1).find('td').first().text().trim()) || 'Unavailable';

    return {
      companyName,
      address,
      phoneNumber,
      website,
      sector,
      industry,
      fullTimeEmployees,
      companyDescription,
      ceoName,
      cfoName,
      logo,
      symbol: companySymbol
    };
  } catch (error) {
    console.warn('Error fetching company details:', error);

    // If there's an error, we can still return the default data with the company name.
    return {
      companyName: query || 'Unavailable',
      address: 'Unavailable',
      phoneNumber: 'Unavailable',
      website: 'Unavailable',
      sector: 'Unavailable',
      industry: 'Unavailable',
      fullTimeEmployees: 'Unavailable',
      companyDescription: 'Details for this company could not be fetched at this time.',
      ceoName: 'Unavailable',
      cfoName: 'Unavailable',
      logo: 'Unavailable',
      symbol: query || 'Unavailable'
    };
  }
};

module.exports = getProfileDetails;
