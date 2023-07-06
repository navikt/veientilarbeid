const fylkesnummer: { [k: string]: string } = {
    '30': 'Viken',
    '03': 'Oslo',
    '34': 'Innlandet',
    '38': 'Vestfold og Telemark',
    '42': 'Agder',
    '11': 'Rogaland',
    '46': 'Vestland',
    '15': 'Møre og Romsdal',
    '50': 'Trøndelag',
    '18': 'Nordland',
    '54': 'Troms og Finnmark',
};

function grupperGeografiskTilknytning(nummer: string = ''): string {
    const fylke = fylkesnummer[nummer.substr(0, 2)];
    return fylke || 'Ukjent';
}

export default grupperGeografiskTilknytning;
