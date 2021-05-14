import api from "../services/api";
import {  login, setIdUsuario, setNomeUsuario,setTipoUsuario, setVariavel } from "./auth";

class AuthService {
    signIn = (email, password) => {

        return new Promise((resolve, reject) => {
            const data = {
                usuario: email,
                senha: password,
            }
            api.post('/usuarios/logar', data)
                .then((response) => {
                    if (response.status === 200) {
                        resolve(response.data.user);
                        login(response.data.token);
                        setNomeUsuario(response.data.nome);
                        setTipoUsuario(response.data.tipo);
                        setIdUsuario(response.data.id);
                        setVariavel(false);
                    }
                    else {
                        reject(response.data.error);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

}

const authService = new AuthService();

export default authService;
