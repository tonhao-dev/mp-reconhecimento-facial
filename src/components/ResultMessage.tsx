import { ReactElement } from "react";
import { FaceExpressionKey } from "../lib/utils";

export default function ResultMessage({ expression }: { expression: string }) {
  const message: Record<FaceExpressionKey, ReactElement> = {
    angry: (
      <>
        Por que a expressão <span className="text-black">brava?</span>
      </>
    ),
    disgusted: (
      <>
        Sua expressão está <span className="text-black">enjoada</span>.
      </>
    ),
    fearful: (
      <>
        Do que você tem <span className="text-black">medo</span>?
      </>
    ),
    happy: (
      <>
        Você está <span className="text-black">feliz</span>. Aproveite!
      </>
    ),
    neutral: (
      <>
        Sua expressão está <span className="text-black">neutra</span>.
      </>
    ),
    sad: (
      <>
        Você está um pouco <span className="text-black">triste</span> hoje...
      </>
    ),
    surprised: (
      <>
        Parece que há alguma <span className="text-black">surpresa</span> aí!
      </>
    ),
  };

  return (
    <div>{message[expression as FaceExpressionKey] || message["neutral"]}</div>
  );
}
