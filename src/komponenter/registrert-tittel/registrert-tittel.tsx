import { createRef, useCallback, useEffect, useState } from 'react';
import { Heading, Panel } from '@navikt/ds-react';
import { Success, SuccessColored } from '@navikt/ds-icons';

import { useSprakValg } from '../../contexts/sprak';
import { useArbeidssokerPerioder } from '../../contexts/arbeidssoker';

import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import beregnArbeidssokerperioder from '../../lib/beregn-arbeidssokerperioder';

import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';
import { DinSituasjonSvar, useBrukerregistreringData } from '../../contexts/brukerregistrering';

const TEKSTER = {
    nb: {
        registrert: 'Du er registrert som arbeidssøker',
        registrertNy: 'Du er nå registrert som arbeidssøker',
        registrertPermittert: 'Du er registrert som permittert arbeidssøker',
    },
    en: {
        registrert: 'You are registered as job seeker',
        registrertNy: 'You are now registered as job seeker',
        registrertPermittert: 'You are registered as a temporarily layed off job seeker',
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
    const erPermittert =
        brukerregistreringData?.registrering?.besvarelse.dinSituasjon === DinSituasjonSvar.ER_PERMITTERT;

    const scrollToRegistrering = useCallback(() => {
        const goto = new URLSearchParams(window.location.search).get('goTo');
        if (goto === 'registrering' && containerRef.current) {
            containerRef.current.scrollIntoView();
            settErNyRegistrert(true);
        }
    }, [containerRef]);

    useEffect(() => {
        scrollToRegistrering();
    }, [scrollToRegistrering]);

    if (!harAktivArbeidssokerperiode) return null;

    return (
        <div ref={containerRef}>
            <Panel className={spacingStyles.px1_5}>
                <div className={flexStyles.flex}>
                    <span
                        style={{
                            marginRight: '0.5em',
                            position: 'relative',
                            top: '6px',
                            fontSize: 'var(--a-font-size-heading-medium)',
                        }}
                    >
                        {erNyRegistrert ? <SuccessColored aria-hidden="true" /> : <Success aria-hidden="true" />}
                    </span>
                    <div>
                        <Heading size="medium">{tekst(hentTekstNokkel(erNyRegistrert, erPermittert))}</Heading>
                    </div>
                </div>
            </Panel>
        </div>
    );
};

export default RegistrertTittel;
