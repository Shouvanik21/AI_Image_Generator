import ImagePreview from "./ImagePreview";
import ActionButtons from "./ActionButtons";
import RecentGenerations from "./RecentGenerations";

function RightPanel({ generatedImage, aspectRatio }) {
  return (
    <div className="h-[calc(100vh-64px)]
px-6
py-4
flex
flex-col
overflow-hidden space-y-3">
      <ImagePreview
    generatedImage={generatedImage}
    aspectRatio={aspectRatio}
/>

      {/* <ActionButtons /> */}

      <RecentGenerations />
    </div>
  );
}

export default RightPanel;
