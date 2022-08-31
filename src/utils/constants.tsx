import React from "react";
import FeedbackPage from "../components/content/guest/FeedbackPage";
import LoginPage from "../components/content/guest/LoginPage";
import AdminPage from "../components/content/auth/AdminPage";

export const ACTIONS = {
  CALLS: {
    SET_CALLS: "CALLS.SET_POSTS",
    SET_PAGE: "CALLS.SET_PAGE",
    SET_READY_CALLS: "CALLS.SET_READY_POSTS",
    SET_FILTERED_ARRAY: "CALLS.SET_FILTERED_ARRAY",
    DELETE_CALL: "CALLS.DELETE_POST",
    UPDATE_CALL: "CALLS.UPDATE_POST",
    ADD_CALL: "CALLS.ADD_POST",
    CLEAR_FILTERED: "CALLS.CLEAR_FILTERED",
    SORT: "CALLS.SORT"
  },
};

export const guestRoutes = [
  {
    path: '/feedback-form',
    Component: <FeedbackPage/>
  },
  {
    path: '/login',
    Component: <LoginPage/>
  },
];

export const authRoutes = [
  {
    path: '/admin',
    Component: <AdminPage/>
  },
];
