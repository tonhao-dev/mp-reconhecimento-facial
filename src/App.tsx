import { useEffect, useRef } from "react";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  async function displayWebcam() {
    if (!navigator?.mediaDevices?.getUserMedia) return;

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    const videoElement = videoRef.current;

    console.log(videoElement);

    if (!videoElement) return;

    videoElement.srcObject = stream;
  }

  useEffect(() => {
    displayWebcam();
  }, []);

  return (
    <main className="min-h-screen flex flex-col lg:flex-row md:justify-between gap-14 xl:gap-40 p-10 items-center container mx-auto">
      <Header />
      <section className="flex flex-col gap-6 flex-1 w-full">
        <div className="bg-white rounded-xl p-2">
          <div className="relative flex items-center justify-center aspect-video w-full">
            {/* Substitua pela Webcam */}
            <div className="aspect-video rounded-lg bg-gray-300 w-full">
              <video
                ref={videoRef}
                autoPlay
                className="w-full"
                style={{ transform: "scaleX(-1)" }}
              ></video>
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
