export const diffDays = (chck_in, chck_out) => {
    const checkIn = new Date(chck_in);
    const checkOut = new Date(chck_out);

    const diff = checkOut.getTime() - checkIn.getTime();
    const totalDays = Math.ceil(diff / (1000 * 3600 * 24));

    return totalDays;
};
