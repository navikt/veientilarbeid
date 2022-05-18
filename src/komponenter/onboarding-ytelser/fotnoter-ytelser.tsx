import { BodyLong, Link } from '@navikt/ds-react';

import ByttKortLenke from './bytt-kort-lenke';
import { useSprakValg } from '../../contexts/sprak';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { loggAktivitet } from '../../metrics/metrics';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import SkrivTilOssOgChat from './dagpenger/skriv-til-oss-og-chat';
import { mine_dagpenger_url } from '../../url';
import { DagpengeStatus } from '../../lib/beregn-dagpenge-status';

interface Props {
    valgtYtelse: string;
    handleByttKortKlikk: (e: React.MouseEvent) => void;
    kanViseDagpengerKomponent: boolean;
    dagpengeStatus: DagpengeStatus;
}

interface InnholdProps {
    dagpengeStatus: DagpengeStatus;
}

function FotnoterInnholdDagpenger(props: InnholdProps) {
    const amplitudeData = useAmplitudeData();
    const TEKSTER: Tekster<string> = {
        nb: {
            heading: 'Du har ikke sendt inn søknad om dagpenger',
            ingress: 'Du kan tidligst få dagpenger fra den dagen du sender inn søknaden.',
            sok: 'Søk om dagpenger',
            feil: 'Mener du dette er feil, kan du sjekke',
            mineDagpenger: 'Mine dagpenger',
        },
        en: {
            heading: 'You have not submitted an application for unemployment benefits',
            ingress: 'You can receive unemployment benefits at the earliest from the day you submit the application.',
            sok: 'Apply for unemployment benefits',
            feil: 'If you think this is wrong, you can check',
            mineDagpenger: 'My unemployment benefits',
        },
    };
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    function loggLenkeKlikk(action: string, url: string) {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
        window.location.assign(url);
    }

    if (props.dagpengeStatus !== ('ukjent' as DagpengeStatus)) return null;

    return (
        <>
            <BodyLong className={'blokk-xs'}>{tekst('ingress')}</BodyLong>
            <BodyLong className={'blokk-xs'}>
                {`${tekst('feil')} `}
                <Link
                    className={'tracking-wide'}
                    href={mine_dagpenger_url}
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til Mine dagpenger fra "dagpenger-tema - ikke søkt dagpenger"',
                            mine_dagpenger_url
                        )
                    }
                >
                    {tekst('mineDagpenger')}
                </Link>
            </BodyLong>

            <SkrivTilOssOgChat amplitudeTemaNavn='"dagpenger-tema - ikke søkt dagpenger"' />
        </>
    );
}

function FotnoterYtelser(props: Props) {
    const { valgtYtelse, handleByttKortKlikk, kanViseDagpengerKomponent, dagpengeStatus } = props;
    return (
        <>
            {valgtYtelse === 'dagpenger' && <FotnoterInnholdDagpenger dagpengeStatus={dagpengeStatus} />}
            {kanViseDagpengerKomponent && (
                <ByttKortLenke valgtYtelserVisning={valgtYtelse} handleByttKortKlikk={handleByttKortKlikk} />
            )}
        </>
    );
}

export default FotnoterYtelser;
