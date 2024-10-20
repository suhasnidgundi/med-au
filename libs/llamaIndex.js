import { LLM } from 'llama-index';

// Initialize your local LLM (using a sample config)
const model = new LLM({
    modelName: 'your-model-name', // Specify the model name here
    // Add any other configuration options if needed
});

// Function to generate responses
export const generateResponse = async (prompt) => {
    const response = await model.generate(prompt);
    return response;
};
