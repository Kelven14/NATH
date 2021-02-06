import axios from "./api";

class AuthService {
    signIn = (data) => {
      return new Promise((resolve, reject) => {
        axios
          .post('usuarios/logar',data)
          .then((response) => {
            if (response.data) {
              resolve(response);
            } else {
              reject(response.error);
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