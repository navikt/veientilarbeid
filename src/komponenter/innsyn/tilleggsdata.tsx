import { BodyShort, Checkbox, CheckboxGroup, Link, Loader } from '@navikt/ds-react';

import { BesvarelseResponse, DinSituasjonTilleggsdata, useBesvarelse } from '../../contexts/besvarelse';
import prettyPrintDato from '../../utils/pretty-print-dato';
import { useProfil } from '../../contexts/profil';
import { useState } from 'react';
import { Profil } from '../../profil';
import { PermittertSvar } from '../../models/endring-av-situasjon';
import { dokumentasjon_url } from '../../ducks/urls';
import { SituasjonSvar } from '../endre-situasjon/veiledning';

interface Props {
    verdi: string | null;
    tilleggsData: DinSituasjonTilleggsdata | null;
    visKnapper?: boolean;
}

interface TilleggsDataProps {
    tilleggsData: DinSituasjonTilleggsdata | null;
}

const harSendtInnNyDokumentasjon = (profil: Profil | null, besvarelse: BesvarelseResponse) => {
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

    const [visSpinner, settVisSpinner] = useState<boolean>(false);
    const harSendtInnDokumentasjon = harSendtInnNyDokumentasjon(profil, besvarelse);

    const onChange = async (val: any[]) => {
        if (val.length > 0) {
            try {
                settVisSpinner(true);
                await lagreProfil({ aiaHarSendtInnDokumentasjonForEndring: new Date().toISOString() });
            } finally {
                settVisSpinner(false);
            }
        }
    };

    if (harSendtInnDokumentasjon) {
        return null;
    }

    const dokumentasjonMapping = {
        [PermittertSvar.OPPSIGELSE]: 'oppsigelsen',
        [PermittertSvar.TILBAKE_TIL_JOBB]: 'permitteringsvarselet',
        [PermittertSvar.ENDRET_PERMITTERINGSPROSENT]: 'permitteringsvarselet',
        [PermittertSvar.SAGT_OPP]: 'oppsigelsen',
    };

    const aktuellSituasjon = props.aktuellSituasjon as
        | PermittertSvar.OPPSIGELSE
        | PermittertSvar.TILBAKE_TIL_JOBB
        | PermittertSvar.ENDRET_PERMITTERINGSPROSENT
        | PermittertSvar.SAGT_OPP;

    return (
        <div>
            <BodyShort>Du må dokumentere {dokumentasjonMapping[aktuellSituasjon]}.</BodyShort>
            <br />
            <a className={'navds-button navds-button--primary'} href={dokumentasjon_url}>
                Gå til opplasting
            </a>
            <br />
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

function TilleggsData(props: Props) {
    const { verdi, tilleggsData, visKnapper } = props;

    const permitteringsprosentMapping: { [key: string]: string } = {
        '100': 'fullt permittert - 100 prosent',
        '75': 'mellom 50 og 100 prosent',
        '50': 'mindre enn 50 prosent',
    };

    const stillingsprosentMapping: { [key: string]: string } = {
        '100': 'fulltid - 100 prosent',
        '75': 'deltid - mellom 50 og 100 prosent',
        '50': 'deltid - mindre enn 50 prosent',
    };

    const harNyJobbMapping: { [key: string]: string } = {
        ja: 'Jeg har ny jobb å gå til',
        nei: 'Jeg har ikke ny jobb å gå til',
    };

    const TILBAKE_TIL_JOBB = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;

        if (!tilleggsData) return null;

        const { forsteArbeidsdagDato, stillingsProsent } = tilleggsData;

        return (
            <>
                <BodyShort>
                    Min første arbeidsdag etter permittering er{' '}
                    {forsteArbeidsdagDato ? prettyPrintDato(forsteArbeidsdagDato) : 'ikke oppgitt dato'}
                </BodyShort>
                {stillingsProsent && (
                    <BodyShort>
                        Jeg skal jobbe {stillingsProsent ? stillingsprosentMapping[stillingsProsent] : 'ikke oppgitt'}
                    </BodyShort>
                )}
                {visKnapper && (
                    <>
                        <br />
                        <BodyShort>
                            Hvis du har et permitteringsvarsel som du enda ikke har sendt oss, må du gjøre det nå.
                        </BodyShort>
                        <BodyShort>
                            <Link href={dokumentasjon_url}>Gå til opplasting</Link>
                        </BodyShort>
                    </>
                )}
            </>
        );
    };

    const OPPSIGELSE = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;
        const { profil } = useProfil();
        const { besvarelse } = useBesvarelse();

        if (!tilleggsData) return null;

        const { oppsigelseDato, sisteArbeidsdagDato, harNyJobb } = tilleggsData;
        const harSendtInnDokumentasjon = harSendtInnNyDokumentasjon(profil, besvarelse);

        return (
            <>
                <BodyShort>
                    Oppsigelsen ble mottatt {oppsigelseDato ? prettyPrintDato(oppsigelseDato) : 'på ikke oppgitt dato'}
                </BodyShort>
                <BodyShort>
                    Siste dag med lønn fra arbeidsgiver er{' '}
                    {sisteArbeidsdagDato ? prettyPrintDato(sisteArbeidsdagDato) : 'ukjent'}
                </BodyShort>
                {harNyJobb && <BodyShort>{harNyJobbMapping[harNyJobb]}</BodyShort>}
                {harSendtInnDokumentasjon && <BodyShort>Jeg har sendt inn dokumentasjon</BodyShort>}
                {visKnapper && <SendInnDokumentasjon aktuellSituasjon={PermittertSvar.OPPSIGELSE} />}
            </>
        );
    };

    const ENDRET_PERMITTERINGSPROSENT = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;
        const { profil } = useProfil();
        const { besvarelse } = useBesvarelse();

        if (!tilleggsData) return null;

        const harSendtInnDokumentasjon = harSendtInnNyDokumentasjon(profil, besvarelse);
        const { permitteringsProsent, gjelderFraDato, permitteringForlenget } = tilleggsData;

        const permitteringErForlenget = permitteringForlenget === 'Ja';

        return (
            <>
                {permitteringErForlenget && (
                    <BodyShort>
                        Permitteringen er forlenget fra{' '}
                        {gjelderFraDato ? prettyPrintDato(gjelderFraDato) : 'ikke oppgitt dato'}
                    </BodyShort>
                )}
                <BodyShort>
                    Permitteringsgraden er{' '}
                    {permitteringsProsent ? `${permitteringsprosentMapping[permitteringsProsent]}` : 'ikke oppgitt'} fra{' '}
                    {gjelderFraDato ? prettyPrintDato(gjelderFraDato) : 'ikke oppgitt dato'}
                </BodyShort>
                {harSendtInnDokumentasjon && <BodyShort>Jeg har sendt inn dokumentasjon</BodyShort>}
                {visKnapper && <SendInnDokumentasjon aktuellSituasjon={PermittertSvar.ENDRET_PERMITTERINGSPROSENT} />}
            </>
        );
    };

    const NY_JOBB = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;

        if (!tilleggsData) return null;

        const { forsteArbeidsdagDato, stillingsProsent } = tilleggsData;

        return (
            <>
                <BodyShort>
                    Min første arbeidsdag i ny jobb er{' '}
                    {forsteArbeidsdagDato ? prettyPrintDato(forsteArbeidsdagDato) : 'ikke oppgitt'}
                </BodyShort>
                <BodyShort>
                    Jeg skal begynne å jobbe{' '}
                    {stillingsProsent ? stillingsprosentMapping[stillingsProsent] : 'ikke oppgitt'}
                </BodyShort>
            </>
        );
    };

    const MIDLERTIDIG_JOBB = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;

        if (!tilleggsData) return null;

        const { forsteArbeidsdagDato, stillingsProsent } = tilleggsData;

        return (
            <>
                <BodyShort>
                    Min første arbeidsdag i ny jobb er{' '}
                    {forsteArbeidsdagDato ? prettyPrintDato(forsteArbeidsdagDato) : 'ikke oppgitt'}
                </BodyShort>
                <BodyShort>
                    Jeg skal begynne å jobbe{' '}
                    {stillingsProsent ? stillingsprosentMapping[stillingsProsent] : 'ikke oppgitt'}
                </BodyShort>
            </>
        );
    };

    const KONKURS = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;

        if (!tilleggsData) return null;

        const { sisteArbeidsdagDato, harNyJobb } = tilleggsData;

        return (
            <>
                <BodyShort>
                    Min siste arbeidsdag er{' '}
                    {sisteArbeidsdagDato ? prettyPrintDato(sisteArbeidsdagDato) : 'ikke oppgitt'}
                </BodyShort>
                {harNyJobb && <BodyShort>{harNyJobbMapping[harNyJobb]}</BodyShort>}
            </>
        );
    };

    const SAGT_OPP = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;
        const { profil } = useProfil();
        const { besvarelse } = useBesvarelse();

        if (!tilleggsData) return null;

        const harSendtInnDokumentasjon = harSendtInnNyDokumentasjon(profil, besvarelse);

        const { oppsigelseDato, sisteArbeidsdagDato, harNyJobb } = tilleggsData;

        return (
            <>
                <BodyShort>
                    Jeg har levert oppsigelse{' '}
                    {oppsigelseDato ? prettyPrintDato(oppsigelseDato) : 'på ikke oppgitt dato'}
                </BodyShort>
                <BodyShort>
                    Siste dag i oppsigelsestiden er{' '}
                    {sisteArbeidsdagDato ? prettyPrintDato(sisteArbeidsdagDato) : 'ikke oppgitt'}
                </BodyShort>
                {harNyJobb && <BodyShort>{harNyJobbMapping[harNyJobb]}</BodyShort>}
                {harSendtInnDokumentasjon && <BodyShort>Jeg har sendt inn dokumentasjon</BodyShort>}
                {visKnapper && <SendInnDokumentasjon aktuellSituasjon={PermittertSvar.SAGT_OPP} />}
            </>
        );
    };

    const ANNET = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;

        if (!tilleggsData) return null;

        const { gjelderFraDato } = tilleggsData;

        return (
            <BodyShort>
                Datoen for endringen er {gjelderFraDato ? prettyPrintDato(gjelderFraDato) : 'ikke oppgitt dato'}
            </BodyShort>
        );
    };

    if (!tilleggsData || !verdi) return null;

    if (verdi === PermittertSvar.OPPSIGELSE) {
        return <OPPSIGELSE tilleggsData={tilleggsData} />;
    } else if (verdi === PermittertSvar.ENDRET_PERMITTERINGSPROSENT) {
        return <ENDRET_PERMITTERINGSPROSENT tilleggsData={tilleggsData} />;
    } else if (verdi === PermittertSvar.TILBAKE_TIL_JOBB) {
        return <TILBAKE_TIL_JOBB tilleggsData={tilleggsData} />;
    } else if (verdi === PermittertSvar.NY_JOBB) {
        return <NY_JOBB tilleggsData={tilleggsData} />;
    } else if (verdi === PermittertSvar.MIDLERTIDIG_JOBB) {
        return <MIDLERTIDIG_JOBB tilleggsData={tilleggsData} />;
    } else if (verdi === PermittertSvar.KONKURS) {
        return <KONKURS tilleggsData={tilleggsData} />;
    } else if (verdi === PermittertSvar.SAGT_OPP) {
        return <SAGT_OPP tilleggsData={tilleggsData} />;
    } else {
        return <ANNET tilleggsData={tilleggsData} />;
    }

    return null;
}

export default TilleggsData;
