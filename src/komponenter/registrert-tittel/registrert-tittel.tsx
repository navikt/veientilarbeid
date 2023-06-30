import { createRef, useCallback, useEffect, useState } from 'react';
import { BodyShort, Heading, Panel } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';
import { useArbeidssokerPerioder } from '../../contexts/arbeidssoker';

import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import beregnArbeidssokerperioder from '../../lib/beregn-arbeidssokerperioder';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import prettyPrintDato from '../../utils/pretty-print-dato';
import spacingStyles from '../../spacing.module.css';
import { harPermittertSituasjon } from '../../lib/har-permittert-situasjon';
import { useBesvarelse } from '../../contexts/besvarelse';

const TEKSTER = {
    nb: {
        registrert: 'Du er registrert som arbeidssøker',
        registrertNy: 'Du er nå registrert som arbeidssøker',
        registrertPermittert: 'Du er registrert som permittert arbeidssøker',
        registreringsDato: 'Registreringsdato',
    },
    en: {
        registrert: 'You are registered as job seeker',
        registrertNy: 'You are now registered as job seeker',
        registrertPermittert: 'You are registered as a temporarily layed off job seeker',
        registreringsDato: 'Date of registration',
    },
};

function hentTekstNokkel(erNyregistrert: boolean, erPermittert: boolean) {
    if (erNyregistrert) {
        return 'registrertNy';
    } else if (erPermittert) {
        return 'registrertPermittert';
    }

    return 'registrert';
}
const RegistrertTittel = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    const containerRef = createRef<HTMLDivElement>();
    const [erNyRegistrert, settErNyRegistrert] = useState<boolean>(false);
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const arbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperioderData);
    const brukerregistreringData = useBrukerregistreringData();
    const harAktivArbeidssokerperiode = arbeidssokerperioder.harAktivArbeidssokerperiode === 'Ja';
    const { besvarelse } = useBesvarelse();
    const registrertDato = brukerregistreringData?.registrering.opprettetDato || false;
    const erPermittert = harPermittertSituasjon(brukerregistreringData?.registrering, besvarelse);

    const scrollToRegistrering = useCallback(() => {
        const params = new URLSearchParams(window.location.search);
        const goto = params.get('goTo');

        if (goto === 'registrering' && containerRef.current) {
            containerRef.current.scrollIntoView();
            settErNyRegistrert(true);
            params.delete('goTo');
            window.history.replaceState(null, '', `?${params}`);
        }
    }, [containerRef]);

    useEffect(() => {
        scrollToRegistrering();
    }, [scrollToRegistrering]);

    if (!harAktivArbeidssokerperiode) return null;

    return (
        <div ref={containerRef}>
            <Panel className={spacingStyles.pbn}>
                <Heading size="medium">{tekst(hentTekstNokkel(erNyRegistrert, erPermittert))}</Heading>
                {registrertDato && (
                    <BodyShort>
                        {tekst('registreringsDato')}: {prettyPrintDato(registrertDato)}
                    </BodyShort>
                )}
            </Panel>
        </div>
    );
};

export default RegistrertTittel;
