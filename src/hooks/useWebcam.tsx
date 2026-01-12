import { useEffect } from "react";

export default function useWebcam(videoRef: React.RefObject<HTMLVideoElement>) {
  async function loadWebcam() {
    if (!navigator?.mediaDevices?.getUserMedia) return;

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    const videoElement = videoRef.current;

    if (!videoElement) return;

    videoElement.srcObject = stream;
  }

  useEffect(() => {
    loadWebcam();
  }, []);
}
