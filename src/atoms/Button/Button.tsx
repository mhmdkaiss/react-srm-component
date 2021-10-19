
import React, { MouseEvent, ReactElement } from "react";
import { Icon, IconType } from "../Icon/Icon";
import "./Button.scss";

export enum ButtonTheme {
  PRIMARY = "primary",
  TRAINING = "training",
  TOURNAMENT = "tournament",
  PREMIUM = "premium",
  OUTLINED = "outlined",
  RED = "red",
  OUTLINED_RED = "outlined-red",
}

export interface ButtonProps {
  label: string | ReactElement;
  theme: ButtonTheme;
  disabled?: boolean;
  setClick?: (event: MouseEvent) => void;
  styleClass?: string;
  icon?: { type: IconType, width: number, height: number };
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  label,
  theme,
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
      className={`button d-flex align-items-center ${theme} ${styleClass}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <Icon styleName="mr-1" icon={icon.type} width={icon.width} height={icon.height} />}
      {label}
    </button>
  );
};
