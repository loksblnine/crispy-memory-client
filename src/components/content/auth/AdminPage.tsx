import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {deleteFeedback, setFeedbacks, setReadyFeedbacks} from "../../../store/actions/feedbackActions";
import {Spinner} from "react-bootstrap";

import EditFeedback from "./EditFeedback";
import AddFeedback from "./AddFeedback";

const AdminPage = () => {
  const dispatch = useAppDispatch();
  const feedbacks = useAppSelector((state) => state.feedbacks.filteredItems);
  const feedbacksPage = useAppSelector((state) => state.feedbacks.page);
  const loadNext = useAppSelector((state) => state.feedbacks.loadNext);
  const areFeedbacksReady = useAppSelector((state) => state.feedbacks.isReady);

  useEffect(() => {
    if (feedbacks.length <= 0) {
      dispatch(setFeedbacks(feedbacksPage, ""));
    }
  }, []);

  const handleNextPosts = useCallback(() => {
    dispatch(setReadyFeedbacks(false));
    dispatch(setFeedbacks(feedbacksPage, ""));
  }, [feedbacksPage]);

  if (!areFeedbacksReady) {
    return (
      <div className="container">
        <Spinner animation="border"/>
      </div>
    );
  }
  return (
    <div className="container">
      {feedbacks.length !== 0 ? (
        <table className="table mt-5 text-justify">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User email</th>
            <th scope="col">Mark</th>
            <th scope="col">Text</th>
            <th scope="col">Date & Time</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
          </thead>
          <tbody>
          {feedbacks?.map((item: any) => (
            <tr key={item._id}>
              <th scope="row"> {item.id}</th>
              <td>{item.user?.email}</td>
              <td>{item.mark}</td>
              <td>{item.text}</td>
              <td>{item.time}</td>
              <td><EditFeedback feedback={item}/></td>
              <td>
                <button className="btn btn-danger"
                        onClick={() => dispatch(deleteFeedback(item.id))}>Delete
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>) : (
        <div>
          The calls list is empty.
        </div>
      )}
      {
        loadNext &&
        <div className="col text-center">
          <button className="btn btn-primary" onClick={() => handleNextPosts()} disabled={!areFeedbacksReady}> More...
          </button>
        </div>
      }
      <AddFeedback/>
    </div>
  );
};

export default AdminPage;