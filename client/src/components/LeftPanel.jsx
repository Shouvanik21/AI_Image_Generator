import Heading from "./leftpanel/Heading";
import PromptSection from "./leftpanel/PromptSection";
import ModelSelector from "./leftpanel/ModelSelector";
import SliderSection from "./leftpanel/SliderSection";
import AspectRatio from "./leftpanel/AspectRatio";
import AdvancedSettings from "./leftpanel/AdvancedSettings";
import GenerateButton from "./leftpanel/GenerateButton";

function LeftPanel() {
  return (
    <div className="h-full px-6 py-5 flex flex-col">

      <Heading />

      <div className="mt-3">
        <PromptSection />
      </div>

      <div className="mt-3">
        <ModelSelector />
      </div>

      <div className="mt-3">
        <SliderSection />
      </div>

      <div className="mt-3">
        <AspectRatio />
      </div>

      <div className="mt-3">
        <AdvancedSettings />
      </div>

      <div className="mt-3">
        <GenerateButton />
      </div>

    </div>
  );
}

export default LeftPanel;