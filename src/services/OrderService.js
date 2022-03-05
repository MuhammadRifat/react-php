import requests from "./HttpService";

class OrderService {

    getOrders(role, limit) {
        return requests.get(`/orders.php?role=${role}&limit=${limit}`)
    }

    getOrdersByUserId(role, UserId, limit) {
        return requests.get(`/orders.php?role=${role}&id=${UserId}&limit=${limit}`)
    }

    getOrdersById(role, orderId) {
        return requests.get(`/orders.php?role=${role}&orderId=${orderId}`)
    }

}

export default new OrderService();