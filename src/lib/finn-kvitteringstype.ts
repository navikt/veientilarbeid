function finnKvitteringstype(kvittering: string) {
    let kvitteringstype = 'ukjent';
    if (kvittering === 'reaktivering') {
        kvitteringstype = 'reaktivering';
    }
    if (kvittering && /behovsvurdering/.test(kvittering)) {
        kvitteringstype = 'behovsvurdering';
    }
    return kvitteringstype;
}

export default finnKvitteringstype;
