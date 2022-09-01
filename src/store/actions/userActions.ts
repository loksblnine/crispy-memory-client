import {apiGet, apiPost} from "../../http/httpInterceptors";
import {ACTIONS} from "../../utils/constants";
import {toast} from "react-toastify";

export const login = (email: string, password: string, navigate: (path: string) => void) => {
  return async (dispatch: any) => {
    await apiPost({
      data: {email, password},
      url: "/auth/login"
    }).then(({data}) => {
      dispatch({
        type: ACTIONS.USER.SET_USER,
        payload: data
      });
    }).then(() => {
      navigate('/admin');
    }).catch((err) => {
      toast("Use correct credentials");
    });
  };
};

export const checkAuth = () => {
  return async (dispatch: any) => {
    await apiGet({
      url: "/auth/login"
    })
      .then(({data}) => {
        dispatch({
          type: ACTIONS.USER.SET_USER,
          payload: data
        });
      })
      .catch(() => {
        dispatch({
          type: ACTIONS.USER.LOG_OUT
        });
      });
  };
};
