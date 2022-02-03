import requests from "./HttpService";

class NewsService{
    getNews(){
        return requests.get('/products.php')
    }

    getNewsById(id) {
        return requests.get(`/products.php?productId=${id}`);
    }

    deleteNewsById(id) {
        return requests._delete(`/products.php?productId=${id}`);
    }
}

export default new NewsService();