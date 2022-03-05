import requests from "./HttpService";

class SettingsService {
    getSliders() {
        return requests.get('/settings.php?query=sliders');
    }

}

export default new SettingsService();