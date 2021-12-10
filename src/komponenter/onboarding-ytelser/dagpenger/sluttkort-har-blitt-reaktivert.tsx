import { Heading, BodyShort, Button } from '@navikt/ds-react';
import { useAmplitudeData } from '../../../contexts/amplitude-context';
import { dagpengerStartSoknadLenke } from '../../../innhold/lenker';
import { loggAktivitet } from '../../../metrics/metrics';

const Sluttkort = () => {
    const amplitudeData = useAmplitudeData();

    function handleSokGjenopptak(event: React.SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation();
        window.location.assign(dagpengerStartSoknadLenke);
        loggAktivitet({ aktivitet: 'Går til dagpengesøknad etter reaktivering', ...amplitudeData });
    }

    return (
        <>
            <Heading size="medium">Du må søke om dagpenger på nytt</Heading>

            <div>
                <BodyShort size="small" className="blokk">
                    Har du mottatt dagpenger vil utbetalingene være stoppet og du må derfor sende inn ny søknad.
                </BodyShort>
                <BodyShort size="small" className="blokk">
                    Du kan tidligst få dagpenger igjen fra den dagen du sender søknaden.
                </BodyShort>
                <Button variant="primary" onClick={handleSokGjenopptak} className="blokk-s">
                    Søk dagpenger
                </Button>
            </div>
        </>
    );
};

export default Sluttkort;
