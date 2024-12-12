// icons.tsx
import React from "react";
import { cn } from "@/src/utils";
import { Icon } from "@iconify/react";

interface IconProps {
  className?: string;
  [key: string]: any;
}

const createSolarIcon = (name: string) => {
  return React.memo(({ className, ...props }: IconProps) => (
    <Icon
      icon={`solar:${name}`}
      className={cn("size-6", className)}
      {...props}
    />
  ));
};

// Définissez ici toutes les icônes que vous utilisez
// !Broken
// !Line Duotone
// !Linear
// !Outline
export const BoltCircleOutlineIcon = createSolarIcon("bolt-circle-outline");
export const EyeClosedOutlineIcon = createSolarIcon("eye-closed-outline");
export const EyeOutlineIcon = createSolarIcon("eye-outline");
export const Home2OutlineIcon = createSolarIcon("home-2-outline");
export const SidebarOutlineIcon = createSolarIcon("siderbar-outline");
export const QuestionCircleOutlineIcon = createSolarIcon(
  "question-circle-outline"
);
export const MinusCircleOutlineIcon = createSolarIcon("minus-circle-outline");
export const DangerTriangleOutlineIcon = createSolarIcon(
  "danger-triangle-outline"
);
// !Bold
export const EyeClosedBoldIcon = createSolarIcon("eye-closed-bold");
export const EyeBoldIcon = createSolarIcon("eye-bold");
export const AccessibilityBoldIcon = createSolarIcon("accessibility-bold");
export const UserBoldIcon = createSolarIcon("user-bold");
export const LockBoldIcon = createSolarIcon("lock-bold");
export const EyeSlashBoldIcon = createSolarIcon("eye-slash-bold");
// !Bold Duotone

// Vous pouvez également exporter un composant générique SolarIcon si nécessaire
export const SolarIcon = React.memo<IconProps & { name: string }>(
  ({ name, ...props }) => <Icon icon={`solar:${name}`} {...props} />
);
