import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Datovelger from './datovelger/datovelger';
import { Moment } from 'moment';
import { momentAsISO } from './datovelger/datovelger-utils';

// tslint:disable

interface DummyProp {
    dummy?: string; // TypeScript klager hvis props kun er InjectedIntlProps
}

type Props = DummyProp & InjectedIntlProps;

interface State {
    dato: Moment;
}

class SoketidspunktForDagpenger extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            dato: momentAsISO(new Date())
        };
    }

    velgDato(dato: Moment) {
        this.setState({
            dato: dato,
        });
    }

    render() {
        return (
            <div>
                <Datovelger
                    velgDato={dato => this.velgDato(dato)}
                    valgtDato={this.state.dato}
                />
                Her ser du hvilken dato du bør oppgi hvis du er i en av disse situasjonene:
                Har du sagt opp jobben selv
                Hvis du selv er skyld i at du har mistet jobben, får du vanligvis ikke dagpenger for de første 12 ukene. Du må likevel søke dagpenger fra første dag du er arbeidsledig fordi de 12 ukene ikke begynner å løpe før du har søkt dagpenger. Du må sende meldekort i hele perioden.

                Har du fått sluttpakke
                Hovedregelen er at du ikke har rett til dagpenger før tidsrommet sluttpakken gjelder for er over. Du bør likevel velge siste dato den siste ordinære lønnsutbetalingen din dekker, slik at NAV kan vurdere fra hvilken dato du har rett til dagpenger.

                Har du fått bonus
                Stay-on bonus anses ikke som lønn. Mottar du dette, bør du velge siste dato den siste lønnsutbetalingen din dekker.

                Er du tilkallingsvikar
                Er du tilkallingsvikar i samme bedrift som du har blitt oppsagt fra, bør du velge siste dato den ordinære lønnsutbetalingen din dekker.

                Jobber du turnus
                Hvis du arbeider skift, turnus eller rotasjon, opparbeider du deg friperioder eller avspasering. Du bør velge første dato etter at friperioden eller avspaseringen er ferdig.
            </div>
        );
    }
}

export default injectIntl(SoketidspunktForDagpenger);