import * as React from 'react';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import './okonomi-panel.less';
import { Systemtittel } from 'nav-frontend-typografi';
import LenkeMedChevron from '../../../komponenter/lenke-med-chevron/lenke-med-chevron';
import { lesOmOkonomi } from '../../../metrics';

interface OkonomiPanelProps {
    tittelId: string;
    lenkeTekstId: string;
    lenkeUrlId: string;
    renderTittelAsHtml?: boolean;
    bilde: string;
}

type AllProps = OkonomiPanelProps & InjectedIntlProps;

const OkonomiPanel = (props: AllProps) => {

    const { intl, tittelId, lenkeTekstId, lenkeUrlId, bilde } = props;
    const lenkeUrl = intl.messages[lenkeUrlId];

    return (
        <div className="okonomi-panel">
            <img src={bilde} className="okonomi-panel--bilde blokk-m"/>

            <Systemtittel className="blokk-m okonomi-panel--tittel">
                <FormattedMessage id={tittelId}/>
            </Systemtittel>

            <LenkeMedChevron path={lenkeUrl} className="okonomi-panel--lenke" onClick={() => lesOmOkonomi(lenkeUrl)} >
                <FormattedMessage id={lenkeTekstId}/>
            </LenkeMedChevron>

        </div>
    );
};

export default injectIntl(OkonomiPanel);
