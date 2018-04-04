import * as React from 'react';
import Laster from './innholdslaster-laster';
import { STATUS } from '../../ducks/api-utils';
import { storrelseType } from 'nav-frontend-spinner';

const array = (value: {}) => (Array.isArray(value) ? value : [value]);
const harStatus = (...status: string[]) =>
    (element: {status: string}) => array(status).toString().includes(element.status);
const noenHarFeil = (avhengigheter: {}[]) => avhengigheter && avhengigheter.some(harStatus(STATUS.ERROR));
const alleLastet = (avhengigheter: {}[]) => avhengigheter && avhengigheter.every(harStatus(STATUS.OK));
const alleLastetEllerReloading = (avhengigheter: {}[]) => (
    avhengigheter && avhengigheter.every(harStatus(STATUS.OK, STATUS.RELOADING))
);

interface InnholdslasterProps {
    avhengigheter: {status: string}[];
    feilmeldingKomponent?: React.ReactNode | React.ReactChild;
    storrelse?: storrelseType;
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
            },                             200);
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
            return <>{children(avhengigheter)}</>;
        }
        return <>{children}</>;
    }

    render() {
        const { avhengigheter, feilmeldingKomponent, storrelse } = this.props;
        if (alleLastet(avhengigheter)) {
            return this.renderChildren();
        } else if (!this.state.timeout && alleLastetEllerReloading(avhengigheter)) {
            this.setTimer();
            return this.renderChildren();
        }

        if (noenHarFeil(avhengigheter)) {
            this.clearTimer();

            return (
                <div className="innholdslaster-feilmelding">{feilmeldingKomponent}</div>
            );
        }

        return <Laster className="innholdslaster-laster" storrelse={storrelse} />;
    }
}

export default Innholdslaster;
