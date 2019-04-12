import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import { lesOmOkonomi } from '../../metrics';

import './okonomi-panel.less';

interface OkonomiPanelProps {
    tittelId: string;
    lenkeTekstId: string;
    lenkeUrlId: string;
    children: React.ReactNode;
}

type AllProps = OkonomiPanelProps & InjectedIntlProps;

const OkonomiPanel = (props: AllProps) => {
    const {intl, tittelId, lenkeTekstId, lenkeUrlId, children} = props;
    const lenkeUrl = intl.messages[lenkeUrlId];

    return (
        <div className="okonomi-panel">
            {children}

            <Systemtittel className="blokk-xs okonomi-panel--tittel">
                <FormattedMessage id={tittelId}/>
            </Systemtittel>

            <Lenke href={lenkeUrl} className="okonomi-panel--lenke" onClick={() => lesOmOkonomi(lenkeUrl)}>
                <Normaltekst tag="span">
                    <FormattedMessage id={lenkeTekstId}/>
                </Normaltekst>
                <HoyreChevron/>
            </Lenke>
        </div>
    );
};

export default injectIntl(OkonomiPanel);
