import React, { useState } from 'react';
import { Alert, BodyShort, Button, HelpText, Radio, RadioGroup, DatePicker, useDatepicker } from '@navikt/ds-react';

import { BesvarelseRequest, useBesvarelse } from '../../contexts/besvarelse';

import { loggAktivitet } from '../../metrics/metrics';
import { DinSituasjonSvar } from '../../contexts/brukerregistrering';
import { dinSituasjonSvarTekster, PermittertSvar, permittertTekster } from '../../models/endring-av-situasjon';

import { svarMap } from '../../models/sporsmal-og-svar';
import prettyPrintDato from '../../utils/pretty-print-dato';

import spacing from '../../spacing.module.css';
import flex from '../../flex.module.css';

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
        <BodyShort className={spacing.mb1}>NAV bruker opplysningene for å kunne tilpasse veiledningen din.</BodyShort>
    );
};

function genererDialogTekst(
    valgtSituasjon: SituasjonSvar,
    opprinneligSituasjon: SituasjonSvar | undefined,
    tilleggsData?: any
) {
    const tekstArray = [];

    tekstArray.push(`Jobbsituasjonen er endret til "${svarMap.dinSituasjon[valgtSituasjon]}".`);

    if (tilleggsData) {
        tekstArray.push('Tilleggsopplysninger: \n\n');
        const {
            oppsigelseDato,
            sisteArbeidsdagDato,
            permitteringsProsent,
            gjelderFraDato,
            forsteArbeidsdagDato,
            stillingsProsent,
        } = tilleggsData;
        if (valgtSituasjon === PermittertSvar.OPPSIGELSE) {
            tekstArray.push(
                `Oppsigelsen ble mottatt ${oppsigelseDato ? prettyPrintDato(oppsigelseDato) : 'på ikke oppgitt dato'}`
            );
            tekstArray.push(
                `Siste arbeidsdag med lønn ${sisteArbeidsdagDato ? prettyPrintDato(sisteArbeidsdagDato) : 'er ukjent'}`
            );
        } else if (valgtSituasjon === PermittertSvar.ENDRET_PERMITTERINGSPROSENT) {
            tekstArray.push(
                `Permitteringen gjelder fra ${gjelderFraDato ? prettyPrintDato(gjelderFraDato) : 'ikke oppgitt dato'}`
            );
            tekstArray.push(
                `Permitteringsprosenten er ${
                    permitteringsProsent ? `${permitteringsProsent} prosent` : 'er ikke oppgitt'
                }`
            );
        } else if (valgtSituasjon === PermittertSvar.TILBAKE_TIL_JOBB) {
            tekstArray.push(
                `Du er tilbake på jobb fra ${
                    forsteArbeidsdagDato ? prettyPrintDato(forsteArbeidsdagDato) : 'ikke oppgitt dato'
                }`
            );
        } else if (valgtSituasjon === PermittertSvar.NY_JOBB) {
            tekstArray.push(
                `Første arbeidsdag i ny jobb er ${
                    forsteArbeidsdagDato ? prettyPrintDato(forsteArbeidsdagDato) : 'ikke oppgitt'
                }`
            );
            tekstArray.push(`Stillingsprosenten er ${stillingsProsent ? stillingsProsent : 'ikke oppgitt'}`);
        } else if (valgtSituasjon === PermittertSvar.MIDLERTIDIG_JOBB) {
            tekstArray.push(
                `Første arbeidsdag i midlertidige jobb er ${
                    forsteArbeidsdagDato ? prettyPrintDato(forsteArbeidsdagDato) : 'ikke oppgitt'
                }`
            );
            tekstArray.push(`Stillingsprosenten er ${stillingsProsent ? stillingsProsent : 'ikke oppgitt'}`);
        } else if (valgtSituasjon === PermittertSvar.KONKURS) {
            tekstArray.push(
                `Siste arbeidsdag er ${sisteArbeidsdagDato ? prettyPrintDato(sisteArbeidsdagDato) : 'ikke oppgitt'}`
            );
        } else if (valgtSituasjon === PermittertSvar.SAGT_OPP) {
            tekstArray.push(`Jeg sa opp ${oppsigelseDato ? prettyPrintDato(oppsigelseDato) : 'ikke oppgitt'}`);
            tekstArray.push(
                `Siste arbeidsdag med lønn ${
                    sisteArbeidsdagDato ? prettyPrintDato(sisteArbeidsdagDato) : 'ikke oppgitt'
                }`
            );
        } else {
            tekstArray.push(
                `Endringen gjelder fra ${gjelderFraDato ? prettyPrintDato(gjelderFraDato) : 'ikke oppgitt dato'}`
            );
        }

        if (opprinneligSituasjon) {
            tekstArray.push(`Jobbsituasjonen er endret fra "${svarMap.dinSituasjon[opprinneligSituasjon]}".`);
        }
    }

    return {
        tekst: tekstArray.join('\n\n'),
        overskrift: 'Jobbsituasjonen min er endret',
        venterPaaSvarFraNav: true,
    };
}

function useLagreEndringer(props: Steg2Props) {
    const { lagreBesvarelse } = useBesvarelse();
    const { amplitudeData, onClick, settTilleggsData } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const [feil, settFeil] = useState<string | null>(null);

    const handleLagreEndringer = async (valgtSituasjon?: any, opprinneligSituasjon?: any, tilleggsData?: any) => {
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
                tilleggsData
            );

            const payload = {
                tekst,
                overskrift,
                venterPaaSvarFraNav,
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
    const headingTekst = permittertTekster[props.valgtSituasjon] || dinSituasjonSvarTekster[props.valgtSituasjon];

    return (
        <>
            <BodyShort>{headingTekst}</BodyShort>
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
        defaultSelected: new Date(),
    });
    const { feil, loading, handleLagreEndringer } = useLagreEndringer(props);

    const tilleggsData = {
        forsteArbeidsdagDato,
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

                <OpplysningeneBrukesTil />
                <Feil feil={feil} />
                <div className={`${flex.flex} ${flex.flexEnd}`}>
                    <Button
                        variant={'primary'}
                        onClick={() =>
                            handleLagreEndringer(props.valgtSituasjon, props.opprinneligSituasjon, tilleggsData)
                        }
                        loading={loading}
                        disabled={loading}
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
        defaultSelected: new Date(),
    });

    const {
        datepickerProps: sisteArbeidsdagProps,
        inputProps: sisteArbeidsdagInput,
        selectedDay: sisteArbeidsdagDato,
    } = useDatepicker({
        fromDate: new Date('Jan 01 2022'),
        defaultSelected: new Date(),
    });

    const { feil, loading, handleLagreEndringer } = useLagreEndringer(props);

    const tilleggsData = {
        oppsigelseDato,
        sisteArbeidsdagDato,
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
                <OpplysningeneBrukesTil />
                <Feil feil={feil} />
                <div className={`${flex.flex} ${flex.flexEnd}`}>
                    <Button
                        variant={'primary'}
                        loading={loading}
                        disabled={loading}
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
        defaultSelected: new Date(),
    });
    const [permitteringsProsent, settPermitteringsProsent] = useState<string>();

    const { feil, loading, handleLagreEndringer } = useLagreEndringer(props);
    const disabled = !permitteringsProsent || loading;

    const tilleggsData = {
        permitteringsProsent,
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
        defaultSelected: new Date(),
    });

    const [stillingsProsent, settStillingsProsent] = useState<string>();

    const { feil, loading, handleLagreEndringer } = useLagreEndringer(props);

    const disabled = !stillingsProsent || loading;

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
        defaultSelected: new Date(),
    });

    const [stillingsProsent, settStillingsProsent] = useState<string>();

    const { feil, loading, handleLagreEndringer } = useLagreEndringer(props);

    const disabled = !stillingsProsent || loading;

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
        defaultSelected: new Date(),
    });

    const { feil, loading, handleLagreEndringer } = useLagreEndringer(props);

    const tilleggsData = {
        sisteArbeidsdagDato,
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
                <OpplysningeneBrukesTil />
                <Feil feil={feil} />
                <div className={`${flex.flex} ${flex.flexEnd}`}>
                    <Button
                        variant={'primary'}
                        onClick={() =>
                            handleLagreEndringer(props.valgtSituasjon, props.opprinneligSituasjon, tilleggsData)
                        }
                        loading={loading}
                        disabled={loading}
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
        defaultSelected: new Date(),
    });

    const {
        datepickerProps: sisteArbeidsdagProps,
        inputProps: sisteArbeidsdagInput,
        selectedDay: sisteArbeidsdagDato,
    } = useDatepicker({
        fromDate: new Date('Jan 01 2022'),
        defaultSelected: new Date(),
    });

    const { feil, loading, handleLagreEndringer } = useLagreEndringer(props);

    const tilleggsData = {
        oppsigelseDato,
        sisteArbeidsdagDato,
    };

    return (
        <Steg2Wrapper valgtSituasjon={props.valgtSituasjon}>
            <>
                <DatePicker {...oppsigelseProps} strategy="fixed">
                    <DatePicker.Input
                        {...oppsigelseInput}
                        className={spacing.mb1}
                        label={<div className={flex.flex}>Når leverte du oppsigelsen din?</div>}
                    />
                </DatePicker>

                <DatePicker {...sisteArbeidsdagProps} strategy="fixed">
                    <DatePicker.Input
                        {...sisteArbeidsdagInput}
                        className={spacing.mb1}
                        label={
                            <div className={flex.flex}>
                                Når er siste arbeidsdag der arbeidsgiver betaler lønn?
                                <HelpText className={spacing.ml05}>
                                    Når oppsigelsestiden er over og du ikke lenger mottar lønn fra arbeidsgiver kan du
                                    på nytt søke dagpenger dersom du ikke har fått nytt arbeid.
                                </HelpText>
                            </div>
                        }
                    />
                </DatePicker>
                <OpplysningeneBrukesTil />
                <Feil feil={feil} />
                <div className={`${flex.flex} ${flex.flexEnd}`}>
                    <Button
                        variant={'primary'}
                        loading={loading}
                        disabled={loading}
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
    const {
        datepickerProps: gjelderFraProps,
        inputProps: gjelderFraInput,
        selectedDay: gjelderFraDato,
    } = useDatepicker({
        fromDate: new Date('Jan 01 2022'),
        defaultSelected: new Date(),
    });

    const { feil, loading, handleLagreEndringer } = useLagreEndringer(props);

    const tilleggsData = {
        gjelderFraDato,
    };

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
                <OpplysningeneBrukesTil />
                <Feil feil={feil} />
                <div className={`${flex.flex} ${flex.flexEnd}`}>
                    <Button
                        variant={'primary'}
                        onClick={() =>
                            handleLagreEndringer(props.valgtSituasjon, props.opprinneligSituasjon, tilleggsData)
                        }
                        loading={loading}
                        disabled={loading}
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
