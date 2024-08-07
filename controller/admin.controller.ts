import * as supertest from 'supertest';
import config from '../config/base.config'

const request = supertest(config.baseUrl);

class AdminController {
    adminLogin(data: {[key: string]: string}) {
        return request
            .post('/admin/login')
            .send(data)
            .set('Content-Type', 'application/json')
    }
}

export default new AdminController();