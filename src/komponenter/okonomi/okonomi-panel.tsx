import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { lesOmOkonomi } from '../../metrics';

import './okonomi-panel.less';
import tekster from '../../tekster/tekster';

interface OkonomiPanelProps {
    tittelId: string;
    lenkeTekstId: string;
    lenkeUrl: string;
    children: React.ReactNode;
}

type AllProps = OkonomiPanelProps;

const OkonomiPanel = (props: AllProps) => {
    const {tittelId, lenkeTekstId, lenkeUrl, children} = props;

    return (
        <div className="okonomi-panel">
            {children}

            <Systemtittel className="blokk-xs okonomi-panel--tittel">
                {tekster[tittelId]}
            </Systemtittel>

            <Lenke href={lenkeUrl} className="okonomi-panel--lenke" onClick={() => lesOmOkonomi(lenkeUrl)}>
                <Normaltekst tag="span">
                    {tekster[lenkeTekstId]}
                </Normaltekst>
                <HoyreChevron/>
            </Lenke>
        </div>
    );
};

export default OkonomiPanel;
