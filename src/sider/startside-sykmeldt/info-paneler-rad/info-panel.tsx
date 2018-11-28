import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import * as React from 'react';
import LenkeMedChevron from '../../../komponenter/lenke-med-chevron/lenke-med-chevron';

interface InfoPanelProps {
    bilde: string; // tslint:disable-line
    tittelId: string;
    tekstId: string;
    lenkeTekstId: string;
    lenkeUrlId?: string;
    lenkeUrl?: string;
}

type AllProps = InfoPanelProps & InjectedIntlProps;

const InfoPanel = (props: AllProps) => {

    const { tittelId, tekstId, lenkeTekstId, lenkeUrlId, lenkeUrl, intl, bilde } = props;

    const lenkeTekst = lenkeUrlId ? intl.messages[lenkeUrlId] : lenkeUrl;

    return (
        <div className="info-panel">
            <div className="info-panel--bilde-container">
                <img src={bilde} className="info-panel--bilde"/>
            </div>
            <div className="info-panel--tekst-container">
                <Systemtittel className="blokk-s">
                    <FormattedMessage id={tittelId} />
                </Systemtittel>
                <Normaltekst className="blokk-m">
                    <FormattedMessage id={tekstId} />
                </Normaltekst>
                <LenkeMedChevron path={lenkeTekst ? lenkeTekst : ''} className="okonomi-panel--lenke">
                    <FormattedMessage id={lenkeTekstId}/>
                </LenkeMedChevron>
            </div>
        </div>
    );

};

export default injectIntl(InfoPanel);