import React, {useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {deleteFeedback, setFeedbacks, setReadyFeedbacks} from "../../../store/actions/feedbackActions";
import {Spinner} from "react-bootstrap";

import EditFeedback from "./EditFeedback";
import AddFeedback from "./AddFeedback";
import {COLLAPSE_ARROWS, EXPAND_ARROWS} from "../../../utils/svg";
import {ACTIONS} from "../../../utils/constants";

const AdminPage = () => {
  const dispatch = useAppDispatch();
  const [openFilter, setOpenFilter] = useState(false)
  const [searchText, setSearchText] = useState("");
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
      <div className="d-flex mt-5 justify-content-between">
        <button className="btn m-4" type="button" data-toggle="collapse"
                data-target="#Filter" onClick={(e) => {
          e.preventDefault();
          setOpenFilter(!openFilter);
        }}
                aria-controls="Filter">Filter &nbsp;
          {!openFilter ? EXPAND_ARROWS : COLLAPSE_ARROWS}
        </button>
      </div>
      {openFilter && <div id="Filter">
        <div className="form-group">
          <div className="form-group">
            <label>Use key word(s) to find the feedback</label>
            <input className="form-control" autoComplete="on"
                   type="text" value={searchText}
                   placeholder="Type to search..."
                   onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="form-group d-row">
            <button className="btn btn-outline-primary m-2"
                    onClick={() => {
                      dispatch(setFeedbacks(0, `&text=${searchText}`));
                    }}>Search
            </button>
            <button className="btn btn-outline-secondary m-2"
                    onClick={() => {
                      dispatch({type: ACTIONS.FEEDBACK.CLEAR_FILTERED});
                    }}>Clear
            </button>
          </div>
        </div>
      </div>}
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
          The feedbacks list is empty.
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