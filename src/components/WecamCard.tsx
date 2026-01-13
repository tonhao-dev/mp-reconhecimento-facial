import useWebcam from "../hooks/useWebcam";

export interface IWebcamCardProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onLoadedMetadata: React.DOMAttributes<HTMLVideoElement>["onLoadedMetadata"];
}

export default function WebcamCard({
  videoRef,
  canvasRef,
  onLoadedMetadata,
  ...rest
}: IWebcamCardProps) {
  useWebcam(videoRef);

  return (
    <div
      {...rest}
      className="relative flex items-center justify-center aspect-video w-full"
    >
      <div className="aspect-video rounded-lg bg-gray-300 w-full">
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            className="w-full"
            onLoadedMetadata={onLoadedMetadata}
          ></video>
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 inset-0 w-full h-full"
          ></canvas>
        </div>
      </div>
    </div>
  );
}
