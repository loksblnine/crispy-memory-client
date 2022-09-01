import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {updateFeedback} from "../../../store/actions/feedbackActions";
import {useAppDispatch} from "../../../hooks";

const EditFeedback = ({feedback}: any) => {
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    dispatch(updateFeedback({email, mark, text}, feedback.id));
    handleClose()
  };

  const [email, setEmail] = useState(feedback.email);
  const [mark, setMark] = useState(Number(feedback.mark));
  const [text, setText] = useState(feedback.text);

  return (
    <React.Fragment>
      <Button variant="warning" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form">
            <div className="form-group">
              <label className="text m-2" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="text m-2" htmlFor="password">Mark</label>
              <input
                id="password"
                name="mark"
                className="form-control"
                type="number"
                min={1} max={5}
                value={mark}
                onChange={(e) => setMark(Number(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label className="text m-2" htmlFor="password">Message</label>
              <textarea
                id="password"
                name="text"
                className="form-control"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default EditFeedback;