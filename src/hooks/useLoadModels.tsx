import { useEffect } from "react";
import * as faceapi from "face-api.js";

export function useLoadModels() {
  async function initializeRecognitionModels() {
    await Promise.all([
      faceapi.loadTinyFaceDetectorModel("/models"),
      faceapi.loadFaceLandmarkModel("/models"),
      faceapi.loadFaceExpressionModel("/models"),
    ]);
  }

  useEffect(() => {
    initializeRecognitionModels();
  }, []);
}
