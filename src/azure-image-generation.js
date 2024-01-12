import axios from 'axios';

const endpoint = "https://dall-e-eyes.openai.azure.com/openai/deployments/Dalle3/images/generations";
const apiKey = "aae5068e65fc41c2b0d8c7fd06a86d32"; // Replace with your actual API key

export const generateImage = async (prompt) => {
  try {
    const response = await axios.post(
      `${endpoint}?api-version=2023-12-01-preview`,
      {
        prompt: prompt,
        n: 1, // Number of images to generate
        size: "1024x1024",
        quality: "hd", 
        style: "vivid"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey
        }
      }
    );
    return response.data.data[0].url;
  } catch (error) {
    console.error("Error during Azure OpenAI image generation call:", error);
    return null;
  }
};
