import { getButtonHTML } from "./html";

export function getHTML(
  toggleName: string,
  component: "button" | "div" | "checkbox",
  framework: "html" | "react"
) {
  return getButtonHTML(toggleName as any);
}

export function getCSS(
  toggleName: string,
  component: "button" | "div" | "checkbox"
) {
  return ".button { background-color: red; }";
}
