import adminController from "../controller/admin.controller";
import categoriesController from "../controller/categories.controller";

export const login = async (email: string, password: string) => {
    const body = { "email": email, "password": password}
    const res = await adminController.adminLogin(body);

    return res.body.token;
}


export const getCategoryId = async (token: string) => {
    const body = {
        "name": "Test Category " + Math.floor(Math.random() * 100000)
    }
    const res = await categoriesController.createCategory(token, body);

    return res.body._id;
}