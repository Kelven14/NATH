export const TOKEN_KEY = '&app-token';
export const ID_USUARIO = '&id-usuario';
export const NOME_USUARIO = '&nome-usuario';
export const USER_TYPE = '&user-type';
export const VAR_CONTROLE = '&var-controle'


export const login = token => { localStorage.setItem(TOKEN_KEY, token); }
export const logout = () => { localStorage.clear() };

export const setIdUsuario = id => localStorage.setItem(ID_USUARIO, id);
export const getIdUsuario = () => localStorage.getItem(ID_USUARIO);

export const setNomeUsuario = nome => localStorage.setItem(NOME_USUARIO, nome);
export const getNomeUsuario = () => localStorage.getItem(NOME_USUARIO);

export const setTipoUsuario = tipo => localStorage.setItem(USER_TYPE, tipo);
export const getTipoUsuario = () => localStorage.getItem(USER_TYPE);

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const isAuthenticated = () => !!localStorage.getItem('&app-token')

export const setVariavel = variavel => localStorage.setItem(VAR_CONTROLE, variavel);

export const isReload = () => {

    if (localStorage.getItem('&var-controle') === 'true') {
        window.location.reload(1);
    }
    setVariavel(false)
}

export const isAdministrador = () => {
    let ok = false;
    if (localStorage.getItem('&user-type') === "Administrador") {
        ok = true;
    }
    return ok;
}

export const isMedico = () => {
    let ok = false;
    if (localStorage.getItem('&user-type') === "Médico") {
        ok = true;
    }
    return ok;
}

export const isEnfermeiro = () => {
    let ok = false;
    if (localStorage.getItem('&user-type') === "Enfermeiro") {
        ok = true;
    }
    return ok;
}

export const isEnfermeiroAdm = () => {
    let ok = false;
    if (localStorage.getItem('&user-type') === "Enfermeiro" || localStorage.getItem('&user-type') === "Administrador") {
        ok = true;
    }
    return ok;
}

export const isMedicoAdm = () => {
    let ok = false;
    if (localStorage.getItem('&user-type') === "Médico" || localStorage.getItem('&user-type') === "Administrador") {
        ok = true;
    }
    return ok;
}