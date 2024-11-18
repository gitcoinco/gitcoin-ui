import ReactMarkdown from "react-markdown";

import MarkdownPreview from "@uiw/react-markdown-preview";
import remarkGfm from "remark-gfm";

export const Markdown = ({ children }: { children: string }) => {
  return (
    <MarkdownPreview
      source={children}
      wrapperElement={{
        "data-color-mode": "light",
      }}
    />
  );
};
