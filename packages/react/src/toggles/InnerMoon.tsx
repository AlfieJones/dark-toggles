import "../../../../build/inner-moon-min.css";
import React, { DetailedHTMLProps, Dispatch, SetStateAction, useState, forwardRef } from "react";
export interface ToggleProps extends Omit<DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "onClick"> {
  toggled?: boolean;
  toggle?: Dispatch<SetStateAction<boolean>>;
  reversed?: boolean;
  duration?: number;
  onToggle?: (toggled: boolean) => void;
}
;
const SvgInnerMoon = forwardRef<HTMLButtonElement, ToggleProps>((props: ToggleProps, ref) => {
  const {
    onToggle,
    toggled,
    toggle,
    duration,
    reversed = false,
    "aria-label": ariaLabel = "Toggle Theme",
    className,
    ...rest
  } = props;
  const [toggledInternal, toggleInternal] = useState(false);
  const toggleFunction = toggle || toggleInternal;
  const isToggled = toggled !== undefined ? toggled : toggledInternal;
  const btnClass = `${reversed ? "theme-toggle--reversed" : "theme-toggle"} ${isToggled && "dark"}  ${className}`;

  const handleClick = () => {
    const mToggled = !isToggled;
    toggleFunction(mToggled);
    onToggle && onToggle(mToggled);
  };

  return <button ref={ref} className={btnClass} aria-label={ariaLabel} onClick={handleClick} {...rest}>
            {<svg xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" fill="currentColor" className="theme-toggle__inner-moon" viewBox="0 0 472.39 472.39" width="1em" height="1em"><g className="theme-toggle__inner-moon__toggle-outer"><path d="M403.21,167V69.18H305.38L236.2,0,167,69.18H69.18V167L0,236.2l69.18,69.18v97.83H167l69.18,69.18,69.18-69.18h97.83V305.38l69.18-69.18Zm-167,198.17a129,129,0,1,1,129-129A129,129,0,0,1,236.2,365.19Z" /></g><g className="theme-toggle__inner-moon__toggle-inner"><circle cx={236.2} cy={236.2} r={103.78} /></g></svg>}
          </button>;
});
export default SvgInnerMoon;