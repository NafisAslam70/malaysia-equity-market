const cron = require('node-cron');
const db = require('./db');
const symbolMap = require('./symbolMap');
const getHistoricalData = require('./getHistoricalData');

const updateDataForSymbol = async (symbol) => {
    try {
        const historicalData = await getHistoricalData(symbol);
        db.run("INSERT OR REPLACE INTO historical_data VALUES (?, ?)", [symbol, historicalData], (err) => {
            if (err) console.error('Error inserting historical data for', symbol, ':', err.message);
        });
    } catch (error) {
        console.error('Error fetching historical data for', symbol, ':', error);
    }
};

const updateAllData = async () => {
    console.log("Starting data update...");
    for (const companyName in symbolMap) {
        const symbol = symbolMap[companyName].symbol;
        await updateDataForSymbol(symbol);
    }
    console.log("Data update finished.");
};

// Start updating immediately and then schedule every two days at 12:00 AM
updateAllData();
cron.schedule('0 0 */2 * *', updateAllData);
