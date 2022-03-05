import React, { useCallback, useRef, useState } from 'react';
import { Table } from 'react-bootstrap';
import ListSkeleton from '../../../components/skeletons/ListSkeleton';
import useFetch from '../../../hooks/useFetch';
import ProductService from '../../../services/ProductService';
import ProductRow from './ProductRow';

const AdminProducts = () => {
    const [error, setError] = useState("");
    const [value, setValue] = useState(1);

    // load all products
    const getAllProducts = useCallback(() => {
        return ProductService.getProducts();
    }, [value])

    const { data, isLoading } = useFetch(getAllProducts);

    // for deleting product
    const handleEditProduct = (id) => {
        console.log(id);

    }

    // for editing product
    const handleDeleteProduct = (id) => {
        ProductService.deleteProduct(id)
            .then(response => {
                if (response.status) {
                    setValue(value + 1);
                } else {
                    setError(response.error);
                }
            })
    }

    // loading skeleton
    if (isLoading) {
        return <ListSkeleton />
    }
    return (
        <>
            <p className="text-center text-danger">{error}</p>
            <Table striped bordered responsive size="sm" className="align-middle">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Photo</th>
                        <th>Weight</th>
                        <th>Price</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map(product => <ProductRow product={product} handleEditProduct={handleEditProduct} handleDeleteProduct={handleDeleteProduct} key={product.id} />)
                    }
                </tbody>
            </Table>
        </>
    );
};

export default AdminProducts;