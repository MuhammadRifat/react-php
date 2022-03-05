import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useCallback } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Icon from '../../components/common/Icon';
import ItemSkeleton from '../../components/skeletons/ItemSkeleton';
import useFetch from '../../hooks/useFetch';
import { addToCart } from '../../redux/actions/cartAction';
import ProductService from '../../services/ProductService';

const Product = () => {
    const { id } = useParams();

    // load product details my product id
    const getProductDetails = useCallback(() => {
        return ProductService.getProductById(`${id}`);
    }, [id]);

    const productDetails = useFetch(getProductDetails);
    const { data, isLoading } = productDetails;

    const dispatch = useDispatch();

    // display loading skeleton
    if (isLoading) {
        return (
            <ItemSkeleton />
        );
    }

    return (
        <Container fluid className="mt-4">
            <Row>
                <Col md={6}>
                    <img src={process.env.REACT_APP_IMAGE_BASE_URL + data?.imageURL} alt={data?.product_name} className="w-100" height="400" />
                </Col>
                <Col md={6}>
                    <h4>{data?.product_name}</h4>
                    <span>{data?.weight}</span>
                    <h3 className="text-secondary mt-2">&#2547; {data?.price}</h3>
                    <Row className="mt-3 d-flex justify-content-around">
                        <Col md={6} className="d-flex justify-content-center p-1">
                            <button className="btn btn-danger"><Icon icon={faMinus} /></button>
                            <input type="text" className="w-50 text-center fw-bold" disabled value="0" />
                            <button className="btn btn-success"><Icon icon={faPlus} /></button>
                        </Col>
                        <Col md={6} className="text-center p-1">
                            <button onClick={() => dispatch(addToCart(data))} className="addBtn btn-lg py-2"><Icon icon={faPlus} /> Add to Cart</button>
                        </Col>
                    </Row>
                    <hr />
                    <p className="text-secondary text-justify">
                        {data?.description}
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default Product;