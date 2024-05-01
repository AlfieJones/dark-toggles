import { format } from "prettier/standalone";
import htmlParser from 'prettier/plugins/html'
import tsParser from 'prettier/plugins/typescript'

export const formatHTML = (html: string) => {
  return format(html, {
    parser: "html",
    htmlWhitespaceSensitivity: "ignore",
    plugins: [htmlParser],
  });
};

export const formatTSX = (tsx: string) => {
  return format(tsx, {
    parser: "typescript",
    semi: false,
    singleQuote: true,
    plugins: [tsParser],
  });
};

export const formatJSX = (jsx: string) => {
  return format(jsx, {
    parser: "babel",
    semi: false,
    singleQuote: true,
  });
};
