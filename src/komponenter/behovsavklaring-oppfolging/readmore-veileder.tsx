import { useState } from 'react';
import { BodyShort, Link, ReadMore } from '@navikt/ds-react';

import { useAmplitudeData } from '../../contexts/amplitude-context';

import { amplitudeLogger, AmplitudeData } from '../../metrics/amplitude-utils';
import { loggAktivitet } from '../../metrics/metrics';

import spacingStyles from '../../spacing.module.css';

interface Props {
    amplitudeData: AmplitudeData;
}

function Innhold(props: Props) {
    const { amplitudeData } = props;

    function loggLenkeKlikk(handling: string, url: string) {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            handling,
            ...amplitudeData,
        });
        window.location.assign(url);
    }

    function SkrivTilOss() {
        return (
            <Link
                href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                onClick={() =>
                    loggLenkeKlikk(
                        'Går til STO fra 14a onboarding kort',
                        'https://mininnboks.nav.no/sporsmal/skriv/ARBD'
                    )
                }
            >
                skriv til oss
            </Link>
        );
    }

    function Chat() {
        return (
            <Link
                href="https://www.nav.no/person/kontakt-oss/chat/"
                onClick={() =>
                    loggLenkeKlikk(
                        'Går til Chat fra 14a onboarding kort',
                        'https://www.nav.no/person/kontakt-oss/chat/'
                    )
                }
            >
                chat
            </Link>
        );
    }

    return (
        <div className={spacingStyles.mt1}>
            <BodyShort className={spacingStyles.blokkXs}>
                Veilederens oppgave er å besvare spørsmål, bistå deg med å søke stillinger og tilby deg hjelp på veien
                til arbeid.
            </BodyShort>

            <BodyShort className={spacingStyles.blokkXs}>
                Veilederne kan <strong>ikke</strong> svare på spørsmål om søknad om dagpenger, behandling av
                dagpengesøknaden eller utbetaling av dagpenger.
            </BodyShort>

            <BodyShort className={spacingStyles.blokkM}>
                Dersom du lurer på noe om dagpenger ber vi deg bruke <SkrivTilOss /> eller <Chat />.
            </BodyShort>
        </div>
    );
}

function ReadMoreVeileder() {
    const { amplitudeData } = useAmplitudeData();
    const [clickedInnsyn, setClickedInnsyn] = useState(false);

    const handleClickOpenReadMoreVeileder = () => {
        if (!clickedInnsyn) {
            loggAktivitet({ aktivitet: 'Ser ReadMore om veileder', ...amplitudeData });
            setClickedInnsyn(true);
        }
    };

    return (
        <ReadMore
            size="medium"
            header="Hva slags hjelp kan du få fra en veileder?"
            onClick={handleClickOpenReadMoreVeileder}
        >
            <Innhold amplitudeData={amplitudeData} />
        </ReadMore>
    );
}

export default ReadMoreVeileder;
