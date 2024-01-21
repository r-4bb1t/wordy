"use client";

import Modal from "@/app/components/modal";
import SignIn from "@/app/components/sign-in";
import { useUserStore } from "@/app/store/user-store";
import { WordType } from "@/app/types/result";
import { UserType } from "@/app/types/user";
import { Dispatch, useState } from "react";
import { IoChevronDown, IoHeart, IoHeartOutline } from "react-icons/io5";
import cc from "classcat";

export default function Words({ words }: { words: WordType[] }) {
  const { user } = useUserStore();
  const [isOpenedSignIn, setIsOpenedSignIn] = useState(false);

  const handleLike = async (word: WordType) => {
    await fetch(`/api/word/${word.word}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({ isLiked: word.isLiked }),
    });
  };

  return (
    <>
      <ul className="w-full text-sm bg-base-100 grid md:grid-cols-2">
        {words.map((word, i) => (
          <Word
            word={word}
            user={user}
            setIsOpenedSignIn={setIsOpenedSignIn}
            handleLike={handleLike}
            key={i}
          />
        ))}
      </ul>
      <Modal opened={isOpenedSignIn} close={() => setIsOpenedSignIn(false)}>
        <SignIn close={() => setIsOpenedSignIn(false)} />
      </Modal>
    </>
  );
}

const Word = ({
  word,
  user,
  setIsOpenedSignIn,
  handleLike,
}: {
  word: WordType;
  user: UserType | null;
  setIsOpenedSignIn: Dispatch<React.SetStateAction<boolean>>;
  handleLike: (word: WordType) => void;
}) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <li>
      <div className="flex flex-col break-inside-avoid divide-y cursor-pointer md:cursor-auto">
        <div className="flex justify-between w-full px-4 py-2 items-center gap-4">
          <div
            className="hover:scale-110 transition-transform swap"
            onClick={() => {
              if (!user) {
                setIsOpenedSignIn(true);
                return;
              }
            }}
          >
            <input
              type="checkbox"
              className="hidden"
              id={`word-${word.word}`}
              defaultChecked={word.isLiked}
              disabled={!user}
              onChange={() => {
                handleLike(word);
              }}
            />
            <IoHeart size={20} className="fill-primary swap-on" />
            <IoHeartOutline size={20} className="fill-primary swap-off" />
          </div>
          <div
            className="w-full font-black text-primary text-base flex flex-col md:flex-row md:gap-4"
            onClick={() => setIsOpened((s) => !s)}
          >
            <div>{word.word}</div>
            <div className="font-medium text-base">
              <span className="text-primary">
                {word.meaning.split(". ")[0] + ". "}
              </span>
              {word.meaning.split(". ")[1]}
            </div>
          </div>
          <div
            className={cc([
              "md:hidden transition-transform",
              isOpened && "rotate-180",
            ])}
          >
            <IoChevronDown />
          </div>
        </div>
        <div
          className={cc([
            "border-t border-t-base-300 justify-center overflow-hidden h-full max-h-0 md:!max-h-[500px] transition-all",
            isOpened && "max-h-[500px]",
          ])}
        >
          {word.exampleSentence.map((e, i) => (
            <div className="flex flex-col gap-1 py-3 px-4" key={i}>
              <div className="font-medium">{e.sentence}</div>
              <div className="opacity-80">{e.meaning}</div>
            </div>
          ))}
        </div>
      </div>
    </li>
  );
};