import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";

import NotFound from "../http/components/404";

import {authRoutes, guestRoutes} from "../utils/constants";
import {useAppDispatch, useAppSelector} from "../hooks";
import {checkAuth} from "../store/actions/userActions";

const AppRouter = () => {

  const dispatch = useAppDispatch();
  // @ts-ignore
  const role = useAppSelector((state) => state.user.user.role);
  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <Routes>
      {guestRoutes.map(({path, Component}) =>
        <Route path={path} element={Component} key={path}/>
      )}
      {role === 1 && authRoutes.map(({path, Component}) =>
        <Route path={path} element={Component} key={path}/>
      )}
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
};

export default AppRouter;
