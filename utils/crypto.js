require('dotenv').config()
const fetch = require('node-fetch');

exports.fetchData = async (crypto) => {
    const url = `https://api.coingecko.com/api/v3/coins/${crypto}`;
    const options = {
        method: 'GET',
        headers: { 'x-cg-demo-api-key': 'CG-eSnYf77xEocjt9ZHnTCfksVf' }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


