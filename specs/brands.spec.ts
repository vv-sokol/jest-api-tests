import controller from "../controller/brand.controller";

describe('Brands', () => {
    describe('Fetch brands', () => {
        it('GET /brands ', async () => {
            const res = await controller.getBrands();

            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBeGreaterThan(1);

            res.body.forEach((el) => {
                expect(Object.keys(el)).toEqual(['_id', 'name'])
            });
        });
        })

    describe('Fetch Individual brand', () => {
        let postBrand;
        const data = {
            "name": "Test Brand" + Math.floor(Math.random() * 100000),
            "description": "Test Brand Description"
        }

        beforeAll(async () => {
            postBrand = await controller.createBrand(data);
        })

        afterAll( async () => {
            await controller.deleteBrand(postBrand.body._id)
        })

        it('GET /brand/:_id', async () => {
            const res = await controller.getBrandById(postBrand.body._id)

            expect(res.statusCode).toBe(200)
            expect(res.body.name).toEqual(postBrand.body.name)
        });

        it('Business logic - GET /brand/:invalid_id should throw 404', async () => {
            const res = await controller.getBrandById('003b117fbf61a969820eb708')

            expect(res.statusCode).toBe(404)
            expect(res.body.error).toEqual('Brand not found.')
        });
    })

    describe('Create brands', () => {
        let postBrand;
        const data = {
            "name": "Test Brand " + Math.floor(Math.random() * 100000),
            "description": "Test Brand Description"
        }

        beforeAll(async () => {
            postBrand = await controller.createBrand(data);
        })

        afterAll( async () => {
            await controller.deleteBrand(postBrand.body._id);
        })

        it('POST /brands', async () => {
            expect(postBrand.statusCode).toBe(200);
            expect(postBrand.body.name).toEqual(data.name);
            expect(postBrand.body.description).toEqual(data.description);
            expect(postBrand.body).toHaveProperty('createdAt');
        });

        it('Schema verification - Name is mandatory', async () => {
            const data = {
                "name": "",
                "description": "Test Brand Description"
            }
            const res = await controller.createBrand(data);

            expect(res.statusCode).toBe(422);
            expect(res.body.error).toEqual("Name is required");
        });

        it('Schema verification - Min char length for name > 1', async () => {
            const data = {
                "name": "A",
                "description": "Test Brand Description"
            }
            const res = await controller.createBrand(data);

            expect(res.statusCode).toBe(422);
            expect(res.body.error).toEqual("Brand name is too short");
        });

        it('Business logic - Duplicate brand entities not allowed', async () => {
            const res = await controller.createBrand(data);

            expect(res.statusCode).toEqual(422);
            expect(res.body.error).toContain('already exists');
        });
    })

    describe('Update brands', () => {
        let postBrand;
        const data = {
            "name": "Test Brand" + Math.floor(Math.random() * 100000),
            "description": "Test Brand Description"
        }

        beforeAll(async () => {
            postBrand = await controller.createBrand(data);
        })

        afterAll( async () => {
            await controller.deleteBrand(postBrand.body._id)
        })

        it('PUT /brands:id', async () => {
            const data = {
                "name": postBrand.body.name + ' updated'
            }
            const res = await controller.updateBrand(postBrand.body._id, data);

            expect(res.statusCode).toBe(200)
            expect(res.body.name).toEqual(data.name)
        });

        it('Schema verification - Brand name char > 30 not allowed', async () => {
            const data = {
                "name": 'Test Brand 80797111111111111122'
            }
            const res = await controller.updateBrand(postBrand.body._id, data);

            expect(res.statusCode).toBe(422)
            expect(res.body.error).toEqual('Brand name is too long')
        });

        it('Schema verification - Brand description must be a string', async () => {
            const data = {
                "name": postBrand.body.name + ' updated',
                "description": 123123123
            }
            const res = await controller.updateBrand(postBrand.body._id, data);

            expect(res.statusCode).toBe(422)
            expect(res.body.error).toEqual('Brand description must be a string')
        });

        it('Business logic - Throw error when updating invalid brand', async () => {
            const data = {
                "name": 'new brand updated',
                "description": 'test description'
            }
            const res = await controller.updateBrand('00000c3b986188d4dce4c36f', data);

            expect(res.statusCode).toBe(404)
            expect(res.body.error).toEqual('Brand not found.')
        });
    })

    describe('Delete brands', () => {
        let postBrand;
        const data = {
            "name": "Test Brand" + Math.floor(Math.random() * 100000),
            "description": "Test Brand Description"
        }

        beforeAll(async () => {
            postBrand = await controller.createBrand(data);
        })

        it('DELETE /brands/:id', async () => {
            const res = await controller.deleteBrand(postBrand.body._id)

            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(null);
        });

        it('Business logic - Throw error when deleting invalid brand', async () => {
            const res = await controller.deleteBrand('00000c3b986188d4dce4c36f')

            expect(res.statusCode).toBe(404);
            expect(res.body.error).toEqual('Brand not found.');
        });
    })
})