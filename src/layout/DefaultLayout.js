import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import RightCart from '../components/common/RightCart';
import SideNav from '../components/common/SideNav';

const DefaultLayout = ({ children }) => {
    const location = useLocation();
    return (
        <>
            {
                location.pathname.includes('/dashboard') ?
                    <>
                        {children}
                    </>
                    :
                    <>
                        <Header />
                        <Container fluid>
                            <Row>
                                <Col md={2} className="ps-1">
                                    <SideNav />
                                </Col>
                                <Col md={10} className="p-0">
                                    <Col lg={11} style={{minHeight: "80vh"}}>
                                        {children}
                                    </Col>

                                    <div className="sideCart">
                                        <RightCart name="5 Items" />
                                    </div>

                                    <Footer />
                                </Col>
                            </Row>
                        </Container>
                    </>
            }
        </>
    );
};

export default DefaultLayout;