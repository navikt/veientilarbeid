export interface Beregningsdata {
    rettighetsgruppe?: string;
}

function beregnDagpengerStatus(data: Beregningsdata): string {
    const { rettighetsgruppe } = data;
    let status = 'ukjentStatus';
    if (rettighetsgruppe === 'DAGP') {
        status = 'mottarDagpenger';
    }
    return status;
}

export default beregnDagpengerStatus;
