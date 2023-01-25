export const logout = (localItem, router) => {
    localStorage.removeItem(localItem);
    localStorage.removeItem('token');
    router.push('/');
};