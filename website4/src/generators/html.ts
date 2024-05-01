import { formatHTML } from "./utils";
import * as Toggles from "@theme-toggles/svgs";

type ToggleName = keyof typeof Toggles;

export function getButtonHTML(toggleName: ToggleName): Promise<string> {
  const svg = Toggles[toggleName];

  const html = `
  <button
    class="theme-toggle"
    type="button"
    title="Toggle theme"
    aria-label="Toggle theme"
  >
    ${svg}
  </button>`;

  return formatHTML(html);
}

export function getDivHTML(toggleName: ToggleName): Promise<string> {
  const svg = Toggles[toggleName];

  const html = `
  <div class="theme-toggle" title="Toggle theme">
    <span class="theme-toggle-sr">Toggle theme</span>
    ${svg}
  </div>`;

  return formatHTML(html);
}
