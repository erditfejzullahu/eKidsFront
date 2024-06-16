import { jwtDecode } from "jwt-decode";
import { mapActions } from "vuex";


export function checkAccessToken() {
    if(localStorage.getItem('accessToken')){
        return localStorage.getItem('accessToken');
    }
    return false;
}

export function checkRefreshToken() {
    if(localStorage.getItem('refreshToken')){
        return localStorage.getItem('refreshToken');
    }
    return false;
}

export function decodeToken(token) {
    return jwtDecode(token);
}

export function isTokenExpired(token) {
    const decodedToken = decodeToken(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
}

export function TokenExpired() {
    const token = checkAccessToken();
    if(token) {
        if(isTokenExpired(token)){
            return true;
        }
    }else{
        return true;
    }
    return false;
}
