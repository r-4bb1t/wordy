"use client";

import { useState } from "react";

import MDEditor from "@uiw/react-md-editor";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

export default function Editor() {
  const [value, setValue] = useState("**Hello world!!!**");

  return (
    <div>
      <MDEditor
        value={value}
        onChange={(value) => {
          if (value) setValue(value);
        }}
        preview="edit"
        hideToolbar
        className="w-96 h-48"
      />
    </div>
  );
}
