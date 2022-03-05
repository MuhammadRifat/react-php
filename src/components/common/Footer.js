import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom';

// Homepage Footer
const Footer = () => {
    return (
        <Container fluid className="mt-4 bg-light">
            <Row className="pt-2 px-0">
                <Col md={3}>
                    <div className="p-2">
                        <h6>Contact Information</h6><hr />
                        <p>
                            We would be more than happy to help you. Our team advisor are 24/7 at your service to help you.<br /><br />
                            <FontAwesomeIcon icon={faEnvelope} /> hrifat450@gmail.com<br />
                            <FontAwesomeIcon icon={faPhoneAlt} /> Phone: 01772722727<br />
                            <FontAwesomeIcon icon={faMapMarkerAlt} /> Mymensingh, Bangladesh<br />
                        </p>
                    </div>
                </Col>
                <Col md={3}>
                    <div className="p-2">
                        <h6>About Us</h6><hr />
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati ducimus quia.<br />
                            <div className="d-flex mt-3">
                                <Link to="#"><FontAwesomeIcon icon={faTwitter} size="2x" className="ms-3" /></Link>
                                <Link to="#"><FontAwesomeIcon icon={faFacebook} size="2x" className="ms-3" /></Link>
                                <Link to="#"><FontAwesomeIcon icon={faYoutube} size="2x" className="ms-3" /></Link>
                            </div>
                        </p>
                    </div>
                </Col>
                <Col md={3}>
                    <div className="p-2">
                        <h6>Useful Links</h6><hr />
                        <Link to="/about">About </Link><br />
                        <Link to="#">Special Offers</Link><br />
                        <Link to="#">Social</Link><br />
                        <Link to="#">Site Map</Link><br />
                        <Link to="#">Help Topics</Link><br />
                    </div>
                </Col>
                <Col md={3}>
                    <div className="p-2">
                        <h6>Mailing List</h6><hr />
                        <p>Enter your email address for our mailing list to keep yourself updated.</p>
                        <div className="d-flex">
                            <input type="email" name="email" className="form-control" placeholder="Enter your email" />
                            <button className="btn btn-primary" type="submit">DONE</button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="pt-2 text-center">
                <Col md={12} className="py-2">
                    <small>Copyright {new Date().getFullYear()}, Muhammad Rifat. All rights reserved.</small>
                </Col>
            </Row>
        </Container>
    );
};

export default Footer;