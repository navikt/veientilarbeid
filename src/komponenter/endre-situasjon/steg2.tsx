import React, { useState } from 'react';
import {
    Alert,
    BodyShort,
    Button,
    HelpText,
    Radio,
    RadioGroup,
    Select,
    UNSAFE_DatePicker,
    UNSAFE_useDatepicker,
} from '@navikt/ds-react';

import { BesvarelseRequest, useBesvarelse } from '../../contexts/besvarelse';

import { loggAktivitet } from '../../metrics/metrics';
import { PermittertSvar, permittertTekster, DinSituasjonSvar, dinSituasjonSvarTekster } from './permittert-modal';
import { svarMap } from '../../models/sporsmal-og-svar';

import spacing from '../../spacing.module.css';
import flex from '../../flex.module.css';

type SituasjonSvar = PermittertSvar | DinSituasjonSvar;

export interface Steg2Props {
    valgtSituasjon: SituasjonSvar;
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

function genererDialogTekst(valgtSituasjon: SituasjonSvar, tilleggsData?: any) {
    const tekstArray = [];

    tekstArray.push(`Jobbsituasjonen er endret til "${svarMap.dinSituasjon[valgtSituasjon]}".`);

    if (tilleggsData) {
        tekstArray.push('Tilleggsopplysninger: \n\n');
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

    const handleLagreEndringer = async (valgtSituasjon?: any, tilleggsData?: any) => {
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

            const { tekst, overskrift, venterPaaSvarFraNav } = genererDialogTekst(valgtSituasjon, tilleggsData);

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

const OPPSIGELSE = (props: Steg2Props) => {
    const {
        datepickerProps: oppsigelseProps,
        inputProps: oppsigelseInput,
        selectedDay: oppsigelseDato,
    } = UNSAFE_useDatepicker({
        fromDate: new Date('Jan 01 2022'),
        defaultSelected: new Date(),
    });

    const {
        datepickerProps: sisteArbeidsdagProps,
        inputProps: sisteArbeidsdagInput,
        selectedDay: sisteArbeidsdagDato,
    } = UNSAFE_useDatepicker({
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
                <UNSAFE_DatePicker {...oppsigelseProps} strategy="fixed">
                    <UNSAFE_DatePicker.Input
                        {...oppsigelseInput}
                        className={spacing.mb1}
                        label={
                            <div className={flex.flex}>
                                Når mottok du oppsigelsen?
                                <HelpText className={spacing.ml05}>
                                    Datoen da du mottok beskjed fra arbeidsgiver om at du mistet jobben.
                                </HelpText>
                            </div>
                        }
                    />
                </UNSAFE_DatePicker>

                <UNSAFE_DatePicker {...sisteArbeidsdagProps} strategy="fixed">
                    <UNSAFE_DatePicker.Input
                        {...sisteArbeidsdagInput}
                        className={spacing.mb1}
                        label={
                            <div className={flex.flex}>
                                Når er din siste arbeidsdag der arbeidsgiver betaler lønn?
                                <HelpText className={spacing.ml05}>
                                    Når oppsigelsestiden er over og du ikke lenger mottar lønn fra arbeidsgiver kan du
                                    på nytt søke dagpenger dersom du ikke har fått nytt arbeid.
                                </HelpText>
                            </div>
                        }
                    />
                </UNSAFE_DatePicker>
                <BodyShort className={spacing.mb1}>
                    NAV bruker opplysningene til å vurdere hvor mye veiledning du trenger.
                </BodyShort>
                <Feil feil={feil} />
                <div className={`${flex.flex} ${flex.flexEnd}`}>
                    <Button
                        variant={'primary'}
                        loading={loading}
                        disabled={loading}
                        onClick={() => handleLagreEndringer(props.valgtSituasjon, tilleggsData)}
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
    } = UNSAFE_useDatepicker({
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
                <UNSAFE_DatePicker {...gjelderFraDatoProps} strategy="fixed">
                    <UNSAFE_DatePicker.Input
                        {...gjelderFraDatoInput}
                        className={spacing.mb1}
                        label="Fra hvilken dato skjer endringen?"
                    />
                </UNSAFE_DatePicker>

                <RadioGroup
                    legend="Hva er den nye peritteringsprosenten?"
                    onChange={(value) => {
                        settPermitteringsProsent(value);
                    }}
                >
                    <Radio value="100">Fullt permittert - 100 prosent</Radio>
                    <Radio value="75">50 - 100 prosent</Radio>
                    <Radio value="50">Under 50 prosent</Radio>
                </RadioGroup>

                <BodyShort className={spacing.mb1}>
                    NAV bruker opplysningene til å vurdere hvor mye veiledning du trenger.
                </BodyShort>

                <Feil feil={feil} />

                <div className={`${flex.flex} ${flex.flexEnd}`}>
                    <Button
                        variant={'primary'}
                        onClick={() => handleLagreEndringer(props.valgtSituasjon, tilleggsData)}
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

const TILBAKE_TIL_JOBB = (props: Steg2Props) => {
    const {
        datepickerProps: forsteArbeidsdagProps,
        inputProps: forsteArbeidsdagInput,
        selectedDay: forsteArbeidsdagDato,
    } = UNSAFE_useDatepicker({
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
                <UNSAFE_DatePicker {...forsteArbeidsdagProps} strategy="fixed">
                    <UNSAFE_DatePicker.Input
                        {...forsteArbeidsdagInput}
                        className={spacing.mb1}
                        label="Når er første arbeidsdag etter permittering?"
                    />
                </UNSAFE_DatePicker>

                <BodyShort className={spacing.mb1}>
                    NAV bruker opplysningene til å vurdere hvor mye veiledning du trenger.
                </BodyShort>
                <Feil feil={feil} />
                <div className={`${flex.flex} ${flex.flexEnd}`}>
                    <Button
                        variant={'primary'}
                        onClick={() => handleLagreEndringer(props.valgtSituasjon, tilleggsData)}
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

const NY_JOBB = (props: Steg2Props) => {
    const {
        datepickerProps: forsteArbeidsdagProps,
        inputProps: forsteArbeidsdagInput,
        selectedDay: forsteArbeidsdagDato,
    } = UNSAFE_useDatepicker({
        fromDate: new Date('Jan 01 2022'),
        defaultSelected: new Date(),
    });

    const {
        datepickerProps: sisteArbeidsdagProps,
        inputProps: sisteArbeidsdagInput,
        selectedDay: sisteArbeidsdagDato,
    } = UNSAFE_useDatepicker({
        fromDate: new Date('Jan 01 2022'),
        defaultSelected: new Date(),
    });

    const { feil, loading, handleLagreEndringer } = useLagreEndringer(props);
    0;

    const tilleggsData = {
        forsteArbeidsdagDato,
        sisteArbeidsdagDato,
    };

    return (
        <Steg2Wrapper valgtSituasjon={props.valgtSituasjon}>
            <>
                <UNSAFE_DatePicker {...forsteArbeidsdagProps} strategy="fixed">
                    <UNSAFE_DatePicker.Input
                        {...forsteArbeidsdagInput}
                        className={spacing.mb1}
                        label="Når er første arbeidsdag i ny jobb?"
                    />
                </UNSAFE_DatePicker>

                <UNSAFE_DatePicker {...sisteArbeidsdagProps} strategy="fixed">
                    <UNSAFE_DatePicker.Input
                        {...sisteArbeidsdagInput}
                        className={spacing.mb1}
                        label="Når er siste arbeidsdag med lønn i nåværende jobb?"
                    />
                </UNSAFE_DatePicker>
                <BodyShort className={spacing.mb1}>
                    NAV bruker opplysningene til å vurdere hvor mye veiledning du trenger.
                </BodyShort>
                <Feil feil={feil} />
                <div className={`${flex.flex} ${flex.flexEnd}`}>
                    <Button
                        variant={'primary'}
                        onClick={() => handleLagreEndringer(props.valgtSituasjon, tilleggsData)}
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

const MIDLERTIDIG_JOBB = (props: Steg2Props) => {
    const {
        datepickerProps: forsteArbeidsdagProps,
        inputProps: forsteArbeidsdagInput,
        selectedDay: forsteArbeidsdagDato,
    } = UNSAFE_useDatepicker({
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
                <UNSAFE_DatePicker {...forsteArbeidsdagProps} strategy="fixed">
                    <UNSAFE_DatePicker.Input
                        {...forsteArbeidsdagInput}
                        className={spacing.mb1}
                        label="Når er første arbeidsdag i den midlertidige jobben?"
                    />
                </UNSAFE_DatePicker>

                <BodyShort className={spacing.mb1}>
                    NAV bruker opplysningene til å vurdere hvor mye veiledning du trenger.
                </BodyShort>
                <Feil feil={feil} />
                <div className={`${flex.flex} ${flex.flexEnd}`}>
                    <Button
                        variant={'primary'}
                        onClick={() => handleLagreEndringer(props.valgtSituasjon, tilleggsData)}
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

const KONKURS = (props: Steg2Props) => {
    const {
        datepickerProps: sisteArbeidsdagProps,
        inputProps: sisteArbeidsdagInput,
        selectedDay: sisteArbeidsdagDato,
    } = UNSAFE_useDatepicker({
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
                <UNSAFE_DatePicker {...sisteArbeidsdagProps} strategy="fixed">
                    <UNSAFE_DatePicker.Input
                        {...sisteArbeidsdagInput}
                        className={spacing.mb1}
                        label="Når er siste arbeidsdag?"
                    />
                </UNSAFE_DatePicker>
                <BodyShort className={spacing.mb1}>
                    NAV bruker opplysningene til å vurdere hvor mye veiledning du trenger.
                </BodyShort>
                <Feil feil={feil} />
                <div className={`${flex.flex} ${flex.flexEnd}`}>
                    <Button
                        variant={'primary'}
                        onClick={() => handleLagreEndringer(props.valgtSituasjon, tilleggsData)}
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

const UAVKLART = (props: Steg2Props) => {
    const { valgtSituasjon, settValgtSituasjon } = props;
    const { feil, loading, handleLagreEndringer } = useLagreEndringer(props);
    return (
        <Steg2Wrapper valgtSituasjon={props.valgtSituasjon}>
            <>
                <Select
                    className={spacing.mb1}
                    label={'Velg den nye situasjonen som passer deg best'}
                    onChange={(e) => settValgtSituasjon(e.target.value as SituasjonSvar)}
                    value={valgtSituasjon}
                >
                    {Object.keys(dinSituasjonSvarTekster).map((situasjon) => (
                        <option key={situasjon} value={situasjon}>
                            {dinSituasjonSvarTekster[situasjon]}
                        </option>
                    ))}
                    <option key={PermittertSvar.ANNET} value={PermittertSvar.ANNET}>
                        {permittertTekster[PermittertSvar.ANNET]}
                    </option>
                </Select>
                <BodyShort className={spacing.mb1}>
                    NAV bruker opplysningene til å vurdere hvor mye veiledning du trenger.
                </BodyShort>
                <Feil feil={feil} />
                <div className={`${flex.flex} ${flex.flexEnd}`}>
                    <Button
                        variant={'primary'}
                        onClick={() => handleLagreEndringer(valgtSituasjon)}
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

const ANNET = (props: Steg2Props) => {
    const { valgtSituasjon, settValgtSituasjon } = props;
    const { feil, loading, handleLagreEndringer } = useLagreEndringer(props);

    return (
        <Steg2Wrapper valgtSituasjon={props.valgtSituasjon}>
            <>
                <Select
                    className={spacing.mb1}
                    label={'Velg den nye situasjonen som passer deg best'}
                    onChange={(e) => settValgtSituasjon(e.target.value as SituasjonSvar)}
                    value={valgtSituasjon}
                >
                    {Object.keys(dinSituasjonSvarTekster).map((situasjon) => (
                        <option key={situasjon} value={situasjon}>
                            {dinSituasjonSvarTekster[situasjon]}
                        </option>
                    ))}
                    <option key={PermittertSvar.ANNET} value={PermittertSvar.ANNET}>
                        {permittertTekster[PermittertSvar.ANNET]}
                    </option>
                </Select>
                <BodyShort className={spacing.mb1}>
                    NAV bruker opplysningene til å vurdere hvor mye veiledning du trenger.
                </BodyShort>
                <Feil feil={feil} />
                <div className={`${flex.flex} ${flex.flexEnd}`}>
                    <Button
                        variant={'primary'}
                        onClick={() => handleLagreEndringer(valgtSituasjon)}
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
    } else if (valgtSituasjon === PermittertSvar.ENDRET_PERMITTERINGSPROSENT) {
        return <ENDRET_PERMITTERINGSPROSENT {...props} />;
    } else if (valgtSituasjon === PermittertSvar.ANNET) {
        return <ANNET {...props} />;
    } else if (valgtSituasjon === PermittertSvar.UAVKLART) {
        return <UAVKLART {...props} />;
    } else {
        return <ANNET {...props} />;
    }
};

export default Steg2;
