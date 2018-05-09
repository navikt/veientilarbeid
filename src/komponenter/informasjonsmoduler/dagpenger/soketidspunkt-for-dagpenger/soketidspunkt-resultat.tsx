import * as React from 'react';
import { Moment } from 'moment';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import { momentIDag } from './moment-utils';
import { Normaltekst } from 'nav-frontend-typografi';

interface OwnProps {
    dato: Moment;
}

type Props = OwnProps & InjectedIntlProps;

class SoketidspunktResultat extends React.Component<Props> {

    resultatPeriode(periode: string): React.ReactNode {
        return (
            <FormattedMessage id="dagpenger.soketidspunkt.dato.resultat.periode" values={{periode}}/>
        );
    }

    byggResultattekst(): React.ReactNode {
        const maxDato = this.props.dato.clone().subtract(3, 'days');
        const minDato = this.props.dato.clone().subtract(7, 'days');

        if (minDato.isBefore(momentIDag(), 'day')) {
            return (
                <span
                    dangerouslySetInnerHTML={{
                        __html: this.props.intl.messages['dagpenger.soketidspunkt.dato.resultat.idag']
                    }}
                />
            );
        }
        if (minDato.year() !== maxDato.year()) {
            return this.resultatPeriode(`${minDato.format('LL')} - ${maxDato.format('LL')}.`);
        } else if (minDato.month() !== maxDato.month()) {
            const year = `${minDato.year()}`;
            const minDatoStreng = minDato.format('LL').replace(year, '').trim();
            const maxDatoStreng = maxDato.format('LL').replace(year, '').trim();
            return this.resultatPeriode(`${minDatoStreng} - ${maxDatoStreng} ${year}.`);
        } else {
            const year = minDato.year();
            const month = minDato.format('MMMM');

            return this.resultatPeriode(`${minDato.date()}. - ${maxDato.date()}. ${month} ${year}.`);
        }

    }

    render() {
        return (
            <Normaltekst>
                {this.byggResultattekst()}
            </Normaltekst>
        );
    }
}

export default injectIntl(SoketidspunktResultat);