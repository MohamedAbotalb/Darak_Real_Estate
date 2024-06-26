import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from 'components/Home/Header';
import Footer from 'components/Home/Footer';

function SharedLayout() {
  return (
    <>
      <Header />
      {/* <Container> */}
        <Row>
          <Col>
            <Outlet />
          </Col>
        </Row>
      {/* </Container> */}
      <Footer />
    </>
  );
}
export default SharedLayout;