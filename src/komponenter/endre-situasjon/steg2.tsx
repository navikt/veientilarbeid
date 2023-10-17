import React, { useState } from 'react';
import {
    Alert,
    BodyShort,
    Button,
    ConfirmationPanel,
    DatePicker,
    HelpText,
    Radio,
    RadioGroup,
    Textarea,
    useDatepicker,
} from '@navikt/ds-react';

import { BesvarelseRequest, useBesvarelse } from '../../contexts/besvarelse';

import { loggAktivitet } from '../../metrics/metrics';
import { dinSituasjonSvarTekster, PermittertSvar, permittertTekster } from '../../models/endring-av-situasjon';
import { svarMap } from '../../models/sporsmal-og-svar';
import prettyPrintDato from '../../utils/pretty-print-dato';

import spacing from '../../spacing.module.css';
import flex from '../../flex.module.css';
import { DinSituasjonSvar } from '../../hooks/use-brukerregistrering-data';

type SituasjonSvar = PermittertSvar | DinSituasjonSvar;

export interface Steg2Props {
    valgtSituasjon: SituasjonSvar;
    opprinneligSituasjon: SituasjonSvar | undefined;
    settValgtSituasjon: React.Dispatch<React.SetStateAction<SituasjonSvar>>;
    settTilleggsData: React.Dispatch<React.SetStateAction<any>>;
    onClick: () => void;
    amplitudeData: any;
}

const Feil = (props: { feil: string | null }) => {
    if (!props.feil) {
        return null;
    }
    return (
        <Alert variant={'error'} className={spacing.mb1}>
            Noe gikk dessverre galt. Prøv igjen.
        </Alert>
    );
};

const OpplysningeneBrukesTil = () => {
    return (
        <BodyShort className={spacing.mb1}>NAV bruker opplysningene for å kunne tilpasse veiledningen din</BodyShort>
    );
};

const situasjonerMedOppgaver = [
    PermittertSvar.TILBAKE_TIL_JOBB,
    PermittertSvar.MIDLERTIDIG_JOBB,
    PermittertSvar.KONKURS,
    PermittertSvar.NY_JOBB,
    PermittertSvar.OPPSIGELSE,
    PermittertSvar.SAGT_OPP,
] as SituasjonSvar[];

function genererOppgaveBeskrivelse(
    valgtSituasjon: SituasjonSvar,
    opprinneligSituasjon: SituasjonSvar | undefined,
    tilleggsData?: any,
    merOmSituasjonenMin?: string,
): string | undefined {
    if (situasjonerMedOppgaver.includes(valgtSituasjon)) {
        return genererDialogTekst(valgtSituasjon, opprinneligSituasjon, tilleggsData, merOmSituasjonenMin).tekst;
    }

    return undefined;
}

function genererDialogTekst(
    valgtSituasjon: SituasjonSvar,
    opprinneligSituasjon: SituasjonSvar | undefined,
    tilleggsData?: any,
    merOmSituasjonenMin?: any,
) {
    const harEndretSituasjonTilAnnet = valgtSituasjon === PermittertSvar.ANNET;
    const skalVentePaaSvarFraNAV = tilleggsData?.harNyJobb === 'nei' || harEndretSituasjonTilAnnet;

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

    const tekstArray = [];

    tekstArray.push(`Jobbsituasjonen er endret til "${svarMap.dinSituasjon[valgtSituasjon]}".`);

    if (tilleggsData) {
        tekstArray.push('Tilleggsopplysninger: \n\n');
        const {
            oppsigelseDato,
            sisteArbeidsdagDato,
            permitteringsProsent,
            permitteringForlenget,
            gjelderFraDato,
            forsteArbeidsdagDato,
            stillingsProsent,
            harNyJobb,
        } = tilleggsData;
        if (valgtSituasjon === PermittertSvar.OPPSIGELSE) {
            tekstArray.push(
                `Oppsigelsen ble mottatt ${oppsigelseDato ? prettyPrintDato(oppsigelseDato) : 'på ikke oppgitt dato'}`,
            );
            tekstArray.push(
                `Siste dag med lønn fra arbeidsgiver er ${
                    sisteArbeidsdagDato ? prettyPrintDato(sisteArbeidsdagDato) : 'er ukjent'
                }`,
            );
            if (harNyJobb) {
                tekstArray.push(harNyJobbMapping[harNyJobb]);
            }
        } else if (valgtSituasjon === PermittertSvar.ENDRET_PERMITTERINGSPROSENT) {
            const permitteringErForlenget = permitteringForlenget === 'Ja';
            if (permitteringErForlenget) {
                tekstArray.push(
                    `Permitteringen er forlenget fra ${
                        gjelderFraDato ? prettyPrintDato(gjelderFraDato) : 'ikke oppgitt dato'
                    }`,
                );
            }
            tekstArray.push(
                `Permitteringsgraden er ${
                    permitteringsProsent ? permitteringsprosentMapping[permitteringsProsent] : 'er ikke oppgitt'
                } fra ${gjelderFraDato ? prettyPrintDato(gjelderFraDato) : 'ikke oppgitt dato'}`,
            );
        } else if (valgtSituasjon === PermittertSvar.TILBAKE_TIL_JOBB) {
            tekstArray.push(
                `Min første arbeidsdag etter permittering er ${
                    forsteArbeidsdagDato ? prettyPrintDato(forsteArbeidsdagDato) : 'ikke oppgitt dato'
                }`,
            );
            tekstArray.push(`Jeg skal jobbe
            ${stillingsProsent ? stillingsprosentMapping[stillingsProsent] : 'ikke oppgitt'}`);
        } else if (valgtSituasjon === PermittertSvar.NY_JOBB) {
            tekstArray.push(
                `Første arbeidsdag i ny jobb er ${
                    forsteArbeidsdagDato ? prettyPrintDato(forsteArbeidsdagDato) : 'ikke oppgitt'
                }`,
            );
            tekstArray.push(`Jeg skal begynne å jobbe
            ${stillingsProsent ? stillingsprosentMapping[stillingsProsent] : 'ikke oppgitt'}`);
        } else if (valgtSituasjon === PermittertSvar.MIDLERTIDIG_JOBB) {
            tekstArray.push(
                `Første arbeidsdag i ny jobb er ${
                    forsteArbeidsdagDato ? prettyPrintDato(forsteArbeidsdagDato) : 'ikke oppgitt'
                }`,
            );
            tekstArray.push(`Jeg skal begynne å jobbe
            ${stillingsProsent ? stillingsprosentMapping[stillingsProsent] : 'ikke oppgitt'}`);
        } else if (valgtSituasjon === PermittertSvar.KONKURS) {
            tekstArray.push(
                `Min siste arbeidsdag er ${
                    sisteArbeidsdagDato ? prettyPrintDato(sisteArbeidsdagDato) : 'ikke oppgitt'
                }`,
            );
            if (harNyJobb) {
                tekstArray.push(harNyJobbMapping[harNyJobb]);
            }
        } else if (valgtSituasjon === PermittertSvar.SAGT_OPP) {
            tekstArray.push(
                `Jeg leverte oppsigelsen ${oppsigelseDato ? prettyPrintDato(oppsigelseDato) : 'på ikke oppgitt dato'}`,
            );
            tekstArray.push(
                `Siste arbeidsdag med lønn er ${
                    sisteArbeidsdagDato ? prettyPrintDato(sisteArbeidsdagDato) : 'ikke oppgitt'
                }`,
            );
            if (harNyJobb) {
                tekstArray.push(harNyJobbMapping[harNyJobb]);
            }
            if (harNyJobb && harNyJobb === 'ja' && forsteArbeidsdagDato) {
                tekstArray.push(`Min første arbeidsdag i ny jobb er ${prettyPrintDato(forsteArbeidsdagDato)}`);
            }
        } else if (valgtSituasjon === PermittertSvar.ANNET) {
            if (merOmSituasjonenMin) {
                tekstArray.push(`Mer om situasjonen min:\n${merOmSituasjonenMin}`);
            }
        } else {
            tekstArray.push(
                `Endringen gjelder fra ${gjelderFraDato ? prettyPrintDato(gjelderFraDato) : 'ikke oppgitt dato'}`,
            );
        }

        if (opprinneligSituasjon) {
            tekstArray.push(`Jobbsituasjonen er endret fra "${svarMap.dinSituasjon[opprinneligSituasjon]}".`);
        }

        tekstArray.push('\n\nDenne meldingen er generert utfra svarene som ble oppgitt da jobbsituasjonen ble endret');
    }

    return {
        tekst: tekstArray.join('\n\n'),
        overskrift: 'Jobbsituasjonen min er endret',
        venterPaaSvarFraNav: skalVentePaaSvarFraNAV,
    };
}

function useLagreEndringer(props: Steg2Props) {
    const { lagreBesvarelse } = useBesvarelse();
    const { amplitudeData, onClick, settTilleggsData } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const [feil, settFeil] = useState<string | null>(null);

    const handleLagreEndringer = async (
        valgtSituasjon?: any,
        opprinneligSituasjon?: any,
        tilleggsData?: any,
        merOmSituasjonenMin?: string,
    ) => {
        // Gjør om dato fra datepicker til date string
        if (tilleggsData) {
            Object.keys(tilleggsData).forEach((key) => {
                const data = tilleggsData[key];
                if (data instanceof Date) {
                    tilleggsData[key] = new Date(data.getTime() - data.getTimezoneOffset() * 60 * 1000)
                        .toISOString()
                        .substring(0, 10);
                }
            });
        }
        try {
            settFeil(null);
            setLoading(true);

            loggAktivitet({
                aktivitet: 'Lagrer endring i jobbsituasjonen',
                komponent: 'Min situasjon',
                ...amplitudeData,
            });

            const { tekst, overskrift, venterPaaSvarFraNav } = genererDialogTekst(
                valgtSituasjon,
                opprinneligSituasjon,
                tilleggsData,
                merOmSituasjonenMin,
            );

            const oppgaveBeskrivelse = genererOppgaveBeskrivelse(
                valgtSituasjon,
                opprinneligSituasjon,
                tilleggsData,
                merOmSituasjonenMin,
            );

            const payload = {
                tekst,
                overskrift,
                oppgaveBeskrivelse,
                venterPaaSvarFraNav,
                valgtSituasjon,
                oppdatering: {
                    dinSituasjon: {
                        verdi: valgtSituasjon as any,
                        tilleggsData,
                    },
                },
            } as BesvarelseRequest;
            await lagreBesvarelse(payload);
            settTilleggsData(tilleggsData);
            onClick();
        } catch (error: any) {
            settFeil(error.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        handleLagreEndringer,
        feil,
        loading,
    };
}

interface WrapperProps {
    valgtSituasjon: SituasjonSvar;
    children: React.ReactElement<any>;
}

const Steg2Wrapper = (props: WrapperProps) => {
    const headingTekst =
        permittertTekster[props.valgtSituasjon as PermittertSvar] ||
        dinSituasjonSvarTekster[props.valgtSituasjon as DinSituasjonSvar];

    return (
        <>
            <BodyShort>
                <b>Valgt situasjon</b>
            </BodyShort>
            <BodyShort className={spacing.mb1}>{headingTekst}</BodyShort>
            {props.children}
        </>
    );
};

const TILBAKE_TIL_JOBB = (props: Steg2Props) => {
    const {
        datepickerProps: forsteArbeidsdagProps,
        inputProps: forsteArbeidsdagInput,
        selectedDay: forsteArbeidsdagDato,
    } = useDatepicker({
        fromDate: new Date('Jan 01 2022'),
    });

    const [stillingsProsent, settStillingsProsent] = useState<string>();

    const { feil, loading, handleLagreEndringer } = useLagreEndringer(props);
    const disabled = !stillingsProsent || !forsteArbeidsdagDato || loading;

    const tilleggsData = {
        forsteArbeidsdagDato,
        stillingsProsent,
    };

    return (
        <Steg2Wrapper valgtSituasjon={props.valgtSituasjon}>
            <>
                <DatePicker {...forsteArbeidsdagProps} strategy="fixed">
                    <DatePicker.Input
                        {...forsteArbeidsdagInput}
                        className={spacing.mb1}
                        label="Når er første arbeidsdag etter permittering?"
                    />
                </DatePicker>

                <RadioGroup
                    legend="Hvor mye skal du jobbe?"
                    onChange={(value) => {
                        settStillingsProsent(value);
                    }}
                >
                    <Radio value="100">Fulltid - 100 prosent</Radio>
                    <Radio value="75">Mellom 50 og 100 prosent</Radio>
                    <Radio value="50">Mindre enn 50 prosent</Radio>
                </RadioGroup>

                <OpplysningeneBrukesTil />
                <Feil feil={feil} />
                <div className={`${flex.flex} ${flex.flexEnd}`}>
                    <Button
                        variant={'primary'}
                        onClick={() =>
                            handleLagreEndringer(props.valgtSituasjon, props.opprinneligSituasjon, tilleggsData)
                        }
                        loading={loading}
                        disabled={disabled}
                    >
                        Lagre endring i situasjon
                    </Button>
                </div>
            </>
        </Steg2Wrapper>
    );
};

const OPPSIGELSE = (props: Steg2Props) => {
    const {
        datepickerProps: oppsigelseProps,
        inputProps: oppsigelseInput,
        selectedDay: oppsigelseDato,
    } = useDatepicker({
        fromDate: new Date('Jan 01 2022'),
    });

    const {
        datepickerProps: sisteArbeidsdagProps,
        inputProps: sisteArbeidsdagInput,
        selectedDay: sisteArbeidsdagDato,
    } = useDatepicker({
        fromDate: new Date('Jan 01 2022'),
    });

    const [harNyJobb, settHarNyJobb] = useState<string>();
    const [erBekreftet, settErBekreftet] = useState<boolean>(false);

    const { feil, loading, handleLagreEndringer } = useLagreEndringer(props);
    const disabled = !harNyJobb || !oppsigelseDato || !sisteArbeidsdagDato || loading || !erBekreftet;

    const tilleggsData = {
        oppsigelseDato,
        sisteArbeidsdagDato,
        harNyJobb,
    };

    return (
        <Steg2Wrapper valgtSituasjon={props.valgtSituasjon}>
            <>
                <DatePicker {...oppsigelseProps} strategy="fixed">
                    <DatePicker.Input
                        {...oppsigelseInput}
                        className={spacing.mb1}
                        label={
                            <div className={flex.flex}>
                                Når fikk du oppsigelsen?
                                <HelpText className={spacing.ml05}>
                                    Datoen du fikk skriftlig oppsigelse fra arbeidsgiver.
                                </HelpText>
                            </div>
                        }
                    />
                </DatePicker>

                <DatePicker {...sisteArbeidsdagProps} strategy="fixed">
                    <DatePicker.Input
                        {...sisteArbeidsdagInput}
                        className={spacing.mb1}
                        label={
                            <div className={flex.flex}>
                                Når er din siste dag med lønn fra arbeidsgiver?
                                <HelpText className={spacing.ml05}>
                                    Den datoen oppsigelsestiden er over og du ikke lenger mottar lønn fra arbeidsgiver.
                                </HelpText>
                            </div>
                        }
                    />
                </DatePicker>

                <RadioGroup
                    legend="Har du ny jobb?"
                    onChange={(value) => {
                        settHarNyJobb(value);
                    }}
                >
                    <Radio value="ja">Ja, jeg har ny jobb å gå til</Radio>
                    <Radio value="nei">Nei, jeg har ikke ny jobb</Radio>
                </RadioGroup>

                <OpplysningeneBrukesTil />
                <ConfirmationPanel
                    className={spacing.mb1}
                    checked={erBekreftet}
                    onChange={() => settErBekreftet((c) => !c)}
                    label={
                        <>
                            Jeg forstår at arbeidsgiver har lønnsplikt fra oppsigelsesdato, og at jeg må søke om
                            dagpenger på nytt etter oppsigelsestid.
                        </>
                    }
                ></ConfirmationPanel>
                <Feil feil={feil} />
                <div className={`${flex.flex} ${flex.flexEnd}`}>
                    <Button
                        variant={'primary'}
                        loading={loading}
                        disabled={disabled}
                        onClick={() =>
                            handleLagreEndringer(props.valgtSituasjon, props.opprinneligSituasjon, tilleggsData)
                        }
                    >
                        Lagre endring i situasjon
                    </Button>
                </div>
            </>
        </Steg2Wrapper>
    );
};

const ENDRET_PERMITTERINGSPROSENT = (props: Steg2Props) => {
    const {
        datepickerProps: gjelderFraDatoProps,
        inputProps: gjelderFraDatoInput,
        selectedDay: gjelderFraDato,
    } = useDatepicker({
        fromDate: new Date('Jan 01 2022'),
    });
    const [permitteringsProsent, settPermitteringsProsent] = useState<string>();
    const [permitteringForlenget, settPermitteringForlenget] = useState<string>();

    const { feil, loading, handleLagreEndringer } = useLagreEndringer(props);
    const disabled = !permitteringsProsent || !permitteringForlenget || !gjelderFraDato || loading;

    const tilleggsData = {
        permitteringsProsent,
        permitteringForlenget,
        gjelderFraDato,
    };

    return (
        <Steg2Wrapper valgtSituasjon={props.valgtSituasjon}>
            <>
                <DatePicker {...gjelderFraDatoProps} strategy="fixed">
                    <DatePicker.Input
                        {...gjelderFraDatoInput}
                        className={spacing.mb1}
                        label={
                            <div className={flex.flex}>
                                Fra hvilken dato gjelder endringen?
                                <HelpText className={spacing.ml05}>
                                    Datoen endringen trer i kraft i følge permitteringsvarselet.
                                </HelpText>
                            </div>
                        }
                    />
                </DatePicker>

                <RadioGroup
                    legend="I hvor stor grad er du permittert?"
                    onChange={(value) => {
                        settPermitteringsProsent(value);
                    }}
                >
                    <Radio value="100">Fullt permittert - 100 prosent</Radio>
                    <Radio value="75">Mellom 50 og 100 prosent</Radio>
                    <Radio value="50">Mindre enn 50 prosent</Radio>
                </RadioGroup>

                <RadioGroup
                    legend="Er endringen en forlengelse av permitteringen?"
                    onChange={(value) => {
                        settPermitteringForlenget(value);
                    }}
                >
                    <Radio value="Ja">Ja</Radio>
                    <Radio value="Nei">Nei</Radio>
                </RadioGroup>

                <OpplysningeneBrukesTil />

                <Feil feil={feil} />

                <div className={`${flex.flex} ${flex.flexEnd}`}>
                    <Button
                        variant={'primary'}
                        onClick={() =>
                            handleLagreEndringer(props.valgtSituasjon, props.opprinneligSituasjon, tilleggsData)
                        }
                        loading={loading}
                        disabled={disabled}
                    >
                        Lagre endring i situasjon
                    </Button>
                </div>
            </>
        </Steg2Wrapper>
    );
};

const NY_JOBB = (props: Steg2Props) => {
    const {
        datepickerProps: forsteArbeidsdagProps,
        inputProps: forsteArbeidsdagInput,
        selectedDay: forsteArbeidsdagDato,
    } = useDatepicker({
        fromDate: new Date('Jan 01 2022'),
    });

    const [stillingsProsent, settStillingsProsent] = useState<string>();

    const { feil, loading, handleLagreEndringer } = useLagreEndringer(props);

    const disabled = !stillingsProsent || !forsteArbeidsdagDato || loading;

    const tilleggsData = {
        forsteArbeidsdagDato,
        stillingsProsent,
    };

    return (
        <Steg2Wrapper valgtSituasjon={props.valgtSituasjon}>
            <>
                <DatePicker {...forsteArbeidsdagProps} strategy="fixed">
                    <DatePicker.Input
                        {...forsteArbeidsdagInput}
                        className={spacing.mb1}
                        label="Når er første dag i ny jobb?"
                    />
                </DatePicker>

                <RadioGroup
                    legend="Hvor mye skal du jobbe?"
                    onChange={(value) => {
                        settStillingsProsent(value);
                    }}
                >
                    <Radio value="100">Fulltid - 100 prosent</Radio>
                    <Radio value="75">Mellom 50 og 100 prosent</Radio>
                    <Radio value="50">Mindre enn 50 prosent</Radio>
                </RadioGroup>

                <OpplysningeneBrukesTil />
                <Feil feil={feil} />
                <div className={`${flex.flex} ${flex.flexEnd}`}>
                    <Button
                        variant={'primary'}
                        onClick={() =>
                            handleLagreEndringer(props.valgtSituasjon, props.opprinneligSituasjon, tilleggsData)
                        }
                        loading={loading}
                        disabled={disabled}
                    >
                        Lagre endring i situasjon
                    </Button>
                </div>
            </>
        </Steg2Wrapper>
    );
};

const MIDLERTIDIG_JOBB = (props: Steg2Props) => {
    const {
        datepickerProps: forsteArbeidsdagProps,
        inputProps: forsteArbeidsdagInput,
        selectedDay: forsteArbeidsdagDato,
    } = useDatepicker({
        fromDate: new Date('Jan 01 2022'),
    });

    const [stillingsProsent, settStillingsProsent] = useState<string>();

    const { feil, loading, handleLagreEndringer } = useLagreEndringer(props);

    const disabled = !stillingsProsent || !forsteArbeidsdagDato || loading;

    const tilleggsData = {
        forsteArbeidsdagDato,
        stillingsProsent,
    };

    return (
        <Steg2Wrapper valgtSituasjon={props.valgtSituasjon}>
            <>
                <DatePicker {...forsteArbeidsdagProps} strategy="fixed">
                    <DatePicker.Input
                        {...forsteArbeidsdagInput}
                        className={spacing.mb1}
                        label="Når er første dag i ny jobb?"
                    />
                </DatePicker>

                <RadioGroup
                    legend="Hvor mye skal du jobbe?"
                    onChange={(value) => {
                        settStillingsProsent(value);
                    }}
                >
                    <Radio value="100">Fulltid - 100 prosent</Radio>
                    <Radio value="75">Mellom 50 og 100 prosent</Radio>
                    <Radio value="50">Mindre enn 50 prosent</Radio>
                </RadioGroup>

                <OpplysningeneBrukesTil />
                <Feil feil={feil} />
                <div className={`${flex.flex} ${flex.flexEnd}`}>
                    <Button
                        variant={'primary'}
                        onClick={() =>
                            handleLagreEndringer(props.valgtSituasjon, props.opprinneligSituasjon, tilleggsData)
                        }
                        loading={loading}
                        disabled={disabled}
                    >
                        Lagre endring i situasjon
                    </Button>
                </div>
            </>
        </Steg2Wrapper>
    );
};

const KONKURS = (props: Steg2Props) => {
    const {
        datepickerProps: sisteArbeidsdagProps,
        inputProps: sisteArbeidsdagInput,
        selectedDay: sisteArbeidsdagDato,
    } = useDatepicker({
        fromDate: new Date('Jan 01 2022'),
    });

    const [harNyJobb, settHarNyJobb] = useState<string>();
    const [erBekreftet, settErBekreftet] = useState<boolean>(false);
    const { feil, loading, handleLagreEndringer } = useLagreEndringer(props);
    const disabled = !harNyJobb || !sisteArbeidsdagDato || loading || !erBekreftet;

    const tilleggsData = {
        sisteArbeidsdagDato,
        harNyJobb,
    };

    return (
        <Steg2Wrapper valgtSituasjon={props.valgtSituasjon}>
            <>
                <DatePicker {...sisteArbeidsdagProps} strategy="fixed">
                    <DatePicker.Input
                        {...sisteArbeidsdagInput}
                        className={spacing.mb1}
                        label="Når er siste arbeidsdag?"
                    />
                </DatePicker>

                <RadioGroup
                    legend="Har du ny jobb?"
                    onChange={(value) => {
                        settHarNyJobb(value);
                    }}
                >
                    <Radio value="ja">Ja, jeg har ny jobb å gå til</Radio>
                    <Radio value="nei">Nei, jeg har ikke ny jobb</Radio>
                </RadioGroup>

                <OpplysningeneBrukesTil />
                <Alert variant="info" className={spacing.mb1}>
                    Når du mistet jobben fordi arbeidsgiveren din er konkurs, kan du få forskudd på lønnsgarantimidler i
                    form av dagpenger i inntil en måned. Lønnsgarantimidler skal dekke lønn, feriepenger og eventuelt
                    andre betalinger som arbeidsgiveren din skylder deg.
                </Alert>
                <ConfirmationPanel
                    className={spacing.mb1}
                    checked={erBekreftet}
                    onChange={() => settErBekreftet((c) => !c)}
                    label={
                        <>
                            Jeg forstår at jeg ikke lenger er permittert når arbeidsgiveren min har gått konkurs og at
                            jeg kan søke om forskudd på lønnsgarantimidler fra NAV.
                        </>
                    }
                ></ConfirmationPanel>
                <Feil feil={feil} />
                <div className={`${flex.flex} ${flex.flexEnd}`}>
                    <Button
                        variant={'primary'}
                        onClick={() =>
                            handleLagreEndringer(props.valgtSituasjon, props.opprinneligSituasjon, tilleggsData)
                        }
                        loading={loading}
                        disabled={disabled}
                    >
                        Lagre endring i situasjon
                    </Button>
                </div>
            </>
        </Steg2Wrapper>
    );
};

const SAGT_OPP = (props: Steg2Props) => {
    const {
        datepickerProps: oppsigelseProps,
        inputProps: oppsigelseInput,
        selectedDay: oppsigelseDato,
    } = useDatepicker({
        fromDate: new Date('Jan 01 2022'),
    });

    const {
        datepickerProps: sisteArbeidsdagProps,
        inputProps: sisteArbeidsdagInput,
        selectedDay: sisteArbeidsdagDato,
    } = useDatepicker({
        fromDate: new Date('Jan 01 2022'),
    });

    const {
        datepickerProps: forsteArbeidsdagProps,
        inputProps: forsteArbeidsdagInput,
        selectedDay: forsteArbeidsdagDato,
    } = useDatepicker({
        fromDate: new Date('Jan 01 2022'),
    });

    const [harNyJobb, settHarNyJobb] = useState<string>();
    const [erBekreftet, settErBekreftet] = useState<boolean>(false);

    const { feil, loading, handleLagreEndringer } = useLagreEndringer(props);
    const disabled =
        !harNyJobb ||
        !oppsigelseDato ||
        !sisteArbeidsdagDato ||
        loading ||
        !erBekreftet ||
        (harNyJobb === 'ja' && !forsteArbeidsdagDato);

    const tilleggsData = {
        oppsigelseDato,
        sisteArbeidsdagDato,
        forsteArbeidsdagDato,
        harNyJobb,
    };

    return (
        <Steg2Wrapper valgtSituasjon={props.valgtSituasjon}>
            <>
                <DatePicker {...oppsigelseProps} strategy="fixed">
                    <DatePicker.Input
                        {...oppsigelseInput}
                        className={spacing.mb1}
                        label={<div className={flex.flex}>Fra hvilken dato har du sagt opp stillingen din?</div>}
                    />
                </DatePicker>

                <DatePicker {...sisteArbeidsdagProps} strategy="fixed">
                    <DatePicker.Input
                        {...sisteArbeidsdagInput}
                        className={spacing.mb1}
                        label={
                            <div className={flex.flex}>
                                Når er siste arbeidsdag der arbeidsgiver betaler lønn?
                                <HelpText className={spacing.ml05}>Siste dag i oppsigelsestiden.</HelpText>
                            </div>
                        }
                    />
                </DatePicker>

                <RadioGroup
                    legend="Har du ny jobb?"
                    onChange={(value) => {
                        settHarNyJobb(value);
                    }}
                >
                    <Radio value="ja">Ja, jeg har ny jobb å gå til</Radio>
                    <Radio value="nei">Nei, jeg har ikke ny jobb</Radio>
                </RadioGroup>

                {harNyJobb === 'ja' && (
                    <DatePicker {...forsteArbeidsdagProps} strategy="fixed">
                        <DatePicker.Input
                            {...forsteArbeidsdagInput}
                            className={spacing.mb1}
                            label="Når er første dag i ny jobb?"
                        />
                    </DatePicker>
                )}

                <OpplysningeneBrukesTil />
                <Alert variant="info" className={spacing.mb1}>
                    Når du sier opp jobben din som permittert så kan du motta dagpenger som permittert i 14 dager etter
                    at du sa opp.
                    <br />
                    Deretter må du søke på nytt.
                </Alert>
                <ConfirmationPanel
                    className={spacing.mb1}
                    checked={erBekreftet}
                    onChange={() => settErBekreftet((c) => !c)}
                    label={
                        <>
                            Jeg forstår at arbeidsgiver ikke har ansvaret for å betale lønn i oppsigelsestiden når jeg
                            sier opp selv under permittering, med mindre det er gjort egne avtaler om dette.
                            <br />
                        </>
                    }
                ></ConfirmationPanel>
                <Feil feil={feil} />
                <div className={`${flex.flex} ${flex.flexEnd}`}>
                    <Button
                        variant={'primary'}
                        loading={loading}
                        disabled={disabled}
                        onClick={() =>
                            handleLagreEndringer(props.valgtSituasjon, props.opprinneligSituasjon, tilleggsData)
                        }
                    >
                        Lagre endring i situasjon
                    </Button>
                </div>
            </>
        </Steg2Wrapper>
    );
};

const ANNET = (props: Steg2Props) => {
    const [merOmSituasjonenMin, setMerOmSituasjonenMin] = useState<string>('');
    const {
        datepickerProps: gjelderFraProps,
        inputProps: gjelderFraInput,
        selectedDay: gjelderFraDato,
    } = useDatepicker({
        fromDate: new Date('Jan 01 2022'),
    });

    const { feil, loading, handleLagreEndringer } = useLagreEndringer(props);

    const tilleggsData = {
        gjelderFraDato,
    };

    const disabled = !gjelderFraDato || loading || merOmSituasjonenMin.length === 0;

    return (
        <Steg2Wrapper valgtSituasjon={props.valgtSituasjon}>
            <>
                <DatePicker {...gjelderFraProps} strategy="fixed">
                    <DatePicker.Input
                        {...gjelderFraInput}
                        className={spacing.mb1}
                        label={<div className={flex.flex}>Når gjelder endringen fra?</div>}
                    />
                </DatePicker>
                <Textarea
                    name="fortellOmSituasjonenDin"
                    label="Fortell oss mer om situasjonen din"
                    value={merOmSituasjonenMin}
                    onChange={(event) => setMerOmSituasjonenMin(event.target.value)}
                />
                <OpplysningeneBrukesTil />
                <Feil feil={feil} />
                <div className={`${flex.flex} ${flex.flexEnd}`}>
                    <Button
                        variant={'primary'}
                        onClick={() =>
                            handleLagreEndringer(
                                props.valgtSituasjon,
                                props.opprinneligSituasjon,
                                tilleggsData,
                                merOmSituasjonenMin,
                            )
                        }
                        loading={loading}
                        disabled={disabled}
                    >
                        Lagre endring i situasjon
                    </Button>
                </div>
            </>
        </Steg2Wrapper>
    );
};

const Steg2 = (props: Steg2Props) => {
    const { valgtSituasjon } = props;
    if (valgtSituasjon === PermittertSvar.OPPSIGELSE) {
        return <OPPSIGELSE {...props} />;
    } else if (valgtSituasjon === PermittertSvar.TILBAKE_TIL_JOBB) {
        return <TILBAKE_TIL_JOBB {...props} />;
    } else if (valgtSituasjon === PermittertSvar.MIDLERTIDIG_JOBB) {
        return <MIDLERTIDIG_JOBB {...props} />;
    } else if (valgtSituasjon === PermittertSvar.KONKURS) {
        return <KONKURS {...props} />;
    } else if (valgtSituasjon === PermittertSvar.NY_JOBB) {
        return <NY_JOBB {...props} />;
    } else if (
        valgtSituasjon === PermittertSvar.ENDRET_PERMITTERINGSPROSENT ||
        valgtSituasjon === DinSituasjonSvar.ER_PERMITTERT
    ) {
        return <ENDRET_PERMITTERINGSPROSENT {...props} />;
    } else if (valgtSituasjon === PermittertSvar.SAGT_OPP) {
        return <SAGT_OPP {...props} />;
    } else {
        return <ANNET {...props} />;
    }
};

export default Steg2;
