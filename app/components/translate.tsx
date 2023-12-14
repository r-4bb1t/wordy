"use client";

import { useCallback, useState } from "react";

import MDEditor from "@uiw/react-md-editor";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

export default function Translate() {
  const [value, setValue] = useState("hi my name is hc");
  const [result, setResult] = useState("");

  const handleSubmit = useCallback(async () => {
    const res = await fetch("/api/papago", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: value }),
    });
    const { message } = await res.json();
    setResult(message.result.translatedText);
  }, [value]);

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
      <button onClick={() => handleSubmit()} className="btn" />
      <div>
        <MDEditor
          value={result}
          onChange={(value) => {
            if (value) setResult(value);
          }}
          preview="edit"
          hideToolbar
          className="w-96 h-48"
        />
      </div>
    </div>
  );
}
