import { useContext } from 'react';
import LenkepanelBase from 'nav-frontend-lenkepanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { loggAktivitet } from '../../metrics/metrics';
import DialogFill from './dialog-fill';
import DialogLine from './dialog-line';
import './dialog.less';
import { dialogLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { UlesteDialogerContext } from '../../contexts/ulestedialoger';
import { UnderOppfolgingContext } from '../../contexts/under-oppfolging';
import { FeaturetoggleContext } from '../../contexts/feature-toggles';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { OppfolgingContext } from '../../contexts/oppfolging';
import * as Brukerregistrering from '../../contexts/brukerregistrering';
import { kanViseOnboarding14A } from '../../lib/kan-vise-onboarding14a';

const Dialog = () => {
    const amplitudeData = useAmplitudeData();
    const ulesteDialoger = useContext(UlesteDialogerContext).data;
    const { data: featuretoggleData } = useContext(FeaturetoggleContext);
    const { underOppfolging } = useContext(UnderOppfolgingContext).data;
    const { data: registreringData } = useContext(Brukerregistrering.BrukerregistreringContext);
    const { data: oppfolgingData } = useContext(OppfolgingContext);
    const brukerInfoData = useBrukerinfoData();
    const ser14aStatus = kanViseOnboarding14A({
        featuretoggleData,
        oppfolgingData,
        brukerInfoData,
        registreringData,
    });

    const kanViseKomponent = underOppfolging && !ser14aStatus;

    const { antallUleste } = ulesteDialoger;

    const handleClick = () => {
        if (antallUleste > 0) {
            loggAktivitet({ aktivitet: 'Svarer på dialog', ...amplitudeData });
        } else {
            loggAktivitet({ aktivitet: 'Innleder dialog', ...amplitudeData });
        }
    };

    const linkCreator = (props: {}) => {
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        return <a onClick={handleClick} {...props} />;
    };

    const byggDialogTekst = () => {
        switch (antallUleste) {
            case 0:
                return 'Send melding hvis du lurer på noe';
            case 1:
                return antallUleste.toString() + ' ulest melding';
            default:
                return antallUleste.toString() + ' uleste meldinger';
        }
    };

    return !kanViseKomponent ? null : (
        <LenkepanelBase
            href={dialogLenke}
            tittelProps="undertittel"
            linkCreator={linkCreator}
            border={true}
            className="dialog"
        >
            <div className="lenkepanel__innhold">
                <div className="lenkepanel__ikon">
                    {antallUleste > 0 ? <DialogFill messagesCount={antallUleste} /> : <DialogLine />}
                </div>
                <div className="lenkepanel__tekst">
                    <Undertittel>{tekster['dialog']}</Undertittel>
                    <Normaltekst className="lenkepanel__ingress">{byggDialogTekst()}</Normaltekst>
                </div>
            </div>
        </LenkepanelBase>
    );
};

export default Dialog;
