import * as Oppfolging from '../contexts/oppfolging';
import * as Autetisering from '../contexts/autentisering';
import { InnloggingsNiva } from '../contexts/autentisering';

export function erInnloggetArbeidssoker({
    oppfolgingData,
    autentiseringData,
    underOppfolging,
}: {
    oppfolgingData: Oppfolging.Data;
    autentiseringData: Autetisering.Data;
    underOppfolging?: boolean;
}) {
    return (
        oppfolgingData.formidlingsgruppe === 'ARBS' &&
        autentiseringData.securityLevel === InnloggingsNiva.LEVEL_4 &&
        underOppfolging
    );
}
