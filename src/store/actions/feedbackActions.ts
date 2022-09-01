import {ACTIONS} from "../../utils/constants";
import {apiDelete, apiGet, apiPost, apiPut} from "../../http/httpInterceptors";
import {toast} from "react-toastify";

type Feedback = {
  id?: number,
  email: string,
  mark: number,
  text: string,
  time?: Date,
}

export const setFeedbacks = (page: number, queryString: string) => {
  return async (dispatch: any) => {
    try {
      const {data}: any = await apiGet({
        url: `/feedbacks?page=${page}${queryString}`
      });

      if (queryString.length) {
        dispatch({
          type: ACTIONS.FEEDBACK.SET_FILTERED_ARRAY,
          payload: data
        });
      } else {
        dispatch({
          type: ACTIONS.FEEDBACK.SET_FEEDBACKS,
          payload: data
        });
      }
    } catch (e) {
      toast.error("Something went wrong");
    }
  };
};

export const setReadyFeedbacks = (isReady: boolean) => ({
  type: ACTIONS.FEEDBACK.SET_READY_FEEDBACKS,
  payload: isReady
});

export const updateFeedback = (feedback: Feedback, id: number) => {
  return async (dispatch: any) => {
    try {
      await apiPut({
        data: feedback,
        url: `/feedbacks/${id}`
      });
      dispatch({
        type: ACTIONS.FEEDBACK.UPDATE_FEEDBACK,
        payload: {...feedback, id, time: new Date().toISOString()}
      });
    } catch (e) {
      toast.error("Something went wrong");
    }
  };
};

export const addFeedback = (feedback: Feedback) => {
  return async (dispatch: any) => {
    try {
      const {data} = await apiPost({
        data: feedback,
        url: "/feedbacks"
      });
      dispatch({
        type: ACTIONS.FEEDBACK.ADD_FEEDBACK,
        payload: data
      });
      toast.success("Feedback posted!");
    } catch (e) {
      toast.error("Something went wrong");
    }
  };
};

export const deleteFeedback = (id: number) => {
  return async (dispatch: any) => {
    try {
      await apiDelete({
        url: `/feedbacks/${id}`
      });
      dispatch({
        type: ACTIONS.FEEDBACK.DELETE_FEEDBACK,
        payload: id
      });
    } catch (e) {
      toast.error("Something went wrong");
    }
  };
};
