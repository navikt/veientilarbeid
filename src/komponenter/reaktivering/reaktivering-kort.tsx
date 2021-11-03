import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { useAutentiseringData, InnloggingsNiva } from '../../contexts/autentisering';
import { OppfolgingContext } from '../../contexts/oppfolging';
import ReaktiveringMelding from './reaktivering-melding';
import ReaktiveringIkkeAktueltMelding from './reaktivering-ikke-aktuelt-melding';
import { useBrowserStorage } from '../../hooks/use-browserstorage';

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

interface TittelProps {
    state: boolean;
}

function Tittel(props: TittelProps) {
    const { state } = props;
    return (
        <AlertStripe type={state ? 'advarsel' : 'info'} form="inline">
            Du er ikke lenger registrert som arbeidssøker hos NAV
        </AlertStripe>
    );
}

const ReaktiveringKort = () => {
    const [reaktiveringsState, setReaktiveringsstate] = React.useState(true);
    const [apen, setApen] = React.useState(false);
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
        setApen(status);
    }, [reaktiveringVariant]);

    const handleClick = () => {
        setApen(!apen);
    };

    if (!kanViseKomponent) {
        return null;
    }

    return (
        <section className="reaktivering-melding blokk-m">
            <EkspanderbartpanelBase
                tittel={<Tittel state={reaktiveringsState} />}
                apen={apen}
                onClick={handleClick}
                className={`alert ${reaktiveringsState}`}
            >
                {reaktiveringsState ? (
                    <ReaktiveringMelding setReaktivering={setReaktiveringVariant} setApen={setApen} />
                ) : (
                    <ReaktiveringIkkeAktueltMelding />
                )}
            </EkspanderbartpanelBase>
        </section>
    );
};

export default ReaktiveringKort;
