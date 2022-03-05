import { faCompress, faShoppingBag, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Offcanvas, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart } from '../../redux/actions/cartAction';
// import { AppState } from '../../redux/store';
import Icon from './Icon';

const RightCart = ({ name, ...props }) => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    }

    const handlePlaceOrder = () => {
        handleClose();
        navigate('/checkout');
    }
    // count total amount in cart
    let totalAmount = 0;
    cart?.forEach(product => {
        totalAmount += Number(product.price * product.quantity);
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let index = 1;
    return (
        <>
            <button className="addBtn" onClick={handleShow}>
                <Icon icon={faShoppingBag} size="lg" /><br />
                <b>{cart.length}</b> {cart.length > 1 ? "Items" : "Item"}<br />
                <b className="text-warning fs-5">৳ {totalAmount}</b>
            </button>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton className="bg-lightPrimary text-white">
                    <Offcanvas.Title>
                        Shoping Cart
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Table striped size="sm">
                        {/* <thead>
                            <tr>
                                <th>#</th>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Qty</th>
                                <th>price</th>
                                <th>Remove</th>
                            </tr>
                        </thead> */}
                        <tbody>
                            {
                                cart?.map(product =>
                                    <tr className="align-middle" key={product.id}>
                                        <td>
                                            {index++}
                                        </td>
                                        <td>
                                            <img src={process.env.REACT_APP_IMAGE_BASE_URL + product?.imageURL} alt={product?.product_name} width="40" height="40" />
                                        </td>
                                        <td>
                                            <small>{product?.product_name}</small>
                                        </td>
                                        <td>
                                            <small>{product?.quantity}</small>
                                        </td>
                                        <td>
                                            <span>৳ {product?.price * product?.quantity}</span>
                                        </td>
                                        <td className=" text-end">
                                            <button onClick={() => handleRemove(product.id)} className="bg-danger text-white rounded border"><Icon icon={faTimes} /></button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                    <button onClick={handlePlaceOrder} className="w-100 btn btn-primary fs-4 placeOrderBtn"><Icon icon={faCompress} /> Place Order | ৳ <span className="text-warning">{totalAmount}</span></button>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default RightCart;