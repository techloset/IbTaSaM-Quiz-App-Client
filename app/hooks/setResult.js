import { postServerData } from "../helper/helper";
import * as Action from "../redux/result_reducer";

export const PushAnswer = (result) => async (dispatch) => {
  try {
    await dispatch(Action.pushResultAction(result));
  } catch (error) {
    console.log(error);
  }
};

export const updateResult = (index) => async (dispatch) => {
  try {
    dispatch(Action.updateResultAction(index));
  } catch (error) {
    console.log(error);
  }
};

// Insert user data
export const usePublishResult = (resultData) => {
  (async () => {
    try {
      await postServerData(
        "https://ibtasam-quiz-app-server.vercel.app/api/result",
        resultData,
        (data) => data
      );
    } catch (error) {
      console.log(error);
    }
  })();
};
