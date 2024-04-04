"use client";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { setUserId } from "../redux/result_reducer";
import { useRouter } from "next/navigation";
import MainHeading from "../(components)/mainHeading";

export default function Main() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const router = useRouter();
  const startQuiz = () => {
    if (inputRef.current?.value) {
      dispatch(setUserId(inputRef.current?.value));
      router.push("/quiz");
    }
  };
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center gap-5 backColor text-white">
      <div>
        <MainHeading />
        <ol className="text-[#f3d5b5] space-y-3 my-5">
          <li>You will be asked 5 questions one after another.</li>
          <li>10 points is awarded for the correct answer.</li>
          <li>
            Each question has three options. You can choose only one options.
          </li>
          <li>You can review and change answers before the quiz finish.</li>
          <li>The result will be declared at the end of the quiz.</li>
        </ol>
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Username"
        className=" rounded-md bg-[#8b5e34] text-[#f3d5b5] py-1 px-3 placeholder:text-[#f3d5b5] outline-[#f3d5b5]"
      />
      <button
        className="rounded-md bg-[#f3d5b5] text-[#8b5e34] py-1 px-8 border-2 border-[#8b5e34] hover:border-[#f3d5b5] font-extrabold hover:bg-[#8b5e34] hover:text-[#f3d5b5]"
        onClick={startQuiz}
      >
        Start Quiz
      </button>
    </div>
  );
}
