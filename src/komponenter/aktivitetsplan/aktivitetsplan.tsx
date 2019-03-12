import * as React from 'react';
import { parse } from 'query-string';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import LenkepanelBase from 'nav-frontend-lenkepanel';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import designMug from './design-mug.svg';
import { gaTilAktivitetsplan } from '../../metrics';

import './aktivitetsplan.less';

export const AKTIVITETSPLAN_URL = '/aktivitetsplan/';

interface State {
    nyRegistrering: boolean;
}

interface AktivitetsplanProps {
}

class Aktivitetsplan extends React.PureComponent<AktivitetsplanProps, State> {
    constructor(props: AktivitetsplanProps) {
        super(props);
        this.state = {
            nyRegistrering: parse(location.search).nyRegistrering === 'true'
        };
    }

    render() {
        let overskriftTekstId = 'aktivitetsplan-overskrift-ordinaer';
        let beskrivelseTekstId = 'aktivitetsplan-beskrivelse' + (this.state.nyRegistrering ? '-ny' : '');

        const linkCreator = (props: {}) => {
            return <a onClick={gaTilAktivitetsplan} {...props}/>;
        };

        return (
            <LenkepanelBase
                tittelProps="undertittel"
                href={AKTIVITETSPLAN_URL}
                linkCreator={linkCreator}
                border={true}
                className="aktivitetsplan"
            >
                <div className="lp-innhold">
                    <div className="lp-ikon">
                        <img src={designMug} alt="" />
                    </div>
                    <div className="lp-tekst">
                        <Systemtittel tag="h2" className="lenkepanel__heading blokk-xxxs">
                            <FormattedMessage id={overskriftTekstId}/>
                        </Systemtittel>
                        <Normaltekst className="lenkepanel__tekst">
                            <FormattedHTMLMessage id={beskrivelseTekstId}/>
                        </Normaltekst>
                    </div>
                </div>
            </LenkepanelBase>
        );
    }
}

export default Aktivitetsplan;
