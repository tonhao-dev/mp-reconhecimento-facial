import { useEffect, useRef } from "react";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";
import * as faceapi from "face-api.js";

function App() {
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

    const detection = await faceapi.detectSingleFace(
      videoElement,
      new faceapi.TinyFaceDetectorOptions()
    );

    if (!detection) {
      setTimeout(displayDrawnOnFace, 1000);
      return;
    }

    const dimensions = faceapi.matchDimensions(
      canvasElement,
      videoElement,
      true
    );

    faceapi.draw.drawDetections(
      canvasElement,
      faceapi.resizeResults(detection, dimensions)
    );

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
          className={`bg-white rounded-xl px-8 py-6 flex gap-6 lg:gap-20 items-center h-[200px] justify-center`}
        >
          <p className="text-4xl text-center flex justify-center items-center text-yellow-300">
            {/* Substitua pelo texto */}
            <LoadingSpinner />
            {/* Substitua pelo texto */}
          </p>
        </div>
      </section>
    </main>
  );
}

export default App;
