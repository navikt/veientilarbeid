import React, { useState } from 'react';
import {
    Alert,
    BodyShort,
    Button,
    HelpText,
    Radio,
    RadioGroup,
    Select,
    DatePicker,
    useDatepicker,
} from '@navikt/ds-react';

import { BesvarelseRequest, useBesvarelse } from '../../contexts/besvarelse';

import { loggAktivitet } from '../../metrics/metrics';
import { PermittertSvar, permittertTekster, DinSituasjonSvar, dinSituasjonSvarTekster } from './permittert-modal';

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

function useLagreEndringer(props: Steg2Props) {
    const { lagreBesvarelse } = useBesvarelse();
    const { amplitudeData, onClick, settTilleggsData, valgtSituasjon } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const [feil, settFeil] = useState<string | null>(null);

    const handleLagreEndringer = async (tilleggsData?: any) => {
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
            const payload = {
                tekst: 'Jobbsituasjonen er oppdatert til noe. Endringene gjelder fra en dato',
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

    return (
        <Steg2Wrapper valgtSituasjon={props.valgtSituasjon}>
            <>
                <DatePicker {...oppsigelseProps} strategy="fixed">
                    <DatePicker.Input
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
                </DatePicker>

                <DatePicker {...sisteArbeidsdagProps} strategy="fixed">
                    <DatePicker.Input
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
                </DatePicker>
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
        </Steg2Wrapper>
    );
};

const ENDRET = (props: Steg2Props) => {
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
                        label="Fra hvilken dato skjer endringen?"
                    />
                </DatePicker>

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
        </Steg2Wrapper>
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
        forsteArbeidsdagDato,
        sisteArbeidsdagDato,
    };

    return (
        <Steg2Wrapper valgtSituasjon={props.valgtSituasjon}>
            <>
                <DatePicker {...forsteArbeidsdagProps} strategy="fixed">
                    <DatePicker.Input
                        {...forsteArbeidsdagInput}
                        className={spacing.mb1}
                        label="Når er første arbeidsdag i ny jobb?"
                    />
                </DatePicker>

                <DatePicker {...sisteArbeidsdagProps} strategy="fixed">
                    <DatePicker.Input
                        {...sisteArbeidsdagInput}
                        className={spacing.mb1}
                        label="Når er siste arbeidsdag med lønn i nåværende jobb?"
                    />
                </DatePicker>
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
                        label="Når er første arbeidsdag i den midlertidige jobben?"
                    />
                </DatePicker>

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
                        onClick={() => handleLagreEndringer()}
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
                        onClick={() => handleLagreEndringer()}
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
