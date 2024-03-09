const fetch = require('node-fetch');
const { Coin_API_KEY } = require("./apikey")

const url = 'https://api.coingecko.com/api/v3/coins/bitcoin';
const options = { method: 'GET', headers: { 'x-cg-demo-api-key': Coin_API_KEY } };

const fetchData = () => fetch(url, options)
    .then(res => res.json())
    .catch(err => {
        console.error('Error:', err);
        throw err; // Re-throwing the error so it can be caught by the caller
    });

module.exports = fetchData; // Export the fetchData function
