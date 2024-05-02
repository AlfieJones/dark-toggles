import { DetailedHTMLProps, Dispatch, SetStateAction } from "react";

export * from "./toggles";

export interface ToggleProps
  extends Omit<
    DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "onClick"
  > {
  toggled?: boolean;
  toggle?: Dispatch<SetStateAction<boolean>>;
  duration?: number;
  reversed?: boolean;
  forceMotion?: boolean;
  idPrefix?: string;
  onToggle?: (toggled: boolean) => void;
  placeholder?: string | undefined;
  onPointerEnterCapture?:
    | React.PointerEventHandler<HTMLButtonElement>
    | undefined;
  onPointerLeaveCapture?:
    | React.PointerEventHandler<HTMLButtonElement>
    | undefined;
}
