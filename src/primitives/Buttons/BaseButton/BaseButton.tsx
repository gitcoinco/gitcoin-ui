import React from "react";

import { cn } from "@/lib/utils";
import { Button, ButtonSizes, ButtonVariants } from "@/ui-shadcn/button";

// Assuming you have a utility function to concatenate classes

interface BaseButtonProps {
  value: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
}

export const BaseButton: React.FC<BaseButtonProps> = ({
  value,
  onClick,
  disabled,
  variant = "primary",
  size = "default",
  icon,
  iconPosition = "left",
  className,
  ...props
}) => {
  return (
    <Button
      onClick={disabled ? null : onClick}
      disabled={disabled}
      variant={variant}
      size={size}
      className={cn("flex items-center", className)}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      <span>{value}</span>
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </Button>
  );
};
