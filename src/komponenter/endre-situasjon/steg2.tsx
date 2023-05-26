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
import spacing from '../../spacing.module.css';
import flex from '../../flex.module.css';
import { PermittertSvar, permittertTekster } from './permittert-modal';

export interface Steg2Props {
    valgtSituasjon: PermittertSvar;
    settValgtSituasjon: React.Dispatch<React.SetStateAction<PermittertSvar>>;
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
function useLagreEndringer(props: Steg2Props) {
    const { lagreBesvarelse } = useBesvarelse();
    const { amplitudeData, onClick, settTilleggsData, valgtSituasjon } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const [feil, settFeil] = useState<string | null>(null);

    const handleLagreEndringer = async (tilleggsData?: any) => {
        try {
            settFeil(null);
            setLoading(true);

            loggAktivitet({
                aktivitet: 'Lagrer endring i jobbsituasjonen',
                komponent: 'Min situasjon',
                ...amplitudeData,
            });
            const payload = {
                tekst: 'Jobbsitiasjonen er oppdatert til noe. Endringene gjelder fra en dato',
                overskrift: 'Jobbsituasjonen min er endret',
                venterPaaSvarFraNav: true,
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

    return (
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
                                Når oppsigelsestiden er over og du ikke lenger mottar lønn fra arbeidsgiver kan du på
                                nytt søke dagpenger dersom du ikke har fått nytt arbeid.
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
                    onClick={() => handleLagreEndringer({ oppsigelseDato, sisteArbeidsdagDato })}
                >
                    Lagre endring i situasjon
                </Button>
            </div>
        </>
    );
};

const ENDRET = (props: Steg2Props) => {
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
                    onClick={() => handleLagreEndringer(tilleggsData)}
                    loading={loading}
                    disabled={disabled}
                >
                    Lagre endring i situasjon
                </Button>
            </div>
        </>
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
                    onClick={() => handleLagreEndringer(tilleggsData)}
                    loading={loading}
                    disabled={loading}
                >
                    Lagre endring i situasjon
                </Button>
            </div>
        </>
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
    const tilleggsData = {
        forsteArbeidsdagDato,
        sisteArbeidsdagDato,
    };

    return (
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
                    onClick={() => handleLagreEndringer(tilleggsData)}
                    loading={loading}
                    disabled={loading}
                >
                    Lagre endring i situasjon
                </Button>
            </div>
        </>
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
                    onClick={() => handleLagreEndringer(tilleggsData)}
                    loading={loading}
                    disabled={loading}
                >
                    Lagre endring i situasjon
                </Button>
            </div>
        </>
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
                    onClick={() => handleLagreEndringer(tilleggsData)}
                    loading={loading}
                    disabled={loading}
                >
                    Lagre endring i situasjon
                </Button>
            </div>
        </>
    );
};

const UAVKLART = (props: Steg2Props) => {
    const { valgtSituasjon, settValgtSituasjon } = props;
    const { feil, loading, handleLagreEndringer } = useLagreEndringer(props);
    return (
        <>
            <BodyShort className={spacing.mb1}>Du har sagt at situasjonen din er "uavklart". Fortell mer.</BodyShort>
            <Select
                className={spacing.mb1}
                label={'Velg den nye situasjonen som passer deg best'}
                onChange={(e) => settValgtSituasjon(e.target.value as PermittertSvar)}
                value={valgtSituasjon}
            >
                {Object.keys(permittertTekster).map((situasjon) => (
                    <option key={situasjon} value={situasjon}>
                        {permittertTekster[situasjon]}
                    </option>
                ))}
            </Select>
            <BodyShort className={spacing.mb1}>
                NAV bruker opplysningene til å vurdere hvor mye veiledning du trenger.
            </BodyShort>
            <Feil feil={feil} />
            <div className={`${flex.flex} ${flex.flexEnd}`}>
                <Button variant={'primary'} onClick={() => handleLagreEndringer()} loading={loading} disabled={loading}>
                    Lagre endring i situasjon
                </Button>
            </div>
        </>
    );
};

const ANNET = (props: Steg2Props) => {
    const { valgtSituasjon, settValgtSituasjon } = props;
    const { feil, loading, handleLagreEndringer } = useLagreEndringer(props);

    return (
        <>
            <BodyShort className={spacing.mb1}>Du har sagt at situasjonen din er "annet". Fortell mer.</BodyShort>
            <Select
                className={spacing.mb1}
                label={'Velg den nye situasjonen som passer deg best'}
                onChange={(e) => settValgtSituasjon(e.target.value as PermittertSvar)}
                value={valgtSituasjon}
            >
                {Object.keys(permittertTekster).map((situasjon) => (
                    <option key={situasjon} value={situasjon}>
                        {permittertTekster[situasjon]}
                    </option>
                ))}
            </Select>
            <BodyShort className={spacing.mb1}>
                NAV bruker opplysningene til å vurdere hvor mye veiledning du trenger.
            </BodyShort>
            <Feil feil={feil} />
            <div className={`${flex.flex} ${flex.flexEnd}`}>
                <Button variant={'primary'} onClick={() => handleLagreEndringer()} loading={loading} disabled={loading}>
                    Lagre endring i situasjon
                </Button>
            </div>
        </>
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
        return <ENDRET {...props} />;
    } else if (valgtSituasjon === PermittertSvar.ANNET) {
        return <ANNET {...props} />;
    } else if (valgtSituasjon === PermittertSvar.UAVKLART) {
        return <UAVKLART {...props} />;
    } else {
        return <ANNET {...props} />;
    }
};

export default Steg2;
