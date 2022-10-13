import { BodyShort, Link } from '@navikt/ds-react';
import spacingStyles from '../../spacing.module.css';

import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import { loggAktivitet } from '../../metrics/metrics';
import { useAmplitudeData } from '../../contexts/amplitude-context';

interface Props {
    amplitudeTemaNavn: string;
}

const TEKSTER: Tekster<string> = {
    nb: {
        lesOm: 'Du kan også lese om de ulike ytelsene på',
    },
    en: {
        lesOm: 'You can read about the different benefits on',
    },
};

const LesOmYtelser = ({ amplitudeTemaNavn }: Props) => {
    const { amplitudeData } = useAmplitudeData();
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    function loggLenkeKlikk(action: string, url: string) {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
        window.location.assign(url);
    }

    return (
        <BodyShort className={spacingStyles.blokkXs}>
            {`${tekst('lesOm')} `}
            <Link
                href="https://www.nav.no/"
                onClick={() => {
                    loggLenkeKlikk(`Går til forsiden fra ${amplitudeTemaNavn}`, 'https://www.nav.no/');
                }}
            >
                nav.no
            </Link>
        </BodyShort>
    );
};

export default LesOmYtelser;
