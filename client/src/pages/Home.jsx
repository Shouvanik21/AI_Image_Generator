import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import imageApi from "../services/imageApi";

function Home() {
  const [prompt, setPrompt] = useState("");

  const [generatedImage, setGeneratedImage] = useState("");

  const [loading, setLoading] = useState(false);

  const [aspectRatio, setAspectRatio] = useState("1:1");

  useEffect(() => {
    const initializeVisitor = async () => {
      try {
        await imageApi.get("/");

        console.log("Visitor initialized");
      } catch (error) {
        console.log(error);
      }
    };

    initializeVisitor();
  }, []);

  return (
    <div className="h-screen bg-[#08080b] overflow-hidden">
      <Navbar />

      <div className="flex-1 grid grid-cols-[40%_60%]">
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
          />
        </div>

        <div className="p-1">
          <RightPanel generatedImage={generatedImage} />
        </div>
      </div>
    </div>
  );
}

export default Home;
