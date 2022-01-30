import requests from "./HttpService";

class NewsService{
    getNews(){
        return requests.get('/products.php')
    }

    getProductById(id) {
        return requests.get(`/products.php?productId=${id}`);
    }
}

export default new NewsService();