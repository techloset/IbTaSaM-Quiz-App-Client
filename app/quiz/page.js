"use client";
import React, { useState } from "react";
import Question from "../(components)/question";
import { MoveNextQuestion, MovePrevQuestion } from "../hooks/FetchQuestion";
import { useSelector, useDispatch } from "react-redux";
import { PushAnswer } from "../hooks/setResult";
import { useRouter } from "next/navigation";
import MainHeading from "../(components)/mainHeading";
import Topbar from "../(components)/topbar";
export default function Quiz() {
  const [check, setChecked] = useState(undefined);

  const result = useSelector((state) => state.result.result);
  const { queue, trace } = useSelector((state) => state.questions);
  const dispatch = useDispatch();

  const onNext = () => {
    if (trace < queue.length) {
      dispatch(MoveNextQuestion());

      if (result.length <= trace) {
        dispatch(PushAnswer(check));
      }
    }

    setChecked(undefined);
  };

  const onPrev = () => {
    if (trace > 0) {
      dispatch(MovePrevQuestion());
    }
  };

  const onChecked = (check) => {
    setChecked(check);
  };

  const router = useRouter();
  if (result.length && result.length >= queue.length) {
    router.push("/result");
  }

  return (
    <>
      <Topbar />
      <div className="h-[100vh] flex flex-col items-center justify-center gap-5 backColor">
        <div>
          <MainHeading />
          <Question onChecked={onChecked} />
        </div>
        <div className="flex  gap-40">
          {trace > 0 ? (
            <button
              onClick={onPrev}
              className="rounded-md bg-[#f3d5b5] text-[#8b5e34] py-1 px-8 font-extrabold hover:bg-[#8b5e34] hover:text-[#f3d5b5]"
            >
              Prev
            </button>
          ) : (
            <></>
          )}
          <button
            onClick={onNext}
            className="rounded-md bg-[#f3d5b5] text-[#8b5e34] py-1 px-8 font-extrabold hover:bg-[#8b5e34] hover:text-[#f3d5b5]"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
