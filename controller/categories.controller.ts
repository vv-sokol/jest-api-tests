import * as supertest from 'supertest';
import config from '../config/base.config'

const request = supertest(config.baseUrl);

class CategoriesController {
    getCategories() {
        return request
            .get('/categories');
    }

    getCategoryById(id) {
        return request
            .get(`/categories${id}`);
    }

    createCategory(token, data) {
        return request
            .post('/categories')
            .send(data)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
    }

    updateCategory(token: string, id: string, data: {[key: string]: string | number}) {
        return request
            .put(`/categories/${id}`)
            .send(data)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
    }

    deleteCategory(token, id) {
        return request
            .delete(`/categories/${id}`)
            .set('Authorization', `Bearer ${token}`)
    }
}

export default new CategoriesController();