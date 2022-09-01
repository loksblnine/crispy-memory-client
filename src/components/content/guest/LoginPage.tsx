import React, {useState} from 'react';
import {useFormik} from 'formik';
import {toast} from "react-toastify";
import {useAppDispatch} from "../../../hooks";
import {login} from "../../../store/actions/userActions";
import {useNavigate} from "react-router-dom";

const validate = (values: { password: string | any[]; email: string; }) => {
  const errors: { password?: string, email?: string } = {};
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password too short';
  }
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [type, setType] = useState('password');
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async () => {
      try {
        dispatch(login(formik.values.email, formik.values.password, navigate));
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
          <label className="text m-2" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            className="form-control"
            type={type}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <span
            style={{cursor: "pointer"}}
            onClick={(e) => {
              e.preventDefault();
              if (type !== 'text') {
                setType('text');
              } else {
                setType('password');
              }
            }}>
                        {
                          type === 'password' ?
                            <img src="https://img.icons8.com/ios-filled/20/000000/closed-eye.png"/> :
                            <img src="https://img.icons8.com/ios-glyphs/20/000000/visible--v1.png"/>
                        }
            &nbsp;
            {
              type === 'password' ?
                "Reveal" :
                "Hide"
            }
                    </span>

          {formik.errors.password ? <div className="text-danger">{formik.errors.password}</div> : null}
        </div>
        <div className="form-group form-group-inline mt-3">
          <button type="submit" className="btn btn-primary">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;