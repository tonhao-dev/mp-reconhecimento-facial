import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";
import * as faceapi from "face-api.js";
import { translateExpressionToEmoji } from "./lib/utils";
import ResultMessage from "./components/ResultMessage";
import RenderCondition from "./components/RenderCondition";

function App() {
  const [expression, setExpression] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  async function displayWebcam() {
    if (!navigator?.mediaDevices?.getUserMedia) return;

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    const videoElement = videoRef.current;

    if (!videoElement) return;

    videoElement.srcObject = stream;
  }

  async function initializeRecognitionModels() {
    await Promise.all([
      faceapi.loadTinyFaceDetectorModel("/models"),
      faceapi.loadFaceLandmarkModel("/models"),
      faceapi.loadFaceExpressionModel("/models"),
    ]);

    console.log("Modelos carregados!");
  }

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

  useEffect(() => {
    displayWebcam();
    initializeRecognitionModels();
  }, []);

  return (
    <main className="min-h-screen flex flex-col lg:flex-row md:justify-between gap-14 xl:gap-40 p-10 items-center container mx-auto">
      <Header />
      <section className="flex flex-col gap-6 flex-1 w-full">
        <div className="bg-white rounded-xl p-2">
          <div className="relative flex items-center justify-center aspect-video w-full">
            {/* Substitua pela Webcam */}
            <div className="aspect-video rounded-lg bg-gray-300 w-full">
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  className="w-full"
                  onLoadedMetadata={displayDrawnOnFace}
                ></video>
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 inset-0 w-full h-full"
                ></canvas>
              </div>
            </div>
            {/* Substitua pela Webcam */}
          </div>
        </div>
        <div
          className={`bg-white rounded-xl px-8 py-6 flex gap-6 lg:gap-20 items-center h-[200px] justify-between`}
        >
          <RenderCondition condition={isLoading}>
            <div className="text-amber-300 text-6xl flex items-center justify-center w-full">
              <LoadingSpinner />
            </div>
          </RenderCondition>
          <RenderCondition condition={!isLoading}>
            <span className="lg:text-[100px] text-6xl">
              {expression && translateExpressionToEmoji(expression)}
            </span>
            <h3 className="text-3xl text-right lg:text-4xl md:text-3xl text-neutral-500 font-secondary">
              <ResultMessage expression={expression} />
            </h3>
          </RenderCondition>
        </div>
      </section>
    </main>
  );
}

export default App;
