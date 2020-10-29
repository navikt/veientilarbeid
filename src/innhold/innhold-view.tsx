import * as React from 'react';
import Rad from './rad';
import AapRad from '../komponenter/aap/aap';
import Dialog from '../komponenter/dialog/dialog';
import Banner from '../komponenter/banner/banner';
import Meldekort from '../komponenter/meldekort/meldekort';
import DittSykefravaer from '../komponenter/ditt-sykefravaer/ditt-sykefravaer';
import OkonomiRad from '../komponenter/okonomi/okonomi-rad';
import ReaktiveringMelding from '../komponenter/reaktivering-melding';
import Aktivitetsplan from '../komponenter/aktivitetsplan/aktivitetsplan';
import RessurslenkerJobbsok from '../komponenter/ressurslenker-jobbsok/ressurslenker-jobbsok';
import Egenvurdering from '../komponenter/egenvurdering/egenvurdering';
import Motestotte from '../komponenter/motestotte/motestotte';
import OkonomiRadDagpenger from '../komponenter/okonomi/okonomi-rad-dagpenger';
import './innhold.less';
import KrrMelding from '../komponenter/krr-melding/krr-melding';
import IARBSMelding from '../komponenter/iarbs-melding/iarbs-melding';
import { erMikrofrontend } from '../utils/app-state-utils';
import Registrert from '../komponenter/registrert/registrert';
import Situasjon from '../komponenter/din-situasjon/situasjon';
import { AmplitudeAktivitetsData } from '../metrics/amplitude-utils';

interface OwnProps {
    erSykmeldtMedArbeidsgiver: boolean;
    skalViseKrrMelding: boolean;
    skalViseEgenvurderingLenke: boolean;
    skalViseMotestotteLenke: boolean;
    visRessurslenker: boolean;
    skalViseIARBSPlaster: boolean;
    erPermittert: boolean;
    erPermittertEllerEndret: boolean;
    amplitudeAktivitetsData: AmplitudeAktivitetsData;
}

interface ErSykmeldtMedArbeidsgiverProps {
    erSykmeldtMedArbeidsgiver: boolean;
    amplitudeAktivitetsData: AmplitudeAktivitetsData;
}

const AktivitetDialogMeldekort = ({erSykmeldtMedArbeidsgiver, amplitudeAktivitetsData}: ErSykmeldtMedArbeidsgiverProps) => {
    return (
        <>
            <Aktivitetsplan amplitudeAktivitetsData={amplitudeAktivitetsData} />
                <div className="tokol">
                    <Dialog amplitudeAktivitetsData={amplitudeAktivitetsData} />
                    {erSykmeldtMedArbeidsgiver ? <DittSykefravaer/> : <Meldekort amplitudeAktivitetsData={amplitudeAktivitetsData} />}
                </div>
        </>
    )
}

const InnholdView = ({erSykmeldtMedArbeidsgiver,
                    skalViseKrrMelding,
                    skalViseEgenvurderingLenke,
                    skalViseMotestotteLenke,
                    visRessurslenker,
                    skalViseIARBSPlaster,
                    erPermittertEllerEndret,
                    amplitudeAktivitetsData}: OwnProps) => {
    return (
        <>
            {erMikrofrontend() ? null : (erSykmeldtMedArbeidsgiver ? <Banner type="sykmeldt"/> :
                <Banner type="ordinaer"/>)}

            <Rad>
                <ReaktiveringMelding/>
                {skalViseKrrMelding ? <KrrMelding/> : null}
                {erPermittertEllerEndret && <Situasjon />}
                <Registrert amplitudeAktivitetsData={amplitudeAktivitetsData} />
                {skalViseIARBSPlaster ? <IARBSMelding/> : null}
                {skalViseEgenvurderingLenke ? <Egenvurdering amplitudeAktivitetsData={amplitudeAktivitetsData} /> : null}
                {skalViseMotestotteLenke ? <Motestotte erSykmeldtMedArbeidsgiver={erSykmeldtMedArbeidsgiver}/> : null}
                <AktivitetDialogMeldekort erSykmeldtMedArbeidsgiver={erSykmeldtMedArbeidsgiver} amplitudeAktivitetsData={amplitudeAktivitetsData} />
            </Rad>

            {erSykmeldtMedArbeidsgiver && (
                <Rad><AapRad/></Rad>
            )}

            <Rad>
                {visRessurslenker ? <RessurslenkerJobbsok amplitudeAktivitetsData={amplitudeAktivitetsData} /> : null}
            </Rad>

            { erSykmeldtMedArbeidsgiver ? <Rad><OkonomiRad/></Rad> : <OkonomiRadDagpenger amplitudeAktivitetsData={amplitudeAktivitetsData} />}
        </>
    );
};

export default InnholdView;