import { FC, ReactNode } from "react";

interface RenderConditionProps {
  condition: boolean;
  fallback?: ReactNode;
  children: ReactNode;
}

const RenderCondition: FC<RenderConditionProps> = ({
  condition,
  children,
  fallback = <></>,
}) => {
  if (!condition) return fallback;
  return <>{children}</>;
};

export default RenderCondition;
