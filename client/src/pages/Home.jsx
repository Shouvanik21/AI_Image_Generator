import Navbar from "../components/Navbar";
import LeftPanel from "../components/LeftPanel";

function Home() {
  return (
    <div className="h-screen bg-[#08080b] overflow-hidden">
      <Navbar />

      <div className="flex-1 grid grid-cols-[42%_58%]">
        <div className="border-r border-white/10">
          <LeftPanel />
        </div>

        <div className="p-10">RIGHT PANEL</div>
      </div>
    </div>
  );
}

export default Home;
