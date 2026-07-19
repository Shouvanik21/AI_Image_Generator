import ImagePreview from "./rightpanel/ImagePreview";
import ActionButtons from "./rightpanel/ActionButtons";
import RecentGenerations from "./rightpanel/RecentGenerations";

function RightPanel() {
  return (
    <div className="h-[calc(100vh-64px)]
px-6
py-4
flex
flex-col
overflow-hidden space-y-3">
      <ImagePreview />

      <ActionButtons />

      <RecentGenerations />
    </div>
  );
}

export default RightPanel;
