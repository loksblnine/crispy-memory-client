import React, {useState} from 'react';
import {useFormik} from 'formik';
import {toast} from "react-toastify";
import {useAppDispatch} from "../../../hooks";
import {useNavigate} from "react-router-dom";
import {addFeedback} from "../../../store/actions/feedbackActions";

const validate = (values: { email: string; }) => {
  const errors: { email?: string } = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const FeedbackPage = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      mark: 5,
      text: ''
    },
    validate,
    onSubmit: async () => {
      try {
        dispatch(addFeedback({email: formik.values.email, mark: formik.values.mark, text: formik.values.text}));
        formik.resetForm()
      } catch (e) {
        toast("Check ur login or password");
      }
    }
  });
  const loginPageStyle = {
    margin: "32px auto 37px",
    maxWidth: "50%",
    background: "#fff",
    padding: "50px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)",
  };

  return (
    <div style={loginPageStyle}>
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="form-group">
          <label className="text m-2" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : null}
        </div>
        <div className="form-group">
          <label className="text m-2" htmlFor="password">Mark</label>
          <input
            id="password"
            name="mark"
            className="form-control"
            type="number"
            min={1} max={5}
            value={formik.values.mark}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label className="text m-2" htmlFor="password">Message</label>
          <textarea
            id="password"
            name="text"
            className="form-control"
            value={formik.values.text}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group form-group-inline mt-3">
          <button type="submit" className="btn btn-primary">
            Send!
          </button>
        </div>
      </form>
    </div>
  );
};
export default FeedbackPage;