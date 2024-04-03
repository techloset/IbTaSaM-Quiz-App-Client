"use client";
import axios from "axios";
import React, { useState } from "react";
import { FaQuestion } from "react-icons/fa";

import { useSelector } from "react-redux";

export default function Topbar() {
  const [model, setModel] = useState(true);
  const {
    questions: { queue },
  } = useSelector((state) => state);

  const handleModel = () => {
    setModel(!model);
  };

  const [question, setQuestion] = useState();
  const [optionsA, setOptionsA] = useState();
  const [optionsB, setOptionsB] = useState();
  const [optionsC, setOptionsC] = useState();
  const [answer, setAnswer] = useState();

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionAChange = (e) => {
    setOptionsA(e.target.value);
  };

  const handleOptionBChange = (e) => {
    setOptionsB(e.target.value);
  };

  const handleOptionCChange = (e) => {
    setOptionsC(e.target.value);
  };

  const handleAnswer = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (!question) return alert("Please Enter Question");
    if (!optionsA) return alert("Please Enter Option A");
    if (!optionsB) return alert("Please Enter Option B");
    if (!optionsC) return alert("Please Enter Option C");
    if (!answer) return alert("Please Enter Correct Option");
    try {
      let num;
      switch (answer) {
        case optionsA:
          num = 0;
          break;
        case optionsB:
          num = 1;
          break;
        case optionsC:
          num = 2;
          break;
        default:
          num = undefined;
      }

      const questionID = queue.length + 1;
      const formData = {
        questions: [
          {
            id: questionID,
            question: question,
            options: [optionsA, optionsB, optionsC],
          },
        ],
        answers: [num],
      };
      console.log(formData);
      await axios.post(
        "https://ibtasam-quiz-app-server.vercel.app/api/questions",
        formData
      );
      alert("Data inserted successfully!");
      setQuestion("");
      setOptionsA("");
      setOptionsB("");
      setOptionsC("");
      setAnswer("");
      handleModel();
    } catch (error) {
      alert("Data inserted successfully!");
      console.error("Error inserting data:", error);
    }
  };

  const renderQuestions = () => {
    return (
      <div className="flex flex-col gap-5 mb-5">
        <input
          type="text"
          value={question}
          onChange={(e) => handleQuestionChange(e)}
          placeholder={`Question`}
          className="outline-none bg-[#f3d5b5] border-2 border-[#8b5e34] rounded-md py-2 px-3 text-[#8b5e34] placeholder:text-[#8b5e34] placeholder:font-semibold"
        />
        <input
          type="text"
          value={optionsA}
          onChange={(e) => handleOptionAChange(e)}
          placeholder={`Option A`}
          className="outline-none bg-[#f3d5b5] border-2 border-[#8b5e34] rounded-md py-2 px-3 text-[#8b5e34] placeholder:text-[#8b5e34] placeholder:font-semibold"
        />
        <input
          type="text"
          value={optionsB}
          onChange={(e) => handleOptionBChange(e)}
          placeholder={`Option B`}
          className="outline-none bg-[#f3d5b5] border-2 border-[#8b5e34] rounded-md py-2 px-3 text-[#8b5e34] placeholder:text-[#8b5e34] placeholder:font-semibold"
        />
        <input
          type="text"
          value={optionsC}
          onChange={(e) => handleOptionCChange(e)}
          placeholder={`Option C`}
          className="outline-none bg-[#f3d5b5] border-2 border-[#8b5e34] rounded-md py-2 px-3 text-[#8b5e34] placeholder:text-[#8b5e34] placeholder:font-semibold"
        />
        <input
          type="text"
          value={answer}
          onChange={(e) => handleAnswer(e)}
          placeholder={`Correct Option`}
          className="outline-none bg-[#f3d5b5] border-2 border-[#8b5e34] rounded-md py-2 px-3 text-[#8b5e34] placeholder:text-[#8b5e34] placeholder:font-semibold"
        />
      </div>
    );
  };

  return (
    <>
      <div className="h-10 w-full absolute flex justify-between items-center px-10  border-b-2 border-[#8b5e34] hover:border-[#f3d5b5] ">
        <div className="text-[#8b5e34] hover:text-[#f3d5b5] font-semibold text-xl flex gap-3">
          <FaQuestion />
          <FaQuestion />
          <FaQuestion />
        </div>
        <button
          onClick={handleModel}
          className="font-semibold text-xl text-[#8b5e34] hover:text-[#f3d5b5]"
        >
          Add Questions
        </button>

        <div
          class={`${
            model ? "hidden" : ""
          }   fixed top-0 left-0 justify-center items-center w-full`}
        >
          <div class="relative p-4 w-full max-w-2xl max-h-full">
            <div class="relative bg-[#f3d5b5] border-4 border-[#8b5e34] p-4 rounded-lg shadow-2xl">
              <form onSubmit={handleSubmit}>
                {renderQuestions()}
                <button
                  type="submit"
                  className="rounded-md bg-[#f3d5b5] text-[#8b5e34] py-1 px-8 font-extrabold hover:bg-[#8b5e34] hover:text-[#f3d5b5] block mx-auto"
                >
                  Add Question
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
