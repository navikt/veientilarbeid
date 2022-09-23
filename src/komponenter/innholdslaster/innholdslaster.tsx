import * as React from 'react';
import styles from './innholdslaster.module.css';
import { DataElement, STATUS } from '../../ducks/api';
import { Loader } from '@navikt/ds-react';

const array = (value: {}) => (Array.isArray(value) ? value : [value]);

const harStatus =
    (...status: string[]) =>
    (element: { status: string }) =>
        array(status).toString().includes(element.status);

const noenHarFeil = (avhengigheter: DataElement[]) => avhengigheter && avhengigheter.some(harStatus(STATUS.ERROR));
const alleLastet = (avhengigheter: DataElement[]) => avhengigheter && avhengigheter.every(harStatus(STATUS.OK));
const alleVentetPa = (ventPa?: DataElement[]) => (ventPa ? ventPa.every(harStatus(STATUS.OK, STATUS.ERROR)) : true);

const alleLastetEllerReloading = (avhengigheter: DataElement[]) =>
    avhengigheter && avhengigheter.every(harStatus(STATUS.OK, STATUS.RELOADING));

interface InnholdslasterProps {
    avhengigheter: DataElement[];
    ventPa?: DataElement[];
    betingelser?: boolean[];
    feilmeldingKomponent?: React.ReactNode;
    storrelse?: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
    children?: React.ReactNode | Function;
}

interface InnholdslasterState {
    timeout: boolean;
}

class Innholdslaster extends React.Component<InnholdslasterProps, InnholdslasterState> {
    timer?: number;

    constructor(props: InnholdslasterProps) {
        super(props);

        this.state = { timeout: false };
        this.timer = undefined;

        this.renderChildren = this.renderChildren.bind(this);
        this.setTimer = this.setTimer.bind(this);
        this.clearTimer = this.clearTimer.bind(this);
    }

    setTimer() {
        if (!this.timer) {
            this.timer = window.setTimeout(() => {
                this.setState({ timeout: true });
            }, 200);
        }
    }

    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = undefined;

            // Deferred, slik at setState ikke er en del av render
            setTimeout(() => this.setState({ timeout: false }), 0);
        }
    }

    renderChildren() {
        const { avhengigheter, children } = this.props;

        if (children instanceof Function) {
            return children(avhengigheter);
        }
        return children;
    }

    render() {
        const { avhengigheter, ventPa, betingelser, feilmeldingKomponent } = this.props;

        const avhengigheterFiltrert = betingelser
            ? avhengigheter.filter((a, i) => betingelser[i] === true)
            : avhengigheter;

        if (alleLastet(avhengigheterFiltrert) && alleVentetPa(ventPa)) {
            // Alle avhengigheter lastet inn uten problemer og ventPa er ferdig (enten OK eller FEILET){
            return this.renderChildren();
        } else if (!this.state.timeout && alleLastetEllerReloading(avhengigheterFiltrert)) {
            this.setTimer();
            return this.renderChildren();
        } else if (noenHarFeil(avhengigheterFiltrert)) {
            this.clearTimer();
            return <div className={styles.innholdslasterFeilmelding}>{feilmeldingKomponent}</div>;
        }
        return (
            <div className={styles.innholdslasterLaster}>
                <Loader transparent size="2xlarge" />
            </div>
        );
    }
}

export default Innholdslaster;
