"use client";

import { useMemo, useRef, useState } from "react";

export default function AdaptiveAlgorithmSelector() {
  const [problemType, setProblemType] = useState("Sorting");
  const [inputSize, setInputSize] = useState(100000);
  const [distribution, setDistribution] = useState("Nearly Sorted");
  const [memoryConstraint, setMemoryConstraint] = useState("Medium Memory");
  const [stabilityRequired, setStabilityRequired] = useState(true);

  const [appliedConfig, setAppliedConfig] = useState({
    problemType: "Sorting",
    inputSize: 100000,
    distribution: "Nearly Sorted",
    memoryConstraint: "Medium Memory",
    stabilityRequired: true,
  });
  const [analyzed, setAnalyzed] = useState(false);

  const configSectionRef = useRef(null);
  const reportSectionRef = useRef(null);
const systemSectionRef = useRef(null);
  const algorithmDatabase = [
    {
      name: "TimSort",
      complexity: "O(n log n)",
      strengths: ["Nearly Sorted", "Stable"],
      memory: "Medium Memory",
      description: "Adaptive hybrid sorting algorithm optimized for partially sorted datasets.",
      color: "bg-green-500",
    },
    {
      name: "QuickSort",
      complexity: "O(n log n)",
      strengths: ["Random", "Fast"],
      memory: "Low Memory",
      description: "Extremely fast average-case divide-and-conquer sorting algorithm.",
      color: "bg-purple-500",
    },
    {
      name: "MergeSort",
      complexity: "O(n log n)",
      strengths: ["Stable", "Large Dataset"],
      memory: "High Memory",
      description: "Stable sorting algorithm with guaranteed performance consistency.",
      color: "bg-blue-500",
    },
    {
      name: "HeapSort",
      complexity: "O(n log n)",
      strengths: ["Worst Case", "Low Memory"],
      memory: "Low Memory",
      description: "Memory-efficient sorting with guaranteed worst-case complexity.",
      color: "bg-orange-500",
    },
  ];

  const scrollToConfig = () => {
    configSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const scrollToSystem = () => {
  systemSectionRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

  const analyzeAlgorithms = () => {
    setAppliedConfig({
      problemType,
      inputSize,
      distribution,
      memoryConstraint,
      stabilityRequired,
    });

    setAnalyzed(true);

    setTimeout(() => {
      reportSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const extractedFeatures = useMemo(() => {
    const sortedness =
      appliedConfig.distribution === "Nearly Sorted"
        ? 92
        : appliedConfig.distribution === "Random"
        ? 48
        : 10;

    const duplicateRatio = appliedConfig.inputSize > 500000 ? 31 : 14;

    return [
      `Problem Type: ${appliedConfig.problemType}`,
      `Input Size: ${appliedConfig.inputSize.toLocaleString()}`,
      `Sortedness Score: ${sortedness}%`,
      `Duplicate Ratio: ${duplicateRatio}%`,
      `Memory Constraint: ${appliedConfig.memoryConstraint}`,
      `Stability Required: ${appliedConfig.stabilityRequired ? "Yes" : "No"}`,
    ];
  }, [appliedConfig]);

  const rankedAlgorithms = useMemo(() => {
    return algorithmDatabase
      .map((algo) => {
        let score = 50;

        if (appliedConfig.distribution === "Nearly Sorted" && algo.name === "TimSort") {
          score += 40;
        }

        if (appliedConfig.distribution === "Random" && algo.name === "QuickSort") {
          score += 35;
        }

        if (appliedConfig.distribution === "Reverse Sorted" && algo.name === "MergeSort") {
          score += 25;
        }

        if (appliedConfig.memoryConstraint === "Low Memory" && algo.memory === "Low Memory") {
          score += 20;
        }

        if (appliedConfig.stabilityRequired && algo.strengths.includes("Stable")) {
          score += 25;
        }

        if (appliedConfig.inputSize > 500000 && algo.name === "MergeSort") {
          score += 15;
        }

        score = Math.min(score, 99);

        return {
          ...algo,
          score,
        };
      })
      .sort((a, b) => b.score - a.score);
  }, [appliedConfig]);

  const bestAlgorithm = rankedAlgorithms[0];

  const runtimeMetrics = useMemo(() => {
    return {
      speed: Math.min(bestAlgorithm.score + 2, 99),
      memory:
        appliedConfig.memoryConstraint === "Low Memory"
          ? 91
          : appliedConfig.memoryConstraint === "Medium Memory"
          ? 82
          : 70,
      adaptability:
        appliedConfig.distribution === "Nearly Sorted"
          ? 95
          : appliedConfig.distribution === "Random"
          ? 84
          : 76,
    };
  }, [bestAlgorithm, appliedConfig]);

  

  return (
    <div className="min-h-screen bg-[#E3E2DE] text-[#141414] overflow-hidden relative font-sans">
      <style>{`
        

        * {
          font-family: Arial, Helvetica, sans-serif;
        }

        .display-heading {
          font-family: 'Inter', sans-serif;
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 0.85;
        }

        .noise::before {
          content: '';
          position: fixed;
          inset: 0;
          opacity: 0.04;
          pointer-events: none;
          z-index: 999;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
        }

        .premium-transition {
          transition: all 0.3s linear;
        }

        @keyframes float {
          0%,100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        .float-animation {
          animation: float 7s ease-in-out infinite;
        }
      `}</style>

      <div className="noise">
        <header className="fixed top-0 left-0 w-full z-50 h-[80px] border-b border-[#C7C7C7] bg-[#E3E2DE]/95 backdrop-blur-xl px-6 md:px-12 grid grid-cols-12 items-center">
          <div className="col-span-3 uppercase tracking-tight text-sm font-black">
            ALGO 
            SELECTOR
          </div>

          <div className="col-span-6 flex items-center gap-6 uppercase tracking-[0.2em] text-[11px] font-bold text-[#7A7A7A]">
            <p>SYSTEM ACTIVE</p>
            <p>RUNTIME READY</p>
          </div>

          <div className="col-span-3 flex justify-end gap-8 text-sm font-semibold">
            <p>Engine</p>
            <p>System</p>
            <p>Access</p>
          </div>
        </header>

        <section className="min-h-[85vh] border-b border-[#C7C7C7] pt-32 px-6 md:px-12 grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-2 border-r border-[#C7C7C7] pr-10 flex flex-col justify-between pb-20">
            <div>
              <div className="w-4 h-4 bg-black mb-8" />

              <p className="uppercase tracking-[0.2em] text-xs font-bold text-[#7A7A7A]">
                Manifesto
              </p>
            </div>

            <p className="text-sm text-[#444343] leading-relaxed max-w-[220px]">
              Runtime-aware infrastructure for adaptive algorithmic decision systems.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-10 py-10 flex flex-col justify-center">
            <h1 className="display-heading uppercase max-w-6xl leading-[0.9]">
  <span className="block text-[18vw] md:text-[10rem]">
    Adaptive
  </span>
  <br></br>

  <span className="block text-[18vw] md:text-[10rem] text-[#1351AA] ml-10 md:ml-28">
    Algorithm
  </span>
  <br></br>

  <span className="block text-[18vw] md:text-[10rem] ml-30 md:ml-90">
    Selector
  </span>
  <br></br>
</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16 items-end">
              <p className="text-lg text-[#444343] max-w-[420px] leading-relaxed">
                A structured decision engine that analyzes execution patterns, input constraints, and runtime behavior to recommend optimal algorithms.
              </p>

              <div className="flex items-center gap-8">
                <button
                  onClick={scrollToConfig}
                  className="bg-[#1351AA] text-[#E3E2DE] px-8 py-5 uppercase tracking-[0.2em] text-sm font-bold premium-transition hover:bg-[#141414]"
                >
                  Start Analysis
                </button>
                <button
  onClick={scrollToSystem}
  className="underline underline-offset-4 uppercase tracking-[0.2em] text-sm font-bold"
>
  Explore System
</button>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={configSectionRef}
          className="border-b border-[#C7C7C7] px-6 md:px-12 py-24"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="uppercase tracking-[0.2em] text-xs font-bold text-[#7A7A7A] mb-6">
                Runtime Config
              </p>

              <h2 className="display-heading text-[12vw] md:text-[7rem] uppercase">
                Configure System
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#7A7A7A] block mb-3">
                  Problem Type
                </label>

                <select
                  value={problemType}
                  onChange={(e) => setProblemType(e.target.value)}
                  className="w-full border border-[#C7C7C7] bg-transparent px-4 py-4 text-sm outline-none"
                >
                  <option>Sorting</option>
                  <option>Searching</option>
                  <option>Graph Traversal</option>
                  <option>Shortest Path</option>
                  <option>Dynamic Programming</option>
                  <option>Range Queries</option>
                </select>
              </div>

              <div>
                <label className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#7A7A7A] block mb-3">
                  Distribution
                </label>

                <select
                  value={distribution}
                  onChange={(e) => setDistribution(e.target.value)}
                  className="w-full border border-[#C7C7C7] bg-transparent px-4 py-4 text-sm outline-none"
                >
                  <option>Nearly Sorted</option>
                  <option>Random</option>
                  <option>Reverse Sorted</option>
                </select>
              </div>

              <div>
                <label className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#7A7A7A] block mb-3">
                  Input Size
                </label>

                <input
                  type="number"
                  value={inputSize}
                  onChange={(e) => setInputSize(Number(e.target.value))}
                  className="w-full border border-[#C7C7C7] bg-transparent px-4 py-4 text-sm outline-none"
                />
              </div>

              <div>
                <label className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#7A7A7A] block mb-3">
                  Memory Constraint
                </label>

                <select
                  value={memoryConstraint}
                  onChange={(e) => setMemoryConstraint(e.target.value)}
                  className="w-full border border-[#C7C7C7] bg-transparent px-4 py-4 text-sm outline-none"
                >
                  <option>Low Memory</option>
                  <option>Medium Memory</option>
                  <option>High Memory</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={stabilityRequired}
                  onChange={() => setStabilityRequired(!stabilityRequired)}
                />

                <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#7A7A7A]">
                  Stable Output
                </p>
              </div>

              <button
                onClick={analyzeAlgorithms}
                className="bg-[#1351AA] text-[#E3E2DE] px-8 py-5 uppercase tracking-[0.2em] text-xs font-bold premium-transition hover:bg-[#141414]"
              >
                Execute Runtime Scan
              </button>
            </div>
          </div>
        </section>

        {analyzed && (
          <section
            ref={reportSectionRef}
            className="border-b border-[#C7C7C7] px-6 md:px-12 py-24"
          >
            <div className="max-w-3xl mx-auto mb-20 text-center">
                <p className="uppercase tracking-[0.2em] text-xs font-bold text-[#7A7A7A] mb-8">
                  Runtime Metrics
                </p>

                <div className="space-y-6 text-sm text-[#444343]">
                  <div>
                    <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#7A7A7A] mb-2">
                      Speed Efficiency
                    </p>
                    <h3 className="text-5xl font-black">
                      {runtimeMetrics.speed}%
                    </h3>
                  </div>

                  <div>
                    <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#7A7A7A] mb-2">
                      Memory Score
                    </p>
                    <h3 className="text-5xl font-black">
                      {runtimeMetrics.memory}%
                    </h3>
                  </div>

                  <div>
                    <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#7A7A7A] mb-2">
                      Adaptability
                    </p>
                    <h3 className="text-5xl font-black text-[#1351AA]">
                      {runtimeMetrics.adaptability}%
                    </h3>
                  </div>
                </div>
              </div>

            <div className="mt-24">
              <h2 className="display-heading text-[12vw] md:text-[7rem] uppercase mb-20 text-center">
                Decision Report
              </h2>

              <div className="border border-[#C7C7C7]">
                {extractedFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="border-b border-[#C7C7C7] p-8 flex items-center justify-between"
                  >
                    <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#7A7A7A]">
                      Feature 0{index + 1}
                    </p>

                    <h3 className="text-2xl md:text-4xl font-black tracking-tight text-right">
                      {feature}
                    </h3>
                  </div>
                ))}
              </div>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 border border-[#C7C7C7]">
                <div className="p-10 border-r border-[#C7C7C7]">
                  <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#7A7A7A] mb-4">
                    Selected Algorithm
                  </p>

                  <h3 className="text-5xl font-black uppercase tracking-tight text-[#1351AA]">
                    {bestAlgorithm.name}
                  </h3>
                </div>

                <div className="p-10 border-r border-[#C7C7C7]">
                  <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#7A7A7A] mb-4">
                    Complexity
                  </p>

                  <h3 className="text-5xl font-black uppercase tracking-tight">
                    {bestAlgorithm.complexity}
                  </h3>
                </div>

                <div className="p-10">
                  <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#7A7A7A] mb-4">
                    Confidence
                  </p>

                  <h3 className="text-5xl font-black uppercase tracking-tight">
                    {bestAlgorithm.score}%
                  </h3>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="border-b border-[#C7C7C7] px-6 md:px-12 py-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="display-heading text-[12vw] md:text-[7rem] uppercase mb-20">
              Select. Analyze. Optimize.
            </h2>

            <div className="grid grid-cols-1 xl:grid-cols-3 border border-[#C7C7C7]">
              {rankedAlgorithms.map((algo, index) => (
                <div
                  key={index}
                  className="border-r border-b border-[#C7C7C7] p-10 premium-transition hover:bg-white/20"
                >
                  <p className="text-xs tracking-[0.2em] font-bold text-[#7A7A7A] mb-10">
                    0{index + 1}
                  </p>

                  <h3 className="text-4xl font-black mb-6 uppercase tracking-tight">
                    {algo.name}
                  </h3>

                  <p className="text-[#444343] leading-relaxed mb-8">
                    {algo.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#7A7A7A]">
                      {algo.complexity}
                    </span>

                    <span className="text-[#1351AA] text-2xl font-black">
                      {algo.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
  ref={systemSectionRef}
  className="border-b border-[#C7C7C7] grid grid-cols-12 px-6 md:px-12 py-24"
>
  <div className="col-span-12 lg:col-span-2">
    <div className="sticky top-32">
      <p className="uppercase tracking-[0.2em] text-xs font-bold text-[#7A7A7A] mb-8">
        How It Works
      </p>

      <div className="space-y-6 text-sm leading-relaxed text-[#444343] max-w-[220px]">
        <p>
          01 — User configures runtime constraints and problem characteristics.
        </p>

        <p>
          02 — System extracts computational features from the input profile.
        </p>

        <p>
          03 — Adaptive scoring ranks algorithms based on compatibility.
        </p>

        <p>
          04 — Engine generates a final recommendation and decision report.
        </p>
      </div>
    </div>
  </div>

  <div className="col-span-12 lg:col-span-10">
    {[
      "Runtime-Aware Decisions",
      "Constraint-Driven Selection",
      "Adaptive System Scoring",
    ].map((item, index) => (
      <div
        key={index}
        className="border-t border-[#C7C7C7] py-10 flex items-start justify-between premium-transition group"
      >
        <p className="text-xs tracking-[0.2em] font-bold text-[#7A7A7A]">
          00{index + 1}
        </p>

        <h3 className="text-4xl md:text-6xl font-black tracking-tight premium-transition group-hover:text-[#1351AA]">
          {item}
        </h3>
      </div>
    ))}
  </div>
</section>
        <section className="min-h-[50vh] grid grid-cols-12 px-6 md:px-12 py-24 items-end">
          <div className="col-span-12 lg:col-span-3">
            <div className="sticky top-32">
              <p className="uppercase tracking-[0.2em] text-xs font-bold text-[#7A7A7A]">
                Access
              </p>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <h2 className="display-heading text-[15vw] md:text-[8rem] mb-10">
              Start Exploring
            </h2>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
              <p className="text-xl text-[#444343] leading-relaxed max-w-2xl">
                Build intelligent runtime systems that move beyond static logic and toward adaptive computational infrastructure.
              </p>

              <button
                onClick={scrollToConfig}
                className="bg-[#141414] text-[#E3E2DE] px-10 py-6 uppercase tracking-[0.2em] text-sm font-bold premium-transition hover:bg-[#1351AA]"
              >
                Run Adaptive Analysis
              </button>
            </div>
          </div>
        </section>

        <footer className="bg-[#141414] text-[#E3E2DE] px-6 md:px-10 py-24 border-t border-[#C7C7C7]">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">
            <div className="xl:col-span-6">
              <p className="uppercase tracking-[0.4em] text-xs font-bold mb-6 opacity-60">
                Adaptive Runtime Intelligence 
              </p>

              <h2 className="display-heading text-[10vw] leading-[0.85] uppercase mb-10">
                SIGNAL
              </h2>

             <p className="uppercase tracking-[0.4em] text-xs font-bold mb-8 opacity-60">
                  www.linkedin.com/in/choudharyyharsh
                </p>
            </div>

            <div className="xl:col-span-6 grid grid-cols-2 gap-10">
              <div>
                

                <div className="space-y-5 uppercase tracking-[0.3em] text-[11px] font-bold">
                 
                </div>
              </div>

              <div>
                <p className="uppercase tracking-[0.4em] text-xs font-bold mb-8 opacity-60">
                
                </p>

                <div className="space-y-5 uppercase tracking-[0.3em] text-[11px] font-bold">
                  
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 pt-10 border-t border-[#ccd5ae]/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs uppercase tracking-[0.3em] opacity-30">
            <p>© 2026 AdaptiveAlgoSelector</p>

            <div className="flex items-center gap-8">
              <p>Privacy</p>
              <p>Terms</p>
              <p>Runtime Policy</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
