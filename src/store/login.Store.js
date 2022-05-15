import { makeAutoObservable } from "mobx";
import { instance } from "../utils/index";
class LoginStore {
    token = ''
    constructor() {
        makeAutoObservable(this);
    }
    setToken = async ({ mobile, code }) => {
        const res = await instance.post(
            "http://geek.itheima.net/v1_0/authorizations",
            {
                mobile,
                code,
            }
        );
        this.token = res.data.token;
    };
}

export default LoginStore;
