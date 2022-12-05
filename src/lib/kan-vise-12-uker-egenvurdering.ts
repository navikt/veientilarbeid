import * as Egenvurdering from '../contexts/egenvurdering';
import * as Brukerregistrering from '../contexts/brukerregistrering';
import * as Oppfolging from '../contexts/oppfolging';
import * as BrukerInfo from '../contexts/bruker-info';
import { AmplitudeData } from '../metrics/amplitude-utils';
import { plussDager } from '../utils/date-utils';
import erStandardInnsatsgruppe from './er-standard-innsatsgruppe';

const ANTALL_DAGER_COOL_DOWN = 7;

export function kanVise12UkerEgenvurdering({
    brukerInfoData,
    egenvurderingData,
    oppfolgingData,
    registreringData,
    amplitudeData,
    sistVistFraLocalstorage,
}: {
    brukerInfoData: BrukerInfo.Data;
    egenvurderingData: Egenvurdering.Data | null;
    oppfolgingData: Oppfolging.Data;
    registreringData: Brukerregistrering.Data | null;
    amplitudeData: AmplitudeData;
    sistVistFraLocalstorage: number;
}): boolean {
    const { ukerRegistrert } = amplitudeData;
    const erRegistrertUke11 = ukerRegistrert === 11;
    const erAAP = brukerInfoData.rettighetsgruppe === 'AAP';
    const brukerregistreringData = registreringData?.registrering ?? null;

    const egenvurderingbesvarelseDato = egenvurderingData ? new Date(egenvurderingData.sistOppdatert) : null;
    const opprettetRegistreringDatoString = registreringData?.registrering?.opprettetDato;
    const opprettetRegistreringDato = opprettetRegistreringDatoString
        ? new Date(opprettetRegistreringDatoString)
        : null;

    const harEgenvurderingEtter11Uker = (): boolean => {
        let isValid = false;
        if (opprettetRegistreringDato && egenvurderingbesvarelseDato) {
            const dato77dagerEtterRegistrering = plussDager(opprettetRegistreringDato, 77);
            isValid = dato77dagerEtterRegistrering.getTime() < egenvurderingbesvarelseDato.getTime();
        }
        return isValid;
    };

    const aldersgruppeUtenForsterketInnsats = brukerInfoData.alder >= 30 && brukerInfoData.alder <= 55;

    const viseEgenvurderingIgjen =
        sistVistFraLocalstorage === 0
            ? true
            : Date.now() > sistVistFraLocalstorage + ANTALL_DAGER_COOL_DOWN * 24 * 60 * 60;

    return (
        erRegistrertUke11 &&
        aldersgruppeUtenForsterketInnsats &&
        !erAAP &&
        erStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData }) &&
        !oppfolgingData.kanReaktiveres &&
        !harEgenvurderingEtter11Uker() &&
        viseEgenvurderingIgjen
    );
}
