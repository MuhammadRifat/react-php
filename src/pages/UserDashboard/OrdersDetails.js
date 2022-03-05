import React, { useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import OrderService from '../../services/OrderService';
import userContext from '../../App';

const OrdersDetails = () => {
    const [dataContainer, setDataContainer] = useContext(userContext);
    const { ordersId } = useParams();

    //load orders name by orders id
    const getOrders = useCallback(() => {
        return OrderService.getOrdersById(dataContainer.role, ordersId);
    }, [ordersId]);


    const { data, isLoading } = useFetch(getOrders);
    console.log(data);

    return (
        <div>
            <h3>Order Description</h3>
        </div>
    );
};

export default OrdersDetails;