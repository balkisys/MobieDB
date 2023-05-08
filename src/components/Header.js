import React from "react";
import { Container, Navbar } from "react-bootstrap";
export const Header = () => {
  return (
    <div >
      <Navbar bg="dark" expand="lg" >
        <Container>
          <Navbar.Brand>
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};
