import requests from "./HttpService";

class ProductService {
    getProducts() {
        return requests.get('/products.php')
    }

    getProductById(id) {
        return requests.get(`/products.php?productId=${id}`);
    }

    getProductByName(name) {
        return requests.get(`/products.php?productName=${name}`);
    }

    getProductByCategory(categoryId) {
        return requests.get(`/products.php?categoryId=${categoryId}`);
    }

    addProduct(product) {
        return requests.post('/products.php', product);
    }

    deleteProduct(id) {
        return requests._delete(`/products.php?productId=${id}`);
    }

}

export default new ProductService();