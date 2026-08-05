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
  setModel,
  setGeneratedAspectRatio,
  fetchRecentImages,
  enhancePrompt,
  setEnhancePrompt,
  stylePreset,
  setStylePreset,
  originalPrompt,
  setOriginalPrompt,
  enhancedPrompt,
  setEnhancedPrompt,
}) {
  return (
    <div className="h-full px-4 md:px-6 py-4 md:py-5 flex flex-col overflow-y-auto">
      <Heading />

      <div className="mt-3">
        <PromptSection
          prompt={prompt}
          setPrompt={setPrompt}
          originalPrompt={originalPrompt}
          setOriginalPrompt={setOriginalPrompt}
          enhancedPrompt={enhancedPrompt}
          setEnhancedPrompt={setEnhancedPrompt}
          enhancePrompt={enhancePrompt}
        />
      </div>

      <div className="mt-3">
        <ModelSelector model={model} setModel={setModel} />
      </div>

      <div className="mt-3">
        <SliderSection
          guidance={guidance}
          setGuidance={setGuidance}
          steps={steps}
          setSteps={setSteps}
        />
      </div>

      <div className="mt-3">
        <AspectRatio
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
        />
      </div>

      <div className="mt-3">
        <AdvancedSettings
          prompt={prompt}
          setPrompt={setPrompt}
          originalPrompt={originalPrompt}
          setOriginalPrompt={setOriginalPrompt}
          enhancePrompt={enhancePrompt}
          setEnhancePrompt={setEnhancePrompt}
          stylePreset={stylePreset}
          setStylePreset={setStylePreset}
        />
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
          enhancePrompt={enhancePrompt}
          stylePreset={stylePreset}
        />
      </div>
    </div>
  );
}

export default LeftPanel;
