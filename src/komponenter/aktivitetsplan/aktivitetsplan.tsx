import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Ingress, Innholdstittel } from 'nav-frontend-typografi';
import { parse } from 'query-string';
import LenkeMedChevron from '../lenke-med-chevron/lenke-med-chevron';
import ordinaerAktivitetsplanSvg from './ordinaer-aktivitetsplan.svg';
import sykmeldingAktivitetsplanSvg from './sykmelding-aktivitetsplan.svg';
import './aktivitetsplan.less';

export const AKTIVITETSPLAN_URL = '/aktivitetsplan/';

interface State {
    nyRegistrering: boolean;
}

interface AktivitetsplanProps {
    erBrukerSykmeldt?: boolean;
}

class Aktivitetsplan extends React.PureComponent<AktivitetsplanProps, State> {
    constructor(props: AktivitetsplanProps) {
        super(props);
        this.state = {
            nyRegistrering: parse(location.search).nyRegistrering === 'true'
        };
    }

    render() {
        const { erBrukerSykmeldt } = this.props;

        let overskriftTekstId;
        let beskrivelseTekstId;
        let lenkeId;

        if (erBrukerSykmeldt) {
            overskriftTekstId = 'aktivitetsplan-overskrift-sykmeldt';
            beskrivelseTekstId = 'aktivitetsplan-beskrivelse-sykmeldt';
            lenkeId = 'aktivitetsplan-lenke-sykmeldt';
        } else {
            overskriftTekstId = 'aktivitetsplan-overskrift-ordinaer';
            beskrivelseTekstId = 'aktivitetsplan-beskrivelse' + (this.state.nyRegistrering ? '-ny' : '');
            lenkeId = 'aktivitetsplan-lenke-ordinaer';
        }

        return (
            <div className="aktivitetsplan">
                <img
                    src={erBrukerSykmeldt ? sykmeldingAktivitetsplanSvg : ordinaerAktivitetsplanSvg}
                    alt="aktivitetsplan-illustrasjon"
                    className="aktivitetsplan__illustrasjon"
                />
                <div className="aktivitetsplan__tekst">
                    <Innholdstittel tag="h2" className="aktivitetsplan__overskrift blokk-xs" >
                        <FormattedMessage id={overskriftTekstId}/>
                    </Innholdstittel>
                    <Ingress className="blokk-s">
                        <FormattedMessage id={beskrivelseTekstId}/>
                    </Ingress>
                    <LenkeMedChevron path={AKTIVITETSPLAN_URL} className="aktivitetsplan__lenke">
                        <FormattedMessage id={lenkeId}/>
                    </LenkeMedChevron>
                </div>
            </div>
        );
    }
}

export default Aktivitetsplan;
