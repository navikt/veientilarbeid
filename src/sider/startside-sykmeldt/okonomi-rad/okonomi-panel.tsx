import * as React from 'react';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import './okonomi-panel.less';
import { Systemtittel } from 'nav-frontend-typografi';
import Html from '../../../komponenter/html';

const infoBilde = require('./info.svg');

interface OkonomiPanelProps {
    tittelId: string;
    lenkeTekstId: string;
    lenkeUrlId: string;
    renderTittelAsHtml?: boolean;
}

type AllProps = OkonomiPanelProps & InjectedIntlProps;

const OkonomiPanel = (props: AllProps) => {

    const { intl, tittelId, lenkeTekstId, lenkeUrlId, renderTittelAsHtml } = props;
    const lenkeUrl = intl.messages[lenkeUrlId];
    const tekst = intl.messages[tittelId];

    return (
        <div className="okonomi-panel">
            <img src={infoBilde} className="okonomi-panel--bilde blokk-m"/>

            <Systemtittel className="blokk-m okonomi-panel--tittel">
                { renderTittelAsHtml ?
                    <Html html={tekst}/>
                    :
                    tekst
                }
            </Systemtittel>

            <a className="lenke okonomi-panel--lenke" href={lenkeUrl}>
                <FormattedMessage id={lenkeTekstId}/>
            </a>

        </div>
    );
};

export default injectIntl(OkonomiPanel);