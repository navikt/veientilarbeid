import * as Oppfolging from '../contexts/oppfolging';
import * as Autetisering from '../contexts/autentisering';
import * as UnderOppfolging from '../contexts/under-oppfolging';
import { InnloggingsNiva } from '../contexts/autentisering';

export function erInnloggetArbeidssoker({
    oppfolgingData,
    autentiseringData,
    underOppfolgingData,
}: {
    oppfolgingData: Oppfolging.Data;
    autentiseringData: Autetisering.Data;
    underOppfolgingData: UnderOppfolging.Data;
}) {
    return (
        oppfolgingData.formidlingsgruppe === 'ARBS' &&
        autentiseringData.securityLevel === InnloggingsNiva.LEVEL_4 &&
        underOppfolgingData.underOppfolging
    );
}
