import * as faceapi from "face-api.js";

export type ExpressionWithProbability = {
  expression: string;
  probability: number;
};

export interface IUseFaceDetectionProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onDetectExpression: (expressions: ExpressionWithProbability[]) => void;
  onFinishDraw?: () => void;
}

export default function useFaceDetection({
  videoRef,
  canvasRef,
  onDetectExpression,
  onFinishDraw,
}: IUseFaceDetectionProps) {
  async function drawnOnFaceDetection() {
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
      setTimeout(drawnOnFaceDetection, 1000);
      return;
    }

    onDetectExpression(detection?.expressions.asSortedArray());

    const dimensions = faceapi.matchDimensions(
      canvasElement,
      videoElement,
      true
    );

    const resizedResults = faceapi.resizeResults(detection, dimensions);

    faceapi.draw.drawDetections(canvasElement, resizedResults);
    faceapi.draw.drawFaceLandmarks(canvasElement, resizedResults);
    faceapi.draw.drawFaceExpressions(canvasElement, resizedResults);

    onFinishDraw && onFinishDraw();

    setTimeout(drawnOnFaceDetection, 1000);
  }

  return { drawnOnFaceDetection };
}
