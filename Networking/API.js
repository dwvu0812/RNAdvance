import api from './AxiosConfig';

class APIService {
    getPosts() {
        return api.get('/posts');
    }
    getPostDetail(id) {
        return api.get(`/posts/${id}`);
    }
    getPostComments(id) {
        return api.get(`/posts/${id}/comments`);
    }
    getUsers() {
        return api.get('/users');
    }
    getUserAlbums(id) {
        return api.get(`/users/${id}/albums`);
    }
    getPhotos(id) {
        return api.get(`/albums/${id}/photos`);
    }
    getUserTodos(id) {
        return api.get(`/users/${id}/todos`);
    }
}

export default new APIService();