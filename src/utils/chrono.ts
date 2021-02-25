const chrono: { iDag: Date | null } = {
    iDag: null,
};

export const setFastTidspunktForIDag = (iDag: Date | null) => {
    chrono.iDag = iDag;
};

export const hentIDag = () => {
    return chrono.iDag || new Date();
};
