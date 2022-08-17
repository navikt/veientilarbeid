export type Profil = {
    aiaHarMottattEgenvurderingKvittering: boolean;
    aiaFeedbackMeldekortForklaring: Feedback;
    aiaFeedbackHjelpOgStotteForklaring: Feedback;
    aiaFeedbackHjelpOgStotteForklaringUngdom: Feedback;
    aiaFeedbackSvarFraRegistreringen: Feedback;
    aiaAvslaattEgenvurdering: Date;
    aiaAvslaattEgenvurderingUke12: Date;
    aiaValgtPengestotteVisning: PengestotteVisning;
};

type PengestotteVisning = 'dagpenger' | 'ytelser';

type Feedback = { updated: Date; valgt: string };
