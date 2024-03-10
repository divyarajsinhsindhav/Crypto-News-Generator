# Crypto-News-Generator
This project creates a cryptocurrency news headline generator that leverages large language models (LLMs) to craft informative and engaging headlines based on real-time market data.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/divyarajsinhsindhav/Crypto-News-Generator.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Crypto-News-Generator
    ```
3. Install the required dependencies:
    ```bash
    npm i @google/generative-ai
    ```

## Usage
1. Navigate to API directory:
    ```bash
    cd API
    ```

2. Create a apikey.js file in the project directory:
    ```javascript
    module.exports = {
        Coin-gecko_API_KEY : 'your-coingecko-api-key',
        GEMINI_API_KEY: 'your-gemini-api-key'
    };
    ```

3. Run the application:
    ```bash
    node gemini.js
    ```

## Features
- Generates cryptocurrency news headlines based on real-time market data.
- Provides informative and engaging headlines to keep users updated on the latest developments in the crypto world.
- Using coin-gecko API to get the latest data.