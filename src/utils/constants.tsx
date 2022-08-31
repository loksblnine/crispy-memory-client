import React from "react";
import FeedbackPage from "../components/content/guest/FeedbackPage";
import LoginPage from "../components/content/guest/LoginPage";
import AdminPage from "../components/content/auth/AdminPage";

export const ACTIONS = {
  FEEDBACK: {
    SET_FEEDBACKS: "FEEDBACK.SET_POSTS",
    SET_PAGE: "FEEDBACK.SET_PAGE",
    SET_READY_FEEDBACKS: "FEEDBACK.SET_READY_POSTS",
    SET_FILTERED_ARRAY: "FEEDBACK.SET_FILTERED_ARRAY",
    DELETE_FEEDBACK: "FEEDBACK.DELETE_POST",
    UPDATE_FEEDBACK: "FEEDBACK.UPDATE_POST",
    ADD_FEEDBACK: "FEEDBACK.ADD_POST",
    CLEAR_FILTERED: "FEEDBACK.CLEAR_FILTERED",
    SORT: "FEEDBACK.SORT"
  },
};

export const guestRoutes = [
  {
    path: '/feedback',
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
