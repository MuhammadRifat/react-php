import React, { useCallback } from 'react';
import { Card, Container, Placeholder, Row, Spinner } from 'react-bootstrap';
import Item from '../../components/common/Items/Item';
import ItemSkeleton from '../../components/skeletons/ItemSkeleton';
import useFetch from '../../hooks/useFetch';
import ProductService from '../../services/ProductService';

const Popular = () => {
    //load all products
    const getPopularProducts = useCallback(() => {
        return ProductService.getProducts();
    }, [])

    const { data, isLoading, error } = useFetch(getPopularProducts);

    return (
        <Container fluid className="my-3">
            <h3 className="text-center">Popular Items</h3>
            <Row>
                {
                    isLoading && <ItemSkeleton />
                }
                {
                    !isLoading && data?.map((product) => <Item product={product} isLoading={isLoading} key={product.id} />)
                }
            </Row>
        </Container>
    );
};

export default Popular;