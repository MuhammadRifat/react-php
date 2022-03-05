import React, { useCallback } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Item from '../../components/common/Items/Item';
import ItemSkeleton from '../../components/skeletons/ItemSkeleton';
import useFetch from '../../hooks/useFetch';
import ProductService from '../../services/ProductService';

const Search = () => {
    const { productName } = useParams();

    // load the products by name
    const getProduct = useCallback(() => {
        return ProductService.getProductByName(productName)
    }, [productName])

    const { data, isLoading } = useFetch(getProduct);
    if (data === "") {
        return <h5 className="text-center text-danger mt-2">Not Found</h5>
    }

    return (
        <Container fluid className="my-3">
            <h5 className="text-center text-muted ">Search results for: {productName}</h5>
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

export default Search;