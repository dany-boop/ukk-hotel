export const blockAccess = (localItem, router) => {
    if (typeof window !== 'undefined') {
        const item = JSON.parse(localStorage.getItem(localItem) || '{}');

        if (item.role !== localItem) {
            alert('Anda tidak memiliki akses ke halaman ini!');
            localStorage.clear();
            router.push('/auth/login');
        }
    }
};