import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 15000,
});

// Add a request interceptor 
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return {
        ...config,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    };
});

const responseBody = (response) => response.data;

// const get = (url) => instance.get(url).then(responseBody)

// const post = (url, body) => instance.post(url, body).then(responseBody)

// const patch = (url, body) => instance.patch(url, body).then(responseBody)

// const _delete = (url) => instance.delete(url).then(responseBody)


const requests = {
    get: (url) => instance.get(url).then(responseBody),
    post: (url, body) => instance.post(url, body).then(responseBody),
    patch: (url, body) => instance.patch(url, body).then(responseBody),
    _delete: (url) => instance.delete(url).then(responseBody)
}

export default requests;