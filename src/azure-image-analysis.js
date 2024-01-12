// azure-image-analysis.js
import axios from "axios";

// Corrected endpoint with the api-version

  const endpoint =
    "https://azure-eyes.cognitiveservices.azure.com/computervision/imageanalysis:analyze?api-version=2023-10-01";

  const apiKey = "3681ca6f59954db68f3edb264dd9fdb5"; // Your API key


const analyzeImage = async (imageUrl) => {
  try {
    const params = new URLSearchParams({
      features: "tags,read,smartCrops,objects,people",
      language: "en",
      "gender-neutral-caption": "true",
      "smartcrops-aspect-ratios": "0.8,1.2",
    });

    console.log("API call to Azure AI Vision service:", `${endpoint}&${params.toString()}`);

    const response = await axios.post(
      `${endpoint}&${params.toString()}`,
      { url: imageUrl },
      { headers: { "Ocp-Apim-Subscription-Key": apiKey, "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("Error during Azure AI Vision service call:", error);
    return null;
  }
};

export default analyzeImage;
