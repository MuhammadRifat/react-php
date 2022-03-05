import requests from "./HttpService";

class LoginService {
    adminLogin(loginData) {
        return requests.post('/login.php', loginData);
    }

    userLogin(loginData) {
        return requests.post('/login.php', loginData);
    }

}

export default new LoginService();