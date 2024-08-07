import * as supertest from "supertest";
const request = supertest('https://jsonplaceholder.typicode.com');

describe('POC test', () => {
        describe('GET requests',  () => {
            it('GET / posts', async () => {
                const res = await request.get('/posts');
                expect(res.statusCode).toBe(200);
                expect(res.body[0].id).toBe(1);
            })

            it('GET / comments with query params',  async () => {
                // const res = await request.get('/comments?postId=1');
                const res = await request
                    .get('/comments')
                    .query({postId : 1})
                expect(res.body[0].id).toBe(1);
            });

        describe('POST requests', () => {
            it('POST / posts ', async () => {
                const data = {
                    "title": "My favorite books",
                    "body": "JS, TS",
                    "userId": 1
                }

                const res = await request
                    .post('/posts')
                    .send(data)

                expect(res.body.title).toBe(data.title);
            });
        })

        describe('PUT requests',  () => {
                it('PUT / posts ', async () => {
                    const data = {
                        "userId": 1,
                        "id": 1,
                        "title": "update",
                        "body": "update"
                    }

                    const res = await request
                        .put('/posts/1')
                        .send(data)
                    expect(res.body.title).toBe(data.title);
                });
            })

        describe('PATCH requests',  () => {
                it('PATCH / posts ', async () => {
                    const data = {
                        "title": "Updated title"
                    }

                    const getRes = await request.get('/posts/1');
                    const beforeTitle = getRes.body.title;

                    const res = await request
                        .patch('/posts/1')
                        .send(data)
                    expect(res.body.title).toBe(data.title);
                    expect(res.body.title).not.toBe(beforeTitle);
                });
            })

        describe('DELETE requests',  () => {
                it('DELETE / posts/:id', async () => {

                    const res = await request
                        .delete('/posts/1')
                    expect(res.body).toEqual({});
                });
            })
    });

})