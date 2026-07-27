import { useState } from "react";

function SliderSection({
  guidance,
  setGuidance,
  steps,
  setSteps,
}) {
    return (
    <div className="grid grid-cols-2 gap-3 mt-1.5 mb-1">

      {/* Guidance */}

      <div className="bg-[#18181C] border border-white/10 rounded-xl p-3">

        <div className="flex justify-between items-center">

          <span className="text-[13px] text-gray-300">
            Guidance
          </span>

          <span className="text-[13px] font-semibold text-white">
            {guidance}
          </span>

        </div>

        <input
          type="range"
          min="1"
          max="20"
          value={guidance}
          onChange={(e) => setGuidance(e.target.value)}
          className="w-full mt-2 accent-violet-500"
        />

      </div>

      {/* Steps */}

      <div className="bg-[#18181C] border border-white/10 rounded-2xl p-4">

        <div className="flex justify-between items-center">

          <span className="text-[13px] text-gray-300">
            Steps
          </span>

          <span className="text-[13px] font-semibold text-white">
            {steps}
          </span>

        </div>

        <input
          type="range"
          min="10"
          max="50"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          className="w-full mt-2 accent-violet-500"
        />

      </div>

    </div>
  );
}

export default SliderSection;