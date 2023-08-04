import { Profil } from '../../profil';
import { BesvarelseResponse, useBesvarelse } from '../../contexts/besvarelse';
import { SituasjonSvar } from './veiledning';
import { useProfil } from '../../contexts/profil';
import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { useState } from 'react';
import { loggAktivitet } from '../../metrics/metrics';
import { PermittertSvar } from '../../models/endring-av-situasjon';
import spacing from '../../spacing.module.css';
import { BodyShort, Checkbox, CheckboxGroup, Heading, Loader } from '@navikt/ds-react';
import { dokumentasjon_url } from '../../ducks/urls';

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
        | PermittertSvar.ENDRET_PERMITTERINGSPROSENT
        | PermittertSvar.SAGT_OPP;

    if (
        harSendtInnDokumentasjon ||
        !aktuellSituasjon ||
        ![
            PermittertSvar.OPPSIGELSE,
            PermittertSvar.TILBAKE_TIL_JOBB,
            PermittertSvar.ENDRET_PERMITTERINGSPROSENT,
            PermittertSvar.SAGT_OPP,
        ].includes(aktuellSituasjon)
    ) {
        return null;
    }

    const dokumentasjonMapping = {
        [PermittertSvar.OPPSIGELSE]: 'oppsigelsen',
        [PermittertSvar.TILBAKE_TIL_JOBB]: 'permitteringsvarselet',
        [PermittertSvar.ENDRET_PERMITTERINGSPROSENT]: 'permitteringsvarselet',
        [PermittertSvar.SAGT_OPP]: 'oppsigelsen',
    };

    return (
        <div className={spacing.pa1} style={{ background: 'var(--a-blue-50)' }}>
            <Heading size={'small'}>Dokumentasjon av {dokumentasjonMapping[aktuellSituasjon]}</Heading>
            <BodyShort className={spacing.mb1}>
                Hvis du har et permitteringsvarsel som du enda ikke har sendt oss, må du sende det nå
            </BodyShort>
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
