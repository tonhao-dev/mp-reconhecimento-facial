import { useRef, useState } from "react";
import Header from "./components/Header";
import { useLoadModels } from "./hooks/useLoadModels";
import WebcamCard from "./components/WecamCard";
import ResultCard from "./components/ResultCard";
import useFaceDetection, {
  ExpressionWithProbability,
} from "./hooks/useFaceDetection";

function App() {
  const [expression, setExpression] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLoadModels();
  const { drawnOnFaceDetection } = useFaceDetection({
    canvasRef: canvasRef,
    videoRef: videoRef,
    onDetectExpression,
    onFinishDraw,
  });

  function onDetectExpression(expressions: ExpressionWithProbability[]) {
    const { expression } = expressions[0];
    setExpression(expression);
  }

  function onFinishDraw() {
    setIsLoading(false);
  }

  return (
    <main className="min-h-screen flex flex-col lg:flex-row md:justify-between gap-14 xl:gap-40 p-10 items-center container mx-auto">
      <Header />
      <section className="flex flex-col gap-6 flex-1 w-full">
        <div className="bg-white rounded-xl p-2">
          <WebcamCard
            videoRef={videoRef}
            canvasRef={canvasRef}
            onLoadedMetadata={drawnOnFaceDetection}
          />
        </div>
        <div
          className={`bg-white rounded-xl px-8 py-6 flex gap-6 lg:gap-20 items-center h-[200px] justify-between`}
        >
          <ResultCard expression={expression} loading={isLoading} />
        </div>
      </section>
    </main>
  );
}

export default App;
