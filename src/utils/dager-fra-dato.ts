function dagerFraDato(from: Date, to?: Date): number {
    const todate = to || new Date();
    const start = new Date(from.toISOString().substr(0, 10));
    const end = new Date(todate.toISOString().substr(0, 10));
    const millis = end.getTime() - start.getTime();
    const days = millis / 3600000 / 24;
    return Math.floor(days);
}

export default dagerFraDato;
