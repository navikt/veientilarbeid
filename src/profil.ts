export type Profil = {
    aiaFeedbackMeldekortForklaring?: Feedback;
    aiaFeedbackHjelpOgStotteForklaring?: Feedback;
    aiaFeedbackHjelpOgStotteForklaringUngdom?: Feedback;
    aiaFeedbackSvarFraRegistreringen?: Feedback;
    aiaAvslaattEgenvurdering?: string;
    aiaAvslaattEgenvurderingUke12?: string;
    aiaValgtPengestotteVisning?: PengestotteVisning;
    aiaReaktiveringVisning?: JaEllerNei;
    aiaHarSendtInnDokumentasjonForEndring?: string;
};

type PengestotteVisning = 'dagpenger' | 'ytelser';

export type JaEllerNei = { oppdatert: string; valg: 'ja' | 'nei' };

type Feedback = { updated: string; valgt: string };
