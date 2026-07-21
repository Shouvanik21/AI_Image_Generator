import ImagePreview from "./rightpanel/ImagePreview";
import ActionButtons from "./rightpanel/ActionButtons";
import RecentGenerations from "./rightpanel/RecentGenerations";

function RightPanel({ generatedImage }) {
  return (
    <div className="h-[calc(100vh-64px)]
px-6
py-4
flex
flex-col
overflow-hidden space-y-3">
      <ImagePreview generatedImage={generatedImage} />

      {/* <ActionButtons /> */}

      <RecentGenerations />
    </div>
  );
}

export default RightPanel;
