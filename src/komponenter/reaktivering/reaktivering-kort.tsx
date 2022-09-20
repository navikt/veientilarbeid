import * as React from 'react';
import { Alert, Heading } from '@navikt/ds-react';
import { useAutentiseringData, InnloggingsNiva } from '../../contexts/autentisering';
import { OppfolgingContext } from '../../contexts/oppfolging';
import ReaktiveringMelding from './reaktivering-melding';
import ReaktiveringIkkeAktueltMelding from './reaktivering-ikke-aktuelt-melding';
import { useBrowserStorage } from '../../hooks/use-browserstorage';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import spacingStyles from '../../spacing.module.css';

interface Variant {
    updated: string;
    state: boolean;
}

function getDagerMellom(datoStart: string, datoSlutt: Date): number {
    const start = new Date(new Date(datoStart).toISOString().substr(0, 10));
    const slutt = new Date(datoSlutt.toISOString().substr(0, 10));
    const millis = slutt.getMilliseconds() - start.getMilliseconds();
    const dager = millis > 0 ? Math.floor(millis / 86400000) : 1;
    return dager;
}

function getReaktiveringsState(variant: Variant): boolean {
    const { updated, state } = variant;
    const dagerMellom = getDagerMellom(updated, new Date());
    return dagerMellom >= 28 ? true : state;
}

const ReaktiveringKort = () => {
    const [reaktiveringsState, setReaktiveringsstate] = React.useState(true);
    const [reaktiveringVariant, setReaktiveringVariant] = useBrowserStorage('vta-kan-reaktiveres-visning', {
        updated: new Date(),
        state: true,
    });
    const { kanReaktiveres } = React.useContext(OppfolgingContext).data;
    const { securityLevel } = useAutentiseringData();
    const isLevel4 = securityLevel === InnloggingsNiva.LEVEL_4;
    const kanViseKomponent = isLevel4 && kanReaktiveres;

    React.useEffect(() => {
        const status = getReaktiveringsState(reaktiveringVariant);
        setReaktiveringsstate(status);
    }, [reaktiveringVariant]);

    if (!kanViseKomponent) {
        return null;
    }

    return (
        <section className={spacingStyles.blokkM}>
            <ErRendret loggTekst="Rendrer tema: kan reaktiveres" />
            <Alert variant={reaktiveringsState ? 'warning' : 'info'}>
                <Heading size="small" level="2" className={spacingStyles.blokkXs}>
                    Du er ikke lenger registrert som arbeidssøker hos NAV
                </Heading>
                {reaktiveringsState ? (
                    <ReaktiveringMelding setReaktivering={setReaktiveringVariant} />
                ) : (
                    <ReaktiveringIkkeAktueltMelding />
                )}
                <InViewport loggTekst="Viser tema i viewport: kan reaktiveres" />
            </Alert>
        </section>
    );
};

export default ReaktiveringKort;
