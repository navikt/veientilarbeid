import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './info-paneler-rad.less';
import injectIntl = ReactIntl.injectIntl;
import InjectedIntlProps = ReactIntl.InjectedIntlProps;

interface InfoPanelProps {
    bilde?: any; // tslint:disable-line
    intl: any; // tslint:disable-line
    tittelId: string;
    tekstId: string;
    lenkeTekstId: string;
    lenkeUrlId: string;
}

const InfoPanel = (props: InfoPanelProps) => {

    return (
        <div className="info-panel">
            <div className="info-panel--bilde-container"/>
            <div className="info-pane--tekst-container">
                <Systemtittel>
                    <FormattedMessage id={props.tittelId} />
                </Systemtittel>
                <Normaltekst>
                    <FormattedMessage id={props.tekstId} />
                </Normaltekst>
                <a href={props.intl.messages[props.lenkeUrlId]}>
                    <FormattedMessage id={props.lenkeTekstId} />
                </a>
            </div>
        </div>
    );

};

const InfoPanelerRad: React.SFC<InjectedIntlProps> = (props?: InjectedIntlProps) => {
    
    return (
        <div className="info-paneler-rad">
            <InfoPanel
                tittelId="info-paneler-rad-hjelp-til-jobb-tittel"
                tekstId="info-paneler-rad-hjelp-til-jobb-tekst"
                lenkeTekstId="info-paneler-rad-hjelp-til-jobb-lenke-tekst"
                lenkeUrlId="info-paneler-rad-hjelp-til-jobb-lenke-url"
                intl={props!.intl}
            />
            <InfoPanel
                tittelId="info-paneler-rad-ditt-sykefravaer-tittel"
                tekstId="info-paneler-rad-ditt-sykefravaer-tekst"
                lenkeTekstId="info-paneler-rad-ditt-sykefravaer-lenke-tekst"
                lenkeUrlId="info-paneler-rad-ditt-sykefravaer-lenke-url"
                intl={props!.intl}
            />
        </div>
    );
};

export default injectIntl(InfoPanelerRad);