import * as Brukerregistrering from '../contexts/brukerregistrering';
import * as Autentisering from '../contexts/autentisering';
import * as Egenvurdering from '../contexts/egenvurdering';
import * as Oppfolging from '../contexts/oppfolging';

export function kanViseIVURDEgenvurdering({
    underOppfolging,
    registreringData,
    autentiseringData,
    egenvurderingData,
    oppfolgingData,
}: {
    underOppfolging?: boolean;
    registreringData: Brukerregistrering.Data | null;
    autentiseringData: Autentisering.Data;
    egenvurderingData: Egenvurdering.Data | null;
    oppfolgingData: Oppfolging.Data;
}): boolean {
    const LANSERINGSDATO_EGENVURDERING = new Date(2019, 4, 10);
    const { securityLevel } = autentiseringData;
    const foreslattInnsatsgruppe = Brukerregistrering.selectForeslattInnsatsgruppe(registreringData)!; // Komponent blir rendret kun hvis foreslått innsatsgruppe er satt
    const dinSituasjon = registreringData?.registrering?.besvarelse?.dinSituasjon || 'INGEN_VERDI';
    const harEgenvurderingbesvarelse = egenvurderingData !== null;
    const isLevel4 = securityLevel === Autentisering.InnloggingsNiva.LEVEL_4;

    const opprettetRegistreringDatoString = registreringData?.registrering?.opprettetDato;
    const opprettetRegistreringDato = opprettetRegistreringDatoString
        ? new Date(opprettetRegistreringDatoString)
        : null;
    const egenvurderingbesvarelseDato = egenvurderingData ? new Date(egenvurderingData.sistOppdatert) : null;
    const egenvurderingsbesvarelseValid = (): boolean => {
        let isValid = false;
        if (opprettetRegistreringDato && egenvurderingbesvarelseDato) {
            isValid = opprettetRegistreringDato <= egenvurderingbesvarelseDato;
        }
        return isValid;
    };

    const kanViseEgenvurdering =
        (underOppfolging ?? false) &&
        isLevel4 &&
        dinSituasjon !== 'ER_PERMITTERT' &&
        oppfolgingData.servicegruppe === Oppfolging.Servicegruppe.IVURD &&
        (!harEgenvurderingbesvarelse || !egenvurderingsbesvarelseValid()) &&
        opprettetRegistreringDato !== null &&
        opprettetRegistreringDato >= LANSERINGSDATO_EGENVURDERING &&
        (foreslattInnsatsgruppe === Brukerregistrering.ForeslattInnsatsgruppe.STANDARD_INNSATS ||
            foreslattInnsatsgruppe === Brukerregistrering.ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS);

    return kanViseEgenvurdering;
}
