import React from 'react';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../../components/common/Icon';

const ProductRow = ({ product, handleEditProduct, handleDeleteProduct }) => {
    const { id, product_name, category_name, weight, imageURL, price, category } = product;


    return (
        <tr>
            <td>{id}</td>
            <td>{product_name}</td>
            <td>{category_name}</td>
            <td><img src={process.env.REACT_APP_IMAGE_BASE_URL + imageURL} alt={product_name} height="60" weight="60" className="rounded-circle" /></td>
            <td>{weight}</td>
            <td>{price}</td>
            <td className="text-center">
                <div className="d-flex justify-content-evenly">
                    <button onClick={() => handleEditProduct(id)} className="btn btn-primary btn-sm"><Icon icon={faEdit} /> Edit</button>
                    <button onClick={() => handleDeleteProduct(id)} className="btn btn-danger btn-sm"><Icon icon={faTrashAlt} /> Delete</button>
                </div>
            </td>
        </tr>
    );
};

export default ProductRow;