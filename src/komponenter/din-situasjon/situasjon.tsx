import React, { useContext } from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import LenkepanelBase from 'nav-frontend-lenkepanel';
import { BrukerregistreringContext } from '../../ducks/brukerregistrering';
import { SituasjonContext } from '../../ducks/situasjon';
import getSituasjon from './get-situasjon';
import prettyPrintDato from '../../utils/pretty-print-dato';
import { endresituasjonLenke } from '../../innhold/lenker';
import { uniLogger } from '../../metrics/uni-logger';
import Ikon from './person-med-blyant';
import './situasjon.less';
import { FeaturetoggleContext } from '../../ducks/feature-toggles';

const Situasjon = () => {
    const brukerregistreringData = useContext(BrukerregistreringContext).data;
    const situasjonData = useContext(SituasjonContext).data;
    const featureToggleData = React.useContext(FeaturetoggleContext).data;

    const { registrering } = brukerregistreringData;
    const { besvarelse, opprettetDato } = registrering;
    const { dinSituasjon } = besvarelse;
    const dinSituasjonOrIngenVerdi = dinSituasjon ? dinSituasjon : 'INGEN_VERDI';
    const situasjonsbeskrivelse =
        situasjonData !== null ? situasjonData.svarTekst : getSituasjon(dinSituasjonOrIngenVerdi);
    const situasjonsId = situasjonData !== null ? situasjonData.svarId : dinSituasjonOrIngenVerdi;
    const endretDato = situasjonData !== null ? situasjonData.opprettet : opprettetDato;

    const permittertToggle = featureToggleData ? featureToggleData['veientilarbeid.permittert.ny-dialog'] : false;
    const endreSituasjonToggle = featureToggleData
        ? featureToggleData['veientilarbeid.permittert.situasjon.endre']
        : false;

    const erPermittert = dinSituasjon === 'ER_PERMITTERT' && permittertToggle === true;
    const erPermittertEllerEndret = endreSituasjonToggle && (erPermittert || situasjonData !== null);

    const handleClick = () => {
        uniLogger('endresituasjon.gatil', { situasjonsId });
        window.location.href = endresituasjonLenke;
    };

    React.useEffect(() => {
        if (erPermittertEllerEndret) {
            uniLogger('endresituasjon.visning', { situasjonsId });
        }
    }, [situasjonsId, erPermittertEllerEndret]);

    if (!erPermittertEllerEndret) {
        return null;
    }

    return (
        <LenkepanelBase href={endresituasjonLenke} onClick={handleClick} tittelProps="undertittel" border={true}>
            <div className="lenkepanel__innhold">
                <div className="lenkepanel__ikon">
                    <Ikon />
                </div>
                <div>
                    <Undertittel>Her kan du oppdatere situasjonen din</Undertittel>
                    <Normaltekst>
                        Sist endret {prettyPrintDato(endretDato)}: {situasjonsbeskrivelse}
                    </Normaltekst>
                </div>
            </div>
        </LenkepanelBase>
    );
};

export default Situasjon;
