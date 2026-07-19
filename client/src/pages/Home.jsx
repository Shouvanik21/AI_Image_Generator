import Navbar from "../components/Navbar";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";

function Home() {
  return (
    <div className="h-screen bg-[#08080b] overflow-hidden">
      <Navbar />

      <div className="flex-1 grid grid-cols-[40%_60%]">
        <div className="border-r border-white/10">
          <LeftPanel />
        </div>

        <div className="p-1"><RightPanel /></div>
      </div>
    </div>
  );
}

export default Home;
