import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import { parse } from 'query-string';
import Lenkepanel from 'nav-frontend-lenkepanel';
import ordinaerAktivitetsplanSvg from './ordinaer-aktivitetsplan.svg';
import './aktivitetsplan.less';
import { gaTilAktivitetsplan } from '../../metrics';

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
            <section className="aktivitetsplan">
                <Lenkepanel
                    tittelProps="undertittel"
                    href={AKTIVITETSPLAN_URL}
                    linkCreator={linkCreator}
                    border={true}
                >
                    <div className="aktivitetsplan__innhold">
                        <div className="aktivitetsplan__illustrasjon">
                            <img
                                src={ordinaerAktivitetsplanSvg}
                                alt="aktivitetsplan-illustrasjon"
                            />
                        </div>
                        <div className="aktivitetsplan__tekst">
                            <Innholdstittel tag="h2" className="informasjonsmodul__heading blokk-s">
                                <FormattedMessage id={overskriftTekstId}/>
                            </Innholdstittel>
                            <Normaltekst className="ingress__tekst">
                                <FormattedMessage id={beskrivelseTekstId}/>
                            </Normaltekst>
                        </div>
                    </div>
                </Lenkepanel>
            </section>
        );
    }
}

export default Aktivitetsplan;
