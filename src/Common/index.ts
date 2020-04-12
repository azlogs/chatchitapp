// return the user data from the session storage
export const getUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    
    return null;
}

// return the token from the session storage
export const getToken = () => {
    return localStorage.getItem('token') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
    // sessionStorage.removeItem('token');
    // sessionStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

// set the token and user from the session storage
export const setUserSession = (token: string, user: any) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    // sessionStorage.setItem('token', token);
    // sessionStorage.setItem('user', JSON.stringify(user));
}