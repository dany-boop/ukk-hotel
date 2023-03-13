export const formatLocalTime = (time) => {
    const date = new Date(time);
    return `${date.getDate()}/${Number(date.getMonth()) + 1
        }/${date.getFullYear()}`;
};
