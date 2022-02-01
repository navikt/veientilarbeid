import { useContext } from 'react';
import { LinkPanel } from '@navikt/ds-react';

import { loggAktivitet } from '../../metrics/metrics';
import DialogFill from './dialog-fill';
import DialogLine from './dialog-line';
import { dialogLenke } from '../../innhold/lenker';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { UlesteDialogerContext } from '../../contexts/ulestedialoger';
import { UnderOppfolgingContext } from '../../contexts/under-oppfolging';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { OppfolgingContext } from '../../contexts/oppfolging';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { kanViseOnboarding14A } from '../../lib/kan-vise-onboarding14a';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

import './dialog.less';

const TEKSTER = {
    nb: {
        tittel: 'Dialog med veilederen din',
        sendMelding: 'Send melding hvis du lurer på noe',
        ulest: 'ulest melding',
        uleste: 'uleste meldinger',
    },
    en: {
        tittel: 'Start a dialogue',
        sendMelding: 'Get in touch if you have questions',
        ulest: 'unread message',
        uleste: 'unread messages',
    },
};

const Dialog = () => {
    const amplitudeData = useAmplitudeData();
    const ulesteDialoger = useContext(UlesteDialogerContext).data;
    const { underOppfolging } = useContext(UnderOppfolgingContext).data;
    const registreringData = useBrukerregistreringData();
    const { data: oppfolgingData } = useContext(OppfolgingContext);
    const brukerInfoData = useBrukerinfoData();
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    const ser14aStatus = kanViseOnboarding14A({
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

    const byggDialogTekst = () => {
        switch (antallUleste) {
            case 0:
                return tekst('sendMelding');
            case 1:
                return `${antallUleste.toString()} ${tekst('ulest')}`;
            default:
                return `${antallUleste.toString()} ${tekst('uleste')}`;
        }
    };

    return !kanViseKomponent ? null : (
        <LinkPanel href={dialogLenke} className="dialog blokk-xs" onClick={handleClick}>
            <div
                style={{
                    display: 'grid',
                    gridAutoFlow: 'column',
                    gap: 'var(--navds-spacing-8)',
                    alignItems: 'center',
                }}
            >
                <div className="lenkepanel__ikon">
                    {antallUleste > 0 ? <DialogFill messagesCount={antallUleste} /> : <DialogLine />}
                </div>
                <div>
                    <LinkPanel.Title>{tekst('tittel')}</LinkPanel.Title>
                    <LinkPanel.Description>{byggDialogTekst()}</LinkPanel.Description>
                </div>
            </div>
        </LinkPanel>
    );
};

export default Dialog;
