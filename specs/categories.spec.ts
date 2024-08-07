import controller from "../controller/categories.controller";
import config from '../config/base.config';
import { login, getCategoryId } from '../utils/helper';
import categoriesController from "../controller/categories.controller";

describe('Categories', () => {
    describe('Categories brands', () => {
        it('GET /categories ', async () => {
            const res = await controller.getCategories()
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBeGreaterThan(1);
            res.body.forEach((el) => {
                expect(Object.keys(el)).toEqual(['_id', 'name']);
            })
        });
    })

    describe('Create categories', () => {
        let token;

        beforeAll( async () => {
            token = await login(config.adminCredentials.email, config.adminCredentials.password);
        })

        it('POST /categories', async () => {
            const body = {
                "name": "Test Category " + Math.floor(Math.random() * 100000)
            }
            const res = await controller.createCategory(token, body);

            expect(res.statusCode).toBe(200);
            expect(res.body.name).toEqual(body.name);
        });

    })

    describe('Update categories', () => {
        let token;
        let postCategory;
        let categoryId;

        beforeAll( async () => {
            token = await login(config.adminCredentials.email, config.adminCredentials.password);
            categoryId = await getCategoryId(token);
        })

        it('PUT /categories/:id', async () => {
            const body = {
                "name": 'Test category Updated' + Math.floor(Math.random() * 100000)
            }
            const res = await controller.updateCategory(token, categoryId, body);

            expect(res.statusCode).toBe(200);
            expect(res.body.name).toEqual(body.name);
        });

        it('Business logic - Throw error when updating invalid category', async () => {
            const data = {
                "name": 'new brand updated'
            }
            const res = await controller.updateCategory(token, '132', data);

            expect(res.statusCode).toBe(422);
            expect(res.body.error).toEqual('Unable to update categories');
        });

        it('Schema verification - Category name must be a string', async () => {
            const data = {
                "name": 123123
            }
            const res = await controller.updateCategory(token, '132', data);

            expect(res.statusCode).toBe(422);
            expect(res.body.error).toEqual('Brand name must be a string');
        });

        it('Schema verification - Name is mandatory', async () => {
            const data = {
                "name": ''
            }
            const res = await controller.updateCategory(token, categoryId, data);

            expect(res.statusCode).toBe(422);
            expect(res.body.error).toEqual('Name is required');
        });
    })

    describe('Delete categories', () => {
        let token;

        beforeAll( async () => {
            token = await login(config.adminCredentials.email, config.adminCredentials.password);
        })

        it('Delete /categories/:id', async () => {
            const categoryId = await getCategoryId(token);

            const res = await controller.deleteCategory(token, categoryId);

            expect(res.statusCode).toBe(200);
            expect(res.body._id).toEqual(categoryId);
        });

        it('Business logic - Throw error when deleting invalid category', async () => {
            const res = await controller.deleteCategory(token, '123');

            expect(res.statusCode).toBe(422);
            expect(res.body.error).toEqual('Unable to delete categories');
        });
    })
})