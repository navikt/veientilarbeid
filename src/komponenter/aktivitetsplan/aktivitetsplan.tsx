import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Ingress, Innholdstittel } from 'nav-frontend-typografi';
import { parse } from 'query-string';
import LenkeMedChevron from '../lenke-med-chevron/lenke-med-chevron';

import aktivitetsplanSvg from './aktivitetsplan.svg';
import './aktivitetsplan.less';

export const AKTIVITETSPLAN_URL = '/aktivitetsplan/';

interface State {
    nyRegistrering: boolean;
}

class Aktivitetsplan extends React.PureComponent<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            nyRegistrering: parse(location.search).nyRegistrering === 'true'
        };
    }

    render() {
        const beskrivelseTekstId = 'aktivitetsplan-beskrivelse' + (this.state.nyRegistrering ? '-ny' : '');
        return (
            <div className="aktivitetsplan">
                <img
                    src={aktivitetsplanSvg}
                    alt="aktivitetsplan-illustrasjon"
                    className="aktivitetsplan__illustrasjon"
                />
                <div className="aktivitetsplan__tekst">
                    <Innholdstittel tag="h2" className="aktivitetsplan__overskrift" >
                        <FormattedMessage id="aktivitetsplan-overskrift"/>
                    </Innholdstittel>
                    <Ingress >
                        <FormattedMessage id={beskrivelseTekstId}/>
                    </Ingress>
                    <LenkeMedChevron path={AKTIVITETSPLAN_URL} className="aktivitetsplan__lenke">
                        <FormattedMessage id="aktivitetsplan-lenke"/>
                    </LenkeMedChevron>
                </div>
            </div>
        );
    }
}

export default Aktivitetsplan;
