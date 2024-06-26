import React from 'react';
import { Outlet } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Header from 'components/Home/Header';
import Footer from 'components/Home/Footer';

export default function UserLayout() {
  return (
    <>
      <Header />
      <Row>
        <Col>
          <Outlet />
        </Col>
      </Row>
      <Footer />
    </>
  );
}
export default SharedLayout;