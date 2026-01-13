import { useRef, useState } from "react";
import Header from "./components/Header";
import * as faceapi from "face-api.js";
import { useLoadModels } from "./hooks/useLoadModels";
import WebcamCard from "./components/WecamCard";
import ResultCard from "./components/ResultCard";

function App() {
  const [expression, setExpression] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLoadModels();

  async function displayDrawnOnFace() {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;

    if (!videoElement || !canvasElement) {
      return;
    }

    const detection = await faceapi
      .detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    if (!detection) {
      setTimeout(displayDrawnOnFace, 1000);
      return;
    }

    const mostProbablyExpression = detection?.expressions.asSortedArray()[0];
    setExpression(mostProbablyExpression?.expression);

    const dimensions = faceapi.matchDimensions(
      canvasElement,
      videoElement,
      true
    );

    const resizedResults = faceapi.resizeResults(detection, dimensions);

    faceapi.draw.drawDetections(canvasElement, resizedResults);
    faceapi.draw.drawFaceLandmarks(canvasElement, resizedResults);
    faceapi.draw.drawFaceExpressions(canvasElement, resizedResults);

    setIsLoading(false);

    setTimeout(displayDrawnOnFace, 1000);
  }

  return (
    <main className="min-h-screen flex flex-col lg:flex-row md:justify-between gap-14 xl:gap-40 p-10 items-center container mx-auto">
      <Header />
      <section className="flex flex-col gap-6 flex-1 w-full">
        <div className="bg-white rounded-xl p-2">
          <WebcamCard
            videoRef={videoRef}
            canvasRef={canvasRef}
            onLoadedMetadata={displayDrawnOnFace}
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
