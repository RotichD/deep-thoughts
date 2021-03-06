import decode from 'jwt-decode';

class AuthService {
    // retrieve the data saved in token
    getProfile() {
        return decode(this.getToken());
    }

    // check if user is still logged in
    loggedIn() {
        // Checks if there is a saved token and validates it
        const token = this.getToken();
        // uses type coersion to check if token is NOT undefined and the token is NOT expired
        return !!token && !this.isTokenExpired(token);
    }

    // check if the token has expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now()/1000) {
                return true;
            } else {
                return false
            }
        } catch (err) {
            return false;
        }
    }

    // retrieve token from localStorage
    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    }

    // set token to localStorage and reload page to homepage
    login(idToken) {
        localStorage.setItem('id_token', idToken);

        window.location.assign('/');
    }

    // clear token from localStorage and force logout with reload
    logout() {
        //clear user token/profile data
        localStorage.removeItem('id_token');
        
        window.location.assign('/');
    }
}

export default new AuthService();