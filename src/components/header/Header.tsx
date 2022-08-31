import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Container, Nav, Navbar} from "react-bootstrap";

import './header.css';

const Header = () => {
  const navigate = useNavigate();
  return (
    <Navbar>
      <Container>
        <Nav>
          <Button onClick={() => navigate('/calls')}
                  className="m-1 btn btn-xl"
          >
            Main page
          </Button>
          <Button onClick={() => navigate('/stats')}
                  className="m-1 btn btn-xl"
          >
            Statistic
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;