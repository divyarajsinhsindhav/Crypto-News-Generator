const { GoogleGenerativeAI } = require("@google/generative-ai");
const fetchData = require("./crypto");
const { Gemini_API_KEY } = require("./apikey")

async function run() {
    const data = await fetchData(); // Wait for data fetching to complete
    // console.log(data);

    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(Gemini_API_KEY);

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Generate a Comprehensive Market Analysis Report

    Purpose: Generate a comprehensive news/blog post, complete with a headline/title and market analysis report, utilizing the provided data.
    
    Data Description:
    
    Headline/Title: Market Analysis Report for ${data.id}
    Symbol: ${data.symbol}
    Category: ${data.categories}
    Current Price: ${data.market_data.current_price.inr} (Indian Rupees)
    Market Cap: ${data.market_data.market_cap.inr}
    Total Volume: ${data.market_data.total_volume.inr}
    High 24h: ${data.market_data.high_24h.inr}
    Low 24h: ${data.market_data.low_24h.inr}
    Price Change Percentage 24h: ${data.market_data.price_change_percentage_24h}
    Price Change Percentage 7d: ${data.market_data.price_change_percentage_7d}
    Price Change Percentage 30d: ${data.market_data.price_change_percentage_30d}
    Formatting Guidelines:
    
    Ensure the currency is displayed appropriately with commas.
    Use proper grammar and vocabulary to maintain professionalism.
    Incorporate real-time data to ensure the report's accuracy and relevance.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        console.log(text);
    } catch (error) {
        console.error('Error generating content:', error);
    }
}

run();
