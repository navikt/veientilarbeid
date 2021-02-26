// Liste hentet fra KSSX og KSSK
const samarbeidsKontorer = [
    '030112',
    '030105',
    '3413',
    '3407',
    '3401',
    '3807',
    '3803',
    '1120',
    '1121',
    '110302',
    '110303',
    '3808',
    '110306',
    '110307',
    '030114',
    '3418',
    '3411',
    '030108',
    '030109',
    '1149',
    '110301',
];

export function erSamarbeidskontor(geografiskTilknytning: string | null | undefined) {
    if (!geografiskTilknytning) return samarbeidsKontorer;
    return samarbeidsKontorer.includes(geografiskTilknytning);
}
