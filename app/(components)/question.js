"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
// Hook
import { useFetchQuestion } from "../hooks/FetchQuestion";
import { updateResult } from "../hooks/setResult";
import axios from "axios";

export default function Question({ onChecked }) {
  const [checked, setChecked] = useState(undefined);
  const { trace } = useSelector((state) => state.questions);
  const result = useSelector((state) => state.result.result);
  const [{ isLoading, apiData, serverError }] = useFetchQuestion();

  // useSelector((state) => console.log(state));
  const questions = useSelector(
    (state) => state.questions.queue[state.questions.trace]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateResult({ trace, checked }));
  }, [checked]);

  const onSelect = (i) => {
    onChecked(i);
    setChecked(i);
    dispatch(updateResult({ trace, checked }));
  };

  if (isLoading) return <span class="loader text-center"></span>;
  // if (serverError) return <h3>{serverError || "Unknown Error"}</h3>;
  if (serverError)
    return (
      <h3 className="text-center text-[#f3d5b5]">{"Please Add Questions"}</h3>
    );

  const handleDelete = async (id) => {
    const passdata = {
      "id": id,
    };

    try {
      console.log(id);
      await axios.delete("http://localhost:5000/api/questions", passdata);
      alert("Delete successfully!");
    } catch (error) {
      alert("error");
      console.error("Error inserting data:", error);
    }
  };
  return (
    <div className="text-[#f3d5b5] py-10">
      <div className="flex items-center justify-between gap-48">
        <h1 className="font-bold mb-2 text-[25px] ">
          {questions?.id}) {questions?.question}{" "}
        </h1>
        <button
          onClick={(e) => handleDelete(questions?.id)}
          className="flex flex-col justify-center items-center text-red-600 hover:text-red-900"
        >
          <AiFillDelete className=" text-[20px]  " />{" "}
          <h5 className="text-[12px] leading-[12px] ">
            Delete <br /> question
          </h5>
        </button>
      </div>
      <ul key={questions?.id}>
        {questions?.options.map((q, i) => (
          <li key={i} className="flex items-center gap-3">
            <input
              type="radio"
              value={true}
              name="options"
              id={`q${i}-option`}
              onChange={() => onSelect(i)}
              className={`appearance-none h-[18px] w-[18px] rounded-full border border-[#8b5e34]
              checked:border-[#8b5e34]
              checked:bg-[#8b5e34]
cursor-pointer ${result[trace] == i ? "bg-[#8b5e34]" : "bg-[#f3d5b5]"}
              `}
            />
            <label
              htmlFor={`q${i}-option`}
              className={`cursor-pointer font-bold text-[20px] ${
                result[trace] == i ? "text-[#8b5e34]" : "text-[#f3d5b5]"
              }`}
            >
              {q}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
