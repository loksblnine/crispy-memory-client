import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Container, Nav, Navbar} from "react-bootstrap";

import './header.css';
import {useAppSelector} from "../../hooks";

const Header = () => {
  const navigate = useNavigate();
  // @ts-ignore
  const user = useAppSelector((state) => state.user.user);
  return (
    <Navbar>
      <Container>
        <Nav>
          <Button onClick={() => navigate('/feedback')}
                  className="m-1 btn btn-xl"
          >
            Leave feedback
          </Button>
          {
            user.role === 1 ?
              <Button onClick={() => navigate('/admin')}
                      className="m-1 btn btn-xl"
              >
                Admin panel
              </Button> :
              <Button onClick={() => navigate('/login')}
                      className="m-1 btn btn-xl"
              >
                Login
              </Button>
          }
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;