import { faCompress, faTimes } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/common/Icon';
import { removeFromCart } from '../../redux/actions/cartAction';

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    }
    // count total amount in cart
    let totalAmount = 0;
    cart?.forEach(product => {
        totalAmount += Number(product.price * product.quantity);
    });
    let index = 1;

    return (
        <Container fluid className="mt-3">
            <div className="mb-3 text-center">
                <button onClick={() => navigate('/checkout')} className="btn btn-primary fs-4 py-3"><Icon icon={faCompress} /> Place Order | ৳ <span className="text-warning">{totalAmount}</span></button>
            </div>
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Qty</th>
                        <th>price</th>
                        <th className="text-end">Remove</th>
                    </tr>
                </thead>
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
                                    {product?.product_name}
                                </td>
                                <td>
                                    {product?.quantity}
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
        </Container>
    );
};

export default Cart;