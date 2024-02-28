import { useState } from 'react';
import { BodyShort, Checkbox, CheckboxGroup, Heading, Loader } from '@navikt/ds-react';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { useProfil } from '../../contexts/profil';

import { Profil } from '../../profil';
import { BesvarelseResponse, useBesvarelse } from '../../contexts/besvarelse';
import { SituasjonSvar } from './veiledning';
import { loggAktivitet } from '../../metrics/metrics';
import { PermittertSvar } from '../../models/endring-av-situasjon';
import { dokumentasjon_url } from '../../ducks/urls';

import spacing from '../../spacing.module.css';

export const harSendtInnNyDokumentasjon = (profil: Profil | null, besvarelse: BesvarelseResponse) => {
    const harSendtInnDokumentasjon = Boolean(profil?.aiaHarSendtInnDokumentasjonForEndring);
    if (!harSendtInnDokumentasjon) {
        return false;
    }

    if (besvarelse?.erBesvarelsenEndret) {
        const endretDato = new Date(besvarelse.endretTidspunkt!);
        const innsendtDato = new Date(profil?.aiaHarSendtInnDokumentasjonForEndring!);
        return innsendtDato > endretDato;
    }

    return harSendtInnDokumentasjon;
};

export const harSitasjonSomKreverDokumentasjon = (aktuellSituasjon: SituasjonSvar) => {
    return [PermittertSvar.OPPSIGELSE, PermittertSvar.TILBAKE_TIL_JOBB, PermittertSvar.SAGT_OPP].includes(
        aktuellSituasjon as PermittertSvar.OPPSIGELSE | PermittertSvar.TILBAKE_TIL_JOBB | PermittertSvar.SAGT_OPP,
    );
};
const SendInnDokumentasjon = (props: { aktuellSituasjon: SituasjonSvar }) => {
    const { lagreProfil, profil } = useProfil();
    const { besvarelse } = useBesvarelse();
    const { amplitudeData } = useAmplitudeData();

    const [visSpinner, settVisSpinner] = useState<boolean>(false);
    const harSendtInnDokumentasjon = harSendtInnNyDokumentasjon(profil, besvarelse);

    const onChange = async (val: any[]) => {
        if (val.length > 0) {
            try {
                settVisSpinner(true);
                await lagreProfil({ aiaHarSendtInnDokumentasjonForEndring: new Date().toISOString() });
                loggAktivitet({ aktivitet: 'Har sendt inn dokumentasjon', ...amplitudeData });
            } finally {
                settVisSpinner(false);
            }
        }
    };

    const aktuellSituasjon = props.aktuellSituasjon as
        | PermittertSvar.OPPSIGELSE
        | PermittertSvar.TILBAKE_TIL_JOBB
        | PermittertSvar.SAGT_OPP;

    if (harSendtInnDokumentasjon || !aktuellSituasjon || !harSitasjonSomKreverDokumentasjon(aktuellSituasjon)) {
        return null;
    }

    const dokumentasjonMapping = {
        [PermittertSvar.OPPSIGELSE]: 'oppsigelsen',
        [PermittertSvar.TILBAKE_TIL_JOBB]: 'permitteringsvarselet',
        [PermittertSvar.SAGT_OPP]: 'oppsigelsen',
    };

    const dokumentasjonBeskrivelseMapping = {
        [PermittertSvar.OPPSIGELSE]: 'Du må sende oss oppsigelsen du har fått fra arbeidsgiver',
        [PermittertSvar.TILBAKE_TIL_JOBB]:
            'Hvis du har et permitteringsvarsel som du enda ikke har sendt oss, må du sende det nå',
        [PermittertSvar.SAGT_OPP]: 'Du må sende oss dokumentasjon av oppsigelsen du har levert til arbeidsgiveren din',
    };

    return (
        <div className={spacing.pa1} style={{ background: 'var(--a-blue-50)' }}>
            <Heading size={'small'}>Dokumentasjon av {dokumentasjonMapping[aktuellSituasjon]}</Heading>
            <BodyShort className={spacing.mb1}>{dokumentasjonBeskrivelseMapping[aktuellSituasjon]}</BodyShort>
            <a
                className={'navds-button navds-button--primary'}
                href={dokumentasjon_url}
                onClick={() => loggAktivitet({ aktivitet: `Klikker på 'Gå til opplasting'`, ...amplitudeData })}
            >
                Gå til opplasting
            </a>
            <CheckboxGroup legend={''} onChange={onChange} value={harSendtInnDokumentasjon ? ['true'] : undefined}>
                {visSpinner ? (
                    <Loader />
                ) : (
                    <Checkbox disabled={harSendtInnDokumentasjon} value={'true'}>
                        Jeg har sendt inn dokumentasjon
                    </Checkbox>
                )}
            </CheckboxGroup>
        </div>
    );
};

export default SendInnDokumentasjon;
