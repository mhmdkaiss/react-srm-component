
import React, { MouseEvent, ReactElement } from "react";
import { Icon, IconType } from "../Icon/Icon";
import "./Button.scss";

export enum ButtonTheme {
  CLASSIC = "classic",
  TOURNAMENT = "tournament",
  TRAINING = "training",
  TRACKING = "tracking",
  PREMIUM = "premium",
  RED = "red",
}

export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export enum ButtonSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  BIG = 'big'
}

export interface ButtonProps {
  label: string | ReactElement;
  theme?: ButtonTheme;
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  setClick?: (event: MouseEvent) => void;
  styleClass?: string;
  icon?: { type: IconType, width: number, height: number };
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  label,
  theme = ButtonTheme.CLASSIC,
  type = ButtonType.PRIMARY,
  size = ButtonSize.MEDIUM,
  disabled = false,
  setClick,
  styleClass,
  icon
}) => {
  const onClick = (event: MouseEvent) => {
    if (setClick) {
      setClick(event);
    }
  };

  return (
    <button
      className={`button d-flex align-items-center ${theme} ${type} ${size} ${styleClass}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <Icon styleName="mr-1" icon={icon.type} width={icon.width} height={icon.height} />}
      {label}
    </button>
  );
};
