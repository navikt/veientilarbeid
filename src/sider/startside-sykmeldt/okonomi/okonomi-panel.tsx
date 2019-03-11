import * as React from 'react';
import Parser from 'html-react-parser';
import { Systemtittel } from 'nav-frontend-typografi';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import LenkeMedChevron from '../../../komponenter/lenke-med-chevron/lenke-med-chevron';

import './okonomi-panel.less';

interface OkonomiPanelProps {
    tittelId: string;
    lenkeTekstId: string;
    lenkeUrlId: string;
    renderTittelAsHtml?: boolean;
    bilde: string;
}

type AllProps = OkonomiPanelProps & InjectedIntlProps;

const OkonomiPanel = (props: AllProps) => {

    const { intl, tittelId, lenkeTekstId, lenkeUrlId, renderTittelAsHtml, bilde } = props;
    const lenkeUrl = intl.messages[lenkeUrlId];
    const tekst = intl.messages[tittelId];

    return (
        <div className="okonomi-panel">
            <img src={bilde} className="okonomi-panel--bilde blokk-m"/>

            <Systemtittel className="blokk-m okonomi-panel--tittel">
                { renderTittelAsHtml ?
                    Parser(tekst)
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
