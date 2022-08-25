export type Profil = {
    aiaHarMottattEgenvurderingKvittering?: boolean;
    aiaFeedbackMeldekortForklaring?: Feedback;
    aiaFeedbackHjelpOgStotteForklaring?: Feedback;
    aiaFeedbackHjelpOgStotteForklaringUngdom?: Feedback;
    aiaFeedbackSvarFraRegistreringen?: Feedback;
    aiaAvslaattEgenvurdering?: string;
    aiaAvslaattEgenvurderingUke12?: string;
    aiaValgtPengestotteVisning?: PengestotteVisning;
    aiaReaktiveringVisning?: JaEllerNei;
};

type PengestotteVisning = 'dagpenger' | 'ytelser';

export type JaEllerNei = { oppdatert: string; valg: 'ja' | 'nei' };

type Feedback = { updated: string; valgt: string };
