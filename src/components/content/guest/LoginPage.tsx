import React, {useState} from 'react';
import {useFormik} from 'formik';
import {toast} from "react-toastify";

const validate = (values: { password: string | any[]; email: string; }) => {
  const errors: { password?: string, email?: string } = {};
  if (!values.password) {
    errors.password = 'Пароль обязателен';
  } else if (values.password.length < 8) {
    errors.password = 'Короткий пароль';
  }
  if (!values.email) {
    errors.email = 'Адрес электронный почты обязателен';
  } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+/i.test(values.email)) {
    errors.email = 'Невалидный адрес электронной почты';
  }
  return errors;
};

const LoginPage = () => {
  const [type, setType] = useState('password');
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async () => {
      try {
      } catch (e) {
        toast("Проверьте логин или пароль");
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
          <label className="text" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
        </div>
        <div className="form-group">
          <label className="text" htmlFor="password">Пароль</label>
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
                "Посмотреть пароль" :
                "Скрыть пароль"
            }
                    </span>

          {formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
        </div>
        <div className="form-group form-group-inline">
          <button type="submit" className="btn btn-primary">
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;