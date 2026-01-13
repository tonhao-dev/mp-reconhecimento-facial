import { translateExpressionToEmoji } from "../lib/utils";
import LoadingSpinner from "./LoadingSpinner";
import RenderCondition from "./RenderCondition";
import ResultMessage from "./ResultMessage";

export interface IResultCardProps {
  expression: string;
  loading: boolean;
}

export default function ResultCard({ expression, loading }: IResultCardProps) {
  return (
    <>
      <RenderCondition condition={loading}>
        <div className="text-amber-300 text-6xl flex items-center justify-center w-full">
          <LoadingSpinner />
        </div>
      </RenderCondition>
      <RenderCondition condition={!loading}>
        <span className="lg:text-[100px] text-6xl">
          {expression && translateExpressionToEmoji(expression)}
        </span>
        <h3 className="text-3xl text-right lg:text-4xl md:text-3xl text-neutral-500 font-secondary">
          <ResultMessage expression={expression} />
        </h3>
      </RenderCondition>
    </>
  );
}
