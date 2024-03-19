import { WordType } from "@/app/types/result";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { BiCheck, BiEdit, BiTrash, BiX } from "react-icons/bi";
import autosize from "autosize";

export default function ExampleSentence({
  word,
  index,
  example,
  update,
}: {
  word: string;
  index: number;
  example: { sentence: string; meaning: string };
  update: Dispatch<SetStateAction<WordType>>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [sentence, setSentence] = useState(example.sentence);
  const [meaning, setMeaning] = useState(example.meaning);

  const sentenceRef = useRef<HTMLTextAreaElement>(null);
  const meaningRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (sentenceRef.current) {
      autosize(sentenceRef.current);
    }
    if (meaningRef.current) {
      autosize(meaningRef.current);
    }
  }, [sentenceRef.current, meaningRef.current]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this sentence?")) {
      await fetch(`/api/word/${word}/${index}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      });
    }
    update((word) => ({
      ...word,
      exampleSentence: word.exampleSentence.filter((_, i) => i !== index),
    }));
  };

  const handleEdit = async () => {
    await fetch(`/api/word/${word}/${index}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({
        sentence: example.sentence,
        meaning: example.meaning,
      }),
    });
    update((word) => ({
      ...word,
      exampleSentence: word.exampleSentence.map((e, i) =>
        i === index ? example : e
      ),
    }));
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-1 py-3 px-4">
      {isEditing ? (
        <textarea
          value={sentence}
          autoFocus
          onChange={(e) => {
            setSentence(e.target.value);
            if (sentenceRef.current) {
              autosize(sentenceRef.current);
            }
          }}
          className="w-full textarea textarea-ghost resize-none p-0 min-h-0 leading-5"
          ref={sentenceRef}
        />
      ) : (
        <div className="font-medium">{example.sentence}</div>
      )}
      {isEditing ? (
        <textarea
          value={meaning}
          onChange={(e) => {
            setMeaning(e.target.value);
            if (meaningRef.current) {
              autosize(meaningRef.current);
            }
          }}
          className="w-full textarea resize-none textarea-xs textarea-ghost p-0 min-h-0 leading-4"
          ref={meaningRef}
        />
      ) : (
        <div className="text-xs opacity-80">{example.meaning}</div>
      )}
      {isEditing ? (
        <div className="flex justify-end">
          <button
            className="btn btn-circle btn-sm btn-ghost"
            onClick={handleEdit}
          >
            <BiCheck />
          </button>
          <button
            className="btn btn-circle btn-sm btn-ghost"
            onClick={() => {
              setIsEditing(false);
              setSentence(example.sentence);
              setMeaning(example.meaning);
            }}
          >
            <BiX />
          </button>
        </div>
      ) : (
        <div className="flex justify-end">
          <button
            className="btn btn-circle btn-sm btn-ghost"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            <BiEdit />
          </button>
          <button
            className="btn btn-circle btn-sm btn-ghost"
            onClick={handleDelete}
          >
            <BiTrash />
          </button>
        </div>
      )}
    </div>
  );
}
