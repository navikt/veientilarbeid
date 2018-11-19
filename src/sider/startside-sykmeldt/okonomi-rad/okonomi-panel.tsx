import * as React from 'react';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import './okonomi-panel.less';
import { Systemtittel } from 'nav-frontend-typografi';
import Html from '../../../komponenter/html';
import LenkeMedChevron from '../../../komponenter/lenke-med-chevron/lenke-med-chevron';

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

            <LenkeMedChevron path={lenkeUrl} className="okonomi-panel--lenke">
                <FormattedMessage id={lenkeTekstId}/>
            </LenkeMedChevron>

        </div>
    );
};

export default injectIntl(OkonomiPanel);