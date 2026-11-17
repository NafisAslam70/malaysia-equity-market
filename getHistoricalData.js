const axios = require('axios');
const moment = require('moment');

const getHistoricalData = async (symbol) => {
    const currentDate = moment();
    const lastWeekDate = moment().subtract(12, 'month');
    let historicalData = '';

    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    };

    const url = `https://query1.finance.yahoo.com/v7/finance/download/${symbol.symbol}?period1=${lastWeekDate.unix()}&period2=${currentDate.unix()}&interval=1d&events=history&includeAdjustedClose=true`;

    try {
      const response = await axios.get(url, {headers});
      historicalData = response.data;
      return historicalData;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      throw error;
    }
};

module.exports = getHistoricalData;
