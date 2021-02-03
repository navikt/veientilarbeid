export function datoUtenTid(dato: string) {
    return new Date(dato.substr(0, 10));
}

export function plussDager(dato: Date, antallDager: number) {
    const kopi = new Date(dato);
    kopi.setDate(kopi.getDate() + antallDager);
    return kopi;
}
