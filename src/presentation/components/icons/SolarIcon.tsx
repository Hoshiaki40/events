import { Icon } from "@iconify/react";

interface SolarIconProps {
  name: string;
  className?: string;
  [key: string]: any;
}

export const SolarIcon: React.FC<SolarIconProps> = ({
  name,
  className,
  ...props
}) => {
  return <Icon icon={`solar:${name}`} className={className} {...props} />;
};
