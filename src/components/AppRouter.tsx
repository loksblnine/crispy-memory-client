import React from 'react';
import {Route, Routes} from "react-router-dom";

import NotFound from "../http/components/404";

import {authRoutes, guestRoutes} from "../utils/constants";

const AppRouter = () => {
  return (
    <Routes>
      {guestRoutes.map(({path, Component}) =>
        <Route path={path} element={Component} key={path}/>
      )}
      {/*add check is user authed*/}
      {authRoutes.map(({path, Component}) =>
        <Route path={path} element={Component} key={path}/>
      )}
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
};

export default AppRouter;
