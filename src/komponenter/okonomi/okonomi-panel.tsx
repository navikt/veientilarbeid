import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { lesOmOkonomi } from '../../metrics/metrics';
import './okonomi-panel.less';
import tekster from '../../tekster/tekster';
import { OppfolgingContext } from '../../ducks/oppfolging';

interface OkonomiPanelProps {
    tittelId: string;
    lenkeTekstId: string;
    lenkeUrl: string;
    children: React.ReactNode;
}

const OkonomiPanel = (props: OkonomiPanelProps) => {
    const { tittelId, lenkeTekstId, lenkeUrl, children } = props;
    const servicegruppe = React.useContext(OppfolgingContext).data.servicegruppe;

    const handleClick = () => {
        lesOmOkonomi(lenkeUrl, servicegruppe);
    };

    return (
        <div className="okonomi-panel">
            {children}

            <Systemtittel className="blokk-xs okonomi-panel--tittel">{tekster[tittelId]}</Systemtittel>

            <Lenke href={lenkeUrl} className="okonomi-panel--lenke" onClick={handleClick}>
                <Normaltekst tag="span">{tekster[lenkeTekstId]}</Normaltekst>
                <HoyreChevron />
            </Lenke>
        </div>
    );
};

export default OkonomiPanel;
