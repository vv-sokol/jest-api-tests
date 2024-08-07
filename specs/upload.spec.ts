import controller from "../controller/upload.controller";

describe('Upload Files', () => {
    describe('Upload files', () => {
        it('POST /upload/single ', async () => {
            const res = await controller.uploadSingle('data/1.png');

            expect(res.statusCode).toEqual(200);
            expect(res.body.filename).toEqual('1.png');
            expect(Object.keys(res.body).toString()).toBe('mimetype,filename,size,_id,__v');
        });

        it('POST /upload/multiple ', async () => {
            const files = [
                'data/1.png',
                'data/2.png'
            ];
            const res = await controller.uploadMultiple(files);

            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toEqual(2);
            expect(res.body[0].filename).toEqual('1.png');
            expect(res.body[1].filename).toEqual('2.png');
        });
    })
})