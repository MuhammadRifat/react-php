import requests from "./HttpService";

class ImageUploaderService {

    uploadImage(imageData) {
        return requests.post('/imageUploader.php', imageData);
    }

}

export default new ImageUploaderService();