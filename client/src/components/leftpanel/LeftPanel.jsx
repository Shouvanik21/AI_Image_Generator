import Heading from "./Heading";
import PromptSection from "./PromptSection";
import ModelSelector from "./ModelSelector";
import SliderSection from "./SliderSection";
import AspectRatio from "./AspectRatio";
import AdvancedSettings from "./AdvancedSettings";
import GenerateButton from "./GenerateButton";

function LeftPanel({
  prompt,
  setPrompt,
  generatedImage,
  setGeneratedImage,
  guidance,
  setGuidance,
  steps,
  setSteps,
  loading,
  setLoading,
  aspectRatio,
  setAspectRatio,
  model,
  setModel,setGeneratedAspectRatio,fetchRecentImages,
}) {
  return (
    <div className="h-full px-6 py-5 flex flex-col">
      <Heading />

      <div className="mt-3">
        <PromptSection prompt={prompt} setPrompt={setPrompt} />
      </div>

      <div className="mt-3">
        <ModelSelector model={model} setModel={setModel} />
      </div>

      <div className="mt-3">
        <SliderSection guidance={guidance}
  setGuidance={setGuidance}
  steps={steps}
  setSteps={setSteps}/>
      </div>

      <div className="mt-3">
        <AspectRatio
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
        />
      </div>

      <div className="mt-3">
        <AdvancedSettings />
      </div>

      <div className="mt-3">
        <GenerateButton
          prompt={prompt}
          setGeneratedImage={setGeneratedImage}
          loading={loading}
          setLoading={setLoading}
          aspectRatio={aspectRatio}
          setGeneratedAspectRatio={setGeneratedAspectRatio}
          model={model}
          fetchRecentImages={fetchRecentImages}
          guidance={guidance}
steps={steps}
        />
      </div>
    </div>
  );
}

export default LeftPanel;
