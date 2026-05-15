const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash'});

const generateInsight = async (prompt)=>{
    try{
        const result = await model.generateContent(prompt);
        return result.response.text();
    }catch(err){
        console.error('AI error: ', err.message);
        return null;
    }
};

module.exports = { generateInsight };
