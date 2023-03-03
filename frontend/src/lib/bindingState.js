export const bindingState = (e, setState, nameIn) => {
    const { name, value } = e.target;
    if (name === nameIn) {
        setState((prev) => ({ ...prev, [name]: value }));
    } else if (name === nameIn) {
        setState(value);
    }
};
