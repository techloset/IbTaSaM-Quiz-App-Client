import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import data, { answers } from "../database/data";

import * as Action from "../redux/question_reducer";
import { getServerData } from "../helper/helper";

export const useFetchQuestion = () => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }));

    (async () => {
      try {
        // let question = await data;
        const [questions] = await getServerData(
          "http://localhost:5000/api/questions"
        );

        const question = questions.questions;
        const answers = questions.answers;
        console.log({ question, answers });
        if (question.length > 0) {
          setGetData((prev) => ({ ...prev, isLoading: false }));
          setGetData((prev) => ({ ...prev, apiData: { question, answers } }));

          dispatch(Action.startExamAction({ question, answers }));
        } else {
          throw new Error("No Question Avalible");
        }
      } catch (error) {
        setGetData((prev) => ({ ...prev, isLoading: false }));
        setGetData((prev) => ({ ...prev, serverError: error }));
      }
    })();
  }, [dispatch]);
  return [getData, setGetData];
};

export const MoveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.moveNextAction());
  } catch (error) {
    console.log(error);
  }
};

export const MovePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.movePrevAction());
  } catch (error) {
    console.log(error);
  }
};
