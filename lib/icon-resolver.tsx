import React from "react";
import { Globe, Zap, Cpu, Lightbulb, Layers, HelpCircle } from "lucide-react";
import { ReactNode } from "react";

const ICON_MAP: Record<string, ReactNode> = {
  globe: <Globe />,
  zap: <Zap />,
  cpu: <Cpu />,
  lightbulb: <Lightbulb />,
  layers: <Layers />,
};

export function resolveIcon(
  iconName: string,
  className?: string
): ReactNode {
  const icon = ICON_MAP[iconName.toLowerCase()];
  if (!icon) return <HelpCircle className={className} />;

  // Clone with className if provided
  if (className && React.isValidElement(icon)) {
    return React.cloneElement(icon, { className } as any);
  }

  return icon;
}