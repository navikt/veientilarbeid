import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';

interface InfoPanelProps {
    bilde: string; // tslint:disable-line
    tittelId: string;
    tekstId: string;
    lenkeTekstId: string;
    lenkeUrlId: string;
}

type AllProps = InfoPanelProps & InjectedIntlProps;

const InfoPanel = (props: AllProps) => {
    const { tittelId, tekstId, lenkeTekstId, intl, lenkeUrlId, bilde } = props;

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
                <Lenke href={intl.messages[lenkeUrlId]} className="okonomi-panel--lenke">
                    <FormattedMessage id={lenkeTekstId}/>
                    <HoyreChevron />
                </Lenke>
            </div>
        </div>
    );

};

export default injectIntl(InfoPanel);
