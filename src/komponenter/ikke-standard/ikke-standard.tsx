import { BodyLong, Heading, Link, Panel } from '@navikt/ds-react';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import { aktivitetsplanLenke, dialogLenke, omMeldekortLenke, sykefravaerLenke } from '../../innhold/lenker';
import { loggAktivitet } from '../../metrics/metrics';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { Bandage, Dialog, Email, Laptop, Task } from '@navikt/ds-icons';

const TEKSTER = {
    nb: {
        'aktivitetsplan.overskrift': 'Aktivitetsplanen din',
        'aktivitetsplan.bruke': 'Du kan bruke',
        'aktivitetsplan.lenketekst': 'aktivitetsplanen',
        'aktivitetsplan.holde-orden': 'til å holde orden på aktiviteter du gjør i samarbeid med NAV.',
        'meldekort.overskrift': 'Meldekort',
        'meldekort.ingress': 'Send inn, endre og se innsendte meldekort.',
        'sykefravaer.overskrift': 'Ditt sykefravær',
        'sykefravaer.ingress': 'Se sykemeldingene dine og annen informasjon om sykefraværet ditt.',
        'dialog.overskrift': 'Dialog',
        'dialog.ingress': 'Gå til dialog',
        'sporsmal.overskrift': 'Har du spørsmål om å søke eller motta pengestøtte?',
        sporsmal: 'Har du spørsmål om ytelser må du bruke',
        skrivTilOss: 'skriv til oss',
        eller: 'eller',
        chat: 'chat',
        'les-om-hjelp': 'Du kan lese om hva NAV kan hjelpe deg med på forsiden av',
    },
    en: {
        'aktivitetsplan.overskrift': 'Your planned activities',
        'aktivitetsplan.bruke': 'Du kan bruke',
        'aktivitetsplan.lenketekst': 'aktivitetsplanen',
        'aktivitetsplan.holde-orden': 'til å holde orden på aktiviteter du gjør i samarbeid med NAV.',
        'meldekort.overskrift': 'Meldekort',
        'meldekort.ingress': 'Submit, edit and see your employment status forms.',
        'sykefravaer.overskrift': 'Your sick leave',
        'sykefravaer.ingress': 'See information about your sick leave',
        'dialog.overskrift': 'Dialog',
        'dialog.ingress': 'Gå til dialog',
        'sporsmal.overskrift': 'Har du spørsmål om å søke eller motta pengestøtte?',
        sporsmal: 'Har du spørsmål om ytelser må du bruke',
        skrivTilOss: 'skriv til oss',
        eller: 'eller',
        chat: 'chat',
        'les-om-hjelp': 'Du kan lese om hva NAV kan hjelpe deg med på forsiden av',
    },
};

function IkkeStandard() {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    const amplitudeData = useAmplitudeData();
    const { erSykmeldtMedArbeidsgiver } = useBrukerinfoData();

    const handleClick = (action: string) => {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
    };

    const Meldekort = () => {
        return ListeElement(
            <Email />,
            <div>
                <Heading size="medium">{tekst('meldekort.overskrift')}</Heading>
                <BodyLong>
                    <Link href={omMeldekortLenke} target="_blank" onClick={() => handleClick('Går til meldekort')}>
                        {tekst('meldekort.ingress')}
                    </Link>{' '}
                </BodyLong>
            </div>
        );
    };

    const DittSykefravaer = () => {
        return ListeElement(
            <Bandage />,
            <div>
                <Heading size="medium">{tekst('sykefravaer.overskrift')}</Heading>
                <BodyLong>
                    <Link
                        href={sykefravaerLenke}
                        target="_blank"
                        onClick={() => handleClick('Går til ditt sykefravær')}
                    >
                        {tekst('sykefravaer.ingress')}
                    </Link>
                </BodyLong>
            </div>
        );
    };

    return (
        <Panel>
            <ul className={'ikke-standard-liste'}>
                {ListeElement(
                    <Task />,
                    <div>
                        <Heading size="medium">{tekst('aktivitetsplan.overskrift')}</Heading>
                        <BodyLong>
                            {tekst('aktivitetsplan.bruke')}{' '}
                            <Link
                                href={aktivitetsplanLenke}
                                target="_blank"
                                onClick={() => handleClick('Går til aktivitetsplanen')}
                            >
                                {tekst('aktivitetsplan.lenketekst')}
                            </Link>{' '}
                            {tekst('aktivitetsplan.holde-orden')}
                        </BodyLong>
                    </div>
                )}
                {erSykmeldtMedArbeidsgiver ? <DittSykefravaer /> : <Meldekort />}
                {ListeElement(
                    <Dialog />,
                    <div>
                        <Heading size="medium">{tekst('dialog.overskrift')}</Heading>
                        <Link href={dialogLenke} target="_blank" onClick={() => handleClick('Går til dialog')}>
                            {tekst('dialog.ingress')}
                        </Link>{' '}
                    </div>
                )}
                {ListeElement(
                    <Laptop />,
                    <div>
                        <Heading size="medium">{tekst('sporsmal.overskrift')}</Heading>
                        <BodyLong>
                            {tekst('sporsmal')}{' '}
                            <Link
                                href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                                onClick={() => handleClick(`Går til STO`)}
                            >
                                {tekst('skrivTilOss')}
                            </Link>{' '}
                            {tekst('eller')}{' '}
                            <Link
                                href="https://www.nav.no/person/kontakt-oss/chat/"
                                onClick={() => handleClick(`Går til chat`)}
                            >
                                {tekst('chat')}
                            </Link>
                            {'. '}
                            {tekst('les-om-hjelp')}{' '}
                            <Link href={'https://www.nav.no'} onClick={() => handleClick('Går til nav.no')}>
                                nav.no
                            </Link>
                        </BodyLong>
                    </div>
                )}
            </ul>
        </Panel>
    );
}

const ListeElement = (ikon: JSX.Element, innhold: JSX.Element) => {
    return (
        <li className="flex mb-2">
            <span
                style={{
                    marginRight: '0.5em',
                    position: 'relative',
                    top: '6px',
                    fontSize: 'var(--navds-font-size-heading-medium)',
                }}
            >
                {ikon}
            </span>
            <div>{innhold}</div>
        </li>
    );
};

export default IkkeStandard;
