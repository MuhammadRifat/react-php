import React, { useCallback, useContext, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { userContext } from '../../App';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';
import useFetch from '../../hooks/useFetch';

const Checkout = () => {
    const cart = useSelector((state) => state.cart);

    let deliveryCharge = 30;
    // count total amount in cart
    let totalAmount = 0;
    cart?.forEach(product => {
        totalAmount += Number(product.price * product.quantity);
    });

    const [dataContainer, setDataContainer] = useContext(userContext);
    const [userData, setUserData] = useState({});

    const payloadData = jwt_decode(dataContainer.token);
    const navigate = useNavigate();

    const tokenExp = Math.floor(new Date().getTime() / 1000);

    if (payloadData.exp < tokenExp) {
        navigate('/login');
    }

    const getUserData = useCallback(() => {
        setDataContainer({ ...dataContainer, id: payloadData.id, role: payloadData.role });
        return UserService.getUserById({ id: payloadData.id, role: payloadData.role });
    }, []);

    const { data } = useFetch(getUserData);

    // For capturing user data
    const handleBlur = (e) => {
        const newData = { ...userData };
        newData[e.target.name] = e.target.value;
        setUserData(newData);
    }

    // Conditionally showing Pay process
    // const handleSubmit = (e) => {
    //     // setShipmentData(userData);
    //     window.location.href = `http://localhost/Campus-Mart-Server/api/payment.php?total=${totalAmount + deliveryCharge}`;

    //     e.preventDefault();
    // };

    const productId = cart.map(data => data.id);
    const quantity = cart.map(data => data.quantity);
    return (
        <Container fluid>
            <Table responsive="md" className="mt-3 border bg-white fw-bold">
                <tbody>
                    <tr>
                        <td>Total Price</td>
                        <td>{totalAmount} ৳</td>
                    </tr>
                    <tr>
                        <td>Delivery Charge</td>
                        <td>{deliveryCharge} ৳</td>
                    </tr>
                    <tr>
                        <td>Total Amount</td>
                        <td>{totalAmount + deliveryCharge} ৳</td>
                    </tr>
                </tbody>
            </Table>

            <form className="bg-white p-3 rounded" action={process.env.REACT_APP_API_BASE_URL + "/payment.php"} method="post">
                <input name="userId" type="hidden" value={dataContainer.id} />
                <input name="token" type="hidden" value={dataContainer.token} />
                <input name="totalPrice" type="hidden" value={totalAmount} />
                <input name="deliveryCharge" type="hidden" value={deliveryCharge} />
                <input name="totalAmount" type="hidden" value={totalAmount + deliveryCharge} />
                <input name="productId" type="hidden" value={productId.toString()} />
                <input name="quantity" type="hidden" value={quantity.toString()} />
                <Row>
                    <Col md={6}>
                        <b>Your Name</b><br />
                        <input name="name" onBlur={handleBlur} type="text" className="form-control" value={data?.name} placeholder="Enter Your Name" required />
                    </Col>
                    <Col md={6}>
                        <b>Your Phone Number</b><br />
                        <input name="mobile" onBlur={handleBlur} type="text" className="form-control" value={data?.phone} placeholder="Enter Mobile Number" required />
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col md={6}>
                        <b>Address</b><br />
                        <input name="address" onBlur={handleBlur} type="text" className="form-control" value={data?.address} placeholder="Enter Address" required />
                    </Col>
                    <Col md={6}>
                        <b>Instructions (If Any)</b><br />
                        <input name="instructions" onBlur={handleBlur} type="text" className="form-control" placeholder="Write Instructions" />
                    </Col>
                </Row><hr />
                <div className="text-center"><button className="btn btn-success" type="submit">Proceed to Pay</button></div>
            </form>

            <Row className="justify-content-md-center">
                {/* <Col md={6} style={{ display: shipmentData ? 'block' : 'none' }} className="bg-white p-3">
                    <PayProcess handlePayment={handlePaymentSuccess}></PayProcess>
                </Col> */}
            </Row>
        </Container>
    );
};

export default Checkout;