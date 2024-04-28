import { format } from "prettier";

export const formatHTML = (html: string) => {
  return format(html, {
    parser: "html",
    htmlWhitespaceSensitivity: "ignore",
  });
};

export const formatTSX = (tsx: string) => {
  return format(tsx, {
    parser: "typescript",
    semi: false,
    singleQuote: true,
  });
};

export const formatJSX = (jsx: string) => {
  return format(jsx, {
    parser: "babel",
    semi: false,
    singleQuote: true,
  });
};
