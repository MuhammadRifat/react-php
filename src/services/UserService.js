import requests from "./HttpService";

class UserService {
    getUserById(userData) {
        return requests.post('/users.php', userData)
    }

    getOrdersByUserId(UserId) {
        return requests.get(`/users.php?action=orders&id=${UserId}`)
    }

}

export default new UserService();