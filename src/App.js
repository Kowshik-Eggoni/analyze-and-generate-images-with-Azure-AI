import React, { useState } from "react";
import analyzeImage from "./azure-image-analysis";
import { generateImage } from "./azure-image-generation";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [generatedImageResult, setGeneratedImageResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageAnalysis = async () => {
    setIsLoading(true);
    setGeneratedImageResult(null); // Resetting the generated image result
    const result = await analyzeImage(inputValue);
    setAnalysisResult(result);
    setIsLoading(false);
  };

  const handleImageGeneration = async () => {
    setIsLoading(true);
    setAnalysisResult(null); // Resetting the analysis result
    const result = await generateImage(inputValue);
    setGeneratedImageResult(result);
    setIsLoading(false);
  };

  const DisplayResults = () => {
    if (analysisResult) {
      return (
        <div>
          <h2>Analysis Results</h2>
          <p>{JSON.stringify(analysisResult, null, 2)}</p>
        </div>
      );
    } else if (generatedImageResult) {
      // Assuming the API returns a URL to the generated image
      return (
        <div>
          <h2>Generated Image</h2>
          <img
            src={generatedImageResult}
            alt="Generated"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "path_to_fallback_image.png";
            }}
          />
        </div>
      );
    }
    return "No results yet.";
  };

  return (
    <div>
      <h1>Image Processing</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter image URL or prompt"
      />
      <button onClick={handleImageAnalysis} disabled={isLoading}>
        {isLoading ? "Processing..." : "Analyze Image"}
      </button>
      <button onClick={handleImageGeneration} disabled={isLoading}>
        {isLoading ? "Processing..." : "Generate Image"}
      </button>
      <DisplayResults />
    </div>
  );
}

export default App;
