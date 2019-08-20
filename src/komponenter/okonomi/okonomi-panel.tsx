import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { lesOmOkonomi } from '../../metrics/metrics';
import './okonomi-panel.less';
import tekster from '../../tekster/tekster';
import { AppState } from '../../reducer';
import { ServicegruppeOrNull } from '../../ducks/oppfolging';
import { connect } from 'react-redux';

interface OkonomiPanelProps {
    tittelId: string;
    lenkeTekstId: string;
    lenkeUrl: string;
    children: React.ReactNode;
}

interface StateProps {
    servicegruppe: ServicegruppeOrNull;
}

type AllProps = OkonomiPanelProps & StateProps;

const OkonomiPanel = (props: AllProps) => {
    const {tittelId, lenkeTekstId, lenkeUrl, children, servicegruppe} = props;

    const handleClick = () => {
        lesOmOkonomi(lenkeUrl, servicegruppe);
    };

    return (
        <div className="okonomi-panel">
            {children}

            <Systemtittel className="blokk-xs okonomi-panel--tittel">
                {tekster[tittelId]}
            </Systemtittel>

            <Lenke href={lenkeUrl} className="okonomi-panel--lenke" onClick={handleClick}>
                <Normaltekst tag="span">
                    {tekster[lenkeTekstId]}
                </Normaltekst>
                <HoyreChevron/>
            </Lenke>
        </div>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    servicegruppe: state.oppfolging.data.servicegruppe,
});

export default connect(mapStateToProps)(OkonomiPanel);
