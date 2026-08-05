import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import LeftPanel from "../components/leftpanel/LeftPanel";
import RightPanel from "../components/rightpanel/RightPanel";
import imageApi from "../services/imageApi";

function Home() {
  const [prompt, setPrompt] = useState("");

  const [generatedImage, setGeneratedImage] = useState("");

  const [loading, setLoading] = useState(false);

  const [aspectRatio, setAspectRatio] = useState("default");

  const [generatedAspectRatio, setGeneratedAspectRatio] = useState("default");

  const [model, setModel] = useState("@cf/black-forest-labs/flux-1-schnell");

  const [recentImages, setRecentImages] = useState([]);

  const [loadingRecentImages, setLoadingRecentImages] = useState(true);

  const [guidance, setGuidance] = useState(7);
  const [steps, setSteps] = useState(28);

  const [enhancePrompt, setEnhancePrompt] = useState(false);
  const [stylePreset, setStylePreset] = useState("none");

  const [originalPrompt, setOriginalPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");

  const fetchRecentImages = async () => {
    try {
      setLoadingRecentImages(true);

      const { data } = await imageApi.get("/getrecentimages");

      if (data.success) {
        setRecentImages(data.images.slice(0, 5).map((img) => img.image));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingRecentImages(false);
    }
  };

  useEffect(() => {
    const initializeVisitor = async () => {
      try {
        await imageApi.get("/");

        console.log("Visitor initialized");
        fetchRecentImages();
      } catch (error) {
        console.log(error);
      }
    };

    initializeVisitor();
  }, []);

  return (
    <div className="h-screen bg-[#08080b] overflow-hidden">
      <Navbar />

      <div className="flex flex-col lg:grid lg:grid-cols-[40%_60%] h-[calc(100vh-56px)]">
        <div className="border-r border-white/10">
          <LeftPanel
            prompt={prompt}
            setPrompt={setPrompt}
            generatedImage={generatedImage}
            setGeneratedImage={setGeneratedImage}
            loading={loading}
            setLoading={setLoading}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            generatedAspectRatio={generatedAspectRatio}
            setGeneratedAspectRatio={setGeneratedAspectRatio}
            model={model}
            setModel={setModel}
            fetchRecentImages={fetchRecentImages}
            guidance={guidance}
            setGuidance={setGuidance}
            steps={steps}
            setSteps={setSteps}
            enhancePrompt={enhancePrompt}
            setEnhancePrompt={setEnhancePrompt}
            stylePreset={stylePreset}
            setStylePreset={setStylePreset}
            originalPrompt={originalPrompt}
            setOriginalPrompt={setOriginalPrompt}
            enhancedPrompt={enhancedPrompt}
            setEnhancedPrompt={setEnhancedPrompt}
          />
        </div>

        <div className="p-1">
          <RightPanel
            generatedImage={generatedImage}
            aspectRatio={generatedAspectRatio}
            recentImages={recentImages}
            loadingRecentImages={loadingRecentImages}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
