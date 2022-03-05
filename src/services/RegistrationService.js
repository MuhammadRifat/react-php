import requests from "./HttpService";

class RegistrationService {

    userRegistration(userData) {
        return requests.post('/registration.php', userData);
    }

}

export default new RegistrationService();