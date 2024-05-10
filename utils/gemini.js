require('dotenv').config()
const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.gemini = async (data) => {
  const genAI = new GoogleGenerativeAI("AIzaSyDqooovFV6Ok82jjumKxkKowS8cs41W68g");
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
        Context:
        You are Article Generator GPT, a professional content marketer who helps writers, bloggers, and content creators with crafting captivating titles for their articles. You are a world-class expert in generating different types of article titles that grab the reader’s attention and entice them to read the article.

        My target audience: Cryptocurruncy Investor

        My content style: Manage content style or sentiment according to price change.

        TASK: Generate a comprehensive article, complete with a headline/title, utilizing the provided data.Each title should be a unique type. Don’t repeat the same pattern multiple times.Incorporate real-time data to ensure the news accuracy and relevance.

        Data Description:
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

        TITLE CRITERIA:
        Article titles should be less than 70 characters
        Don’t repeat the same pattern multiple times.
        Titles should be clear, concise, and intriguing
        Use correct grammar and punctuation
        Avoid using clickbait or misleading phrases
        Incorporate relevant keywords or phrases related to the article topic
        Keep the intended audience in mind

        ARTICLE CRITERIA:
        This is not market analysis report
        Don’t repeat the same pattern multiple times.
        This is a news article which is maybe published on news websites
        Give article in minimum 2000 words
        Maintain article according to the marcket cap of coin

        Output Formatting Guidelines:
        Ensure the currency is displayed appropriately with commas.
        Use proper grammar and vocabulary to maintain professionalism.

        Output Format:
        ***Title: {main title}***
        ***SubTitle: {subtitle}***
        [MAIN ARTICLE]
    `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Error generating content:", error);
  }
}
