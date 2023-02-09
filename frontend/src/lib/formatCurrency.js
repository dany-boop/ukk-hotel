export const formatCurrency = (num: any) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: '$',
    }).format(Number(num));
};