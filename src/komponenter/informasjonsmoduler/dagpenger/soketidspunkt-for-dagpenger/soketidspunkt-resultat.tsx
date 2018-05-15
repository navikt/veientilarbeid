import * as React from 'react';
import { Moment } from 'moment';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import { momentIDag } from './moment-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import Snakkeboble from 'nav-frontend-snakkeboble';
import { formaterResultatperiode } from './soketidspunkt-resultat-utils';

interface OwnProps {
    dato: Moment;
    className?: string;
}

type Props = OwnProps & InjectedIntlProps;

class SoketidspunktResultat extends React.Component<Props> {

    byggResultattekst(): React.ReactNode {
        const maxDato = this.props.dato.clone().subtract(3, 'days');
        const minDato = this.props.dato.clone().subtract(7, 'days');

        if (minDato.isBefore(momentIDag(), 'day')) {
            return (
                <span
                    className={this.props.className ? this.props.className : ''}
                    dangerouslySetInnerHTML={{
                        __html: this.props.intl.messages['dagpenger.soketidspunkt.dato.resultat.idag']
                    }}
                />
            );
        } else {
            return (
                <FormattedMessage
                    id="dagpenger.soketidspunkt.dato.resultat.periode"
                    values={{periode: formaterResultatperiode(minDato, maxDato)}}
                />
            );
        }
    }

    render() {
        return (
            <div className="soketidspunkt-resultat">
                <Snakkeboble topp=" " ikonClass="soketidspunkt-resultat__ikon">
                    <Normaltekst>
                        {this.byggResultattekst()}
                    </Normaltekst>
                </Snakkeboble>
            </div>
        );
    }
}

export default injectIntl(SoketidspunktResultat);