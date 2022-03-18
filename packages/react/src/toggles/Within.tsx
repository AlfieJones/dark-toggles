import "../../../../css/within.min.css";
import React, { useState, forwardRef } from "react";
import { ToggleProps } from "../";
const SvgWithin = forwardRef<HTMLButtonElement, ToggleProps>((props: ToggleProps, ref) => {
  const {
    onToggle,
    toggled,
    toggle,
    duration = 750,
    reversed = false,
    style,
    "aria-label": ariaLabel = "Toggle Theme",
    className,
    ...rest
  } = props;
  const [toggledInternal, toggleInternal] = useState(false);
  const toggleFunction = toggle || toggleInternal;
  const isToggled = toggled !== undefined ? toggled : toggledInternal;
  const btnClass = `theme-toggle ${isToggled ? "theme-toggle--toggled" : ""} ${reversed ? "theme-toggle--reversed" : ""} ${className ? className : ""}`.trim();
  const btnStyle = { ...style,
    "--theme-toggle__within--duration": `${duration}ms`
  };

  const handleClick = () => {
    const mToggled = !isToggled;
    toggleFunction(mToggled);
    onToggle && onToggle(mToggled);
  };

  return <button ref={ref} className={btnClass} style={btnStyle} aria-label={ariaLabel} onClick={handleClick} {...rest}>
            {<svg xmlns="http://www.w3.org/2000/svg" className="theme-toggle__within" height="1em" width="1em" viewBox="0 0 512 512" fill="currentColor"><mask id="theme-toggle__classic__hide" color="#000"><rect fill="#fff" height={512} width={512} /><circle cx={256} cy={256} r={152} /></mask><g mask="url(#theme-toggle__classic__hide)"><path className="theme-toggle__within__outer" d="m498.4 343.1-60.5-87.9 60.4-87.1a14.6 14.6 0 0 0-9.4-22.7l-104.3-18.9-18.8-104.3a14.6 14.6 0 0 0-22.7-9.4L256 74.1l-87.9-60.4a14.6 14.6 0 0 0-22.7 9.4l-18 104.3L23 146.2c-10.5 1.8-15.5 14-9.4 21.8l60.5 88-60.4 87.1a14.6 14.6 0 0 0 9.4 22.7l104.3 18.9L146.3 489a14.6 14.6 0 0 0 22.7 9.4l87.1-60.4 87.1 60.4a14.6 14.6 0 0 0 22.7-9.4l18.9-104.3L489 365.8a14.7 14.7 0 0 0 9.4-22.7zM256 405.4a150.2 150.2 0 1 1 150.3-150.3c0 83.6-66.7 150.3-150.3 150.3z" /></g><path className="theme-toggle__within__circle" d="M256 118.9c-75.2 0-134.9 61-134.9 134.9S179.5 391.3 256 391.3s134.9-61 134.9-134.9S331.2 118.9 256 118.9zm0 236.7c-56.4 0-99.5-46.9-99.5-101.4s44-99.5 99.5-99.5 99.5 46.9 99.5 101.4-43.1 99.5-99.5 99.5z" /><path className="theme-toggle__within__inner" d="M256 148.6c-58.8 0-105.5 47.7-105.5 105.5S196.2 361.7 256 361.7 361.5 314 361.5 256.1 314.8 148.6 256 148.6z" /></svg>}
          </button>;
});
export default SvgWithin;