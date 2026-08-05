import ImagePreview from "./ImagePreview";
import RecentGenerations from "./RecentGenerations";

function RightPanel({
  generatedImage,
  aspectRatio,
  recentImages,
  loadingRecentImages,
}) {
  return (
    <div
      className="h-[calc(100vh-64px)]
px-6
py-4
flex
flex-col
overflow-hidden space-y-3"
    >
      <ImagePreview generatedImage={generatedImage} aspectRatio={aspectRatio} />

      <RecentGenerations
        recentImages={recentImages}
        loadingRecentImages={loadingRecentImages}
      />
    </div>
  );
}

export default RightPanel;
