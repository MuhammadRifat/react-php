import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { faClock, faMapMarkerAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import Icon from '../Icon';

const OrdersData = ({ orders, role }) => {
    const [event, setEvent] = useState("Pending");

    return (
        <Row className="bg-white mt-2 rounded shadow-sm">
            <Col sm={3} className="d-flex align-items-center">
                <h4 className="">{orders?.cust_name}</h4>
            </Col>
            <Col sm={3}>
                <h4 className="text-success">৳ {orders?.total_amount}</h4>
                <h6>{orders?.payment_medium}</h6>
            </Col>
            <Col sm={4}>
                <small><Icon icon={faClock} /> Ordered: {new Date(orders?.date).toDateString('dd/mm/yy')}</small><br />
                <small><Icon icon={faMapMarkerAlt} /> {orders?.cust_address}</small><br />
                <small><Icon icon={faPhoneAlt} /> {orders?.cust_phone}</small><br />
            </Col>
            {
                role === 'user' &&
                <Col sm={2} className="bg-danger text-white rounded-end d-flex align-items-center justify-content-center">
                    <h4>{orders?.status}</h4>
                </Col>
            }
            {
                role === 'admin' &&
                <Col sm={2} className={`${event === 'Pending' ? "bg-danger" : event === 'On going' ? "bg-warning" : "bg-success"} text-white rounded-end d-flex align-items-center justify-content-center`}>
                    <select className="form-control" onChange={(e) => setEvent(e.target.value)} id="orders">
                        <option value="Pending">Pending</option>
                        <option value="On going">On going</option>
                        <option value="Done">Done</option>
                    </select>
                </Col>
            }
        </Row >
    );
};

export default OrdersData;