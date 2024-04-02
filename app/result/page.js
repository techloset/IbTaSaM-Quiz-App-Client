"use client";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetAllAction } from "../redux/question_reducer";
import { resetResultAction } from "../redux/result_reducer";
import {
  attempts_Number,
  earnPoints_Number,
  flagResult,
} from "../helper/helper";
import { usePublishResult } from "../hooks/setResult";
import MainHeading from "../(components)/mainHeading";

export default function Result() {
  const dispatch = useDispatch();

  const {
    questions: { queue, answers },
    result: { result, userId },
  } = useSelector((state) => state);

  const totalPoints = queue.length * 10;
  const attempts = attempts_Number(result);
  const earnPoints = earnPoints_Number(result, answers, 10);
  const flag = flagResult(totalPoints, earnPoints);

  // store user result
  usePublishResult({
    result,
    username: userId,
    attempts,
    points: earnPoints,
    achived: flag ? "Passed" : "Fail",
  });
  const onRestart = () => {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  };
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center gap-5 backColor text-white">
      <MainHeading />
      <div className="rounded-md border-4 border-[#8b5e34] w-[70%] p-5 flex flex-col gap-5">
        <div className="flex justify-between border-b-2 border-[#f3d5b5]">
          <span className="text-[20px] text-[#f3d5b5] font-semibold">
            Username
          </span>
          <span className="text-[20px] text-[#f3d5b5] font-semibold">
            {userId}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[18px] text-[#8b5e34] font-bold">
            Total Quiz Points:
          </span>
          <span className="text-[18px] text-[#8b5e34] font-bold">
            {totalPoints || 0}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[18px] text-[#8b5e34] font-bold">
            Total Questions:
          </span>
          <span className="text-[18px] text-[#8b5e34] font-bold">
            {queue.length || 0}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[18px] text-[#8b5e34] font-bold">
            Total Attempts:
          </span>
          <span className="text-[18px] text-[#8b5e34] font-bold">
            {attempts || 0}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[18px] text-[#8b5e34] font-bold">
            Total Earn Points:
          </span>
          <span className="text-[18px] text-[#8b5e34] font-bold">
            {earnPoints || 0}
          </span>
        </div>
        <div className="flex justify-between border-t-2 border-[#f3d5b5]">
          <span className="text-[20px] text-[#f3d5b5] font-semibold">
            Quiz Result
          </span>
          <span className={`text-[20px] text-[#f3d5b5] font-semibold `}>
            {flag ? "Passed" : "Failed"}
          </span>
        </div>
      </div>
      <Link
        href="/"
        onClick={onRestart}
        className="rounded-md bg-[#f3d5b5] text-[#8b5e34] py-1 px-8 border-2 border-[#8b5e34] hover:border-[#f3d5b5] font-extrabold hover:bg-[#8b5e34] hover:text-[#f3d5b5]"
      >
        Restart
      </Link>
    </div>
  );
}
