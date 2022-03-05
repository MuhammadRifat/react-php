import React, { useCallback, useContext, useState } from 'react';
import { userContext } from '../../App';
import ListSkeleton from '../../components/skeletons/ListSkeleton';
import useFetch from '../../hooks/useFetch';
import OrderService from '../../services/OrderService';
import OrdersData from '../../components/common/OrdersData/OrdersData';
import { Button } from 'react-bootstrap';

const Orders = () => {
    const [dataContainer] = useContext(userContext);
    const [limit, setLimit] = useState(10);


    const getUserOrders = useCallback(() => {
        if (dataContainer.role === 'user') {
            return OrderService.getOrdersByUserId(dataContainer.role, dataContainer.id, limit);
        } else if (dataContainer.role === 'admin') {
            return OrderService.getOrders(dataContainer.role, limit);
        }
    }, []);


    const { data, isLoading } = useFetch(getUserOrders);

    if (isLoading) {
        return (
            <ListSkeleton />
        );
    }

    console.log(data);

    return (
        <>
            <h3>Orders</h3>
            {
                dataContainer.role === 'user' && data?.map(orders => <OrdersData key={orders.id} orders={orders} role="user" />)
            }
            {
                dataContainer.role === 'admin' && data?.map(orders => <OrdersData key={orders.id} orders={orders} role="admin" />)
            }
        </>
    );
};

export default Orders;