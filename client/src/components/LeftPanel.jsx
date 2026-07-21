import Heading from "./leftpanel/Heading";
import PromptSection from "./leftpanel/PromptSection";
import ModelSelector from "./leftpanel/ModelSelector";
import SliderSection from "./leftpanel/SliderSection";
import AspectRatio from "./leftpanel/AspectRatio";
import AdvancedSettings from "./leftpanel/AdvancedSettings";
import GenerateButton from "./leftpanel/GenerateButton";

function LeftPanel({
  prompt,
  setPrompt,
  generatedImage,
  setGeneratedImage,
  loading,
  setLoading,
  aspectRatio,
  setAspectRatio,
  model,
  setModel,
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
        <SliderSection />
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
          model={model}
        />
      </div>
    </div>
  );
}

export default LeftPanel;
