import requests from "./HttpService";

class CategoryService {
    getCategories() {
        return requests.get('/categories.php')
    }
    getCategoryById(id){
        return requests.get(`/categories.php?id=${id}`);
    }

}

export default new CategoryService();