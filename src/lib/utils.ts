export type FaceExpressionKey =
  | "neutral"
  | "happy"
  | "sad"
  | "angry"
  | "fearful"
  | "disgusted"
  | "surprised";

export function translateExpressionToEmoji(expression: string) {
  const dict: Record<FaceExpressionKey, string> = {
    neutral: "😐",
    happy: "😄",
    sad: "😢",
    angry: "😠",
    fearful: "😨",
    disgusted: "🤢",
    surprised: "😲",
  };

  if (!Object.keys(dict).includes(expression)) return dict["neutral"];

  return dict[expression as keyof typeof dict];
}
