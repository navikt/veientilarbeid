import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { ReactComponent as BytteIkon } from './bytte-ikon.svg';
import { Cell, ContentContainer, Grid, Link } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

const TEKSTER: Tekster<string> = {
    nb: {
        aktuelt: 'Dagpenger er mest aktuelt',
        ikkeAktuelt: 'Dagpenger er ikke aktuelt',
    },
    en: {
        aktuelt: 'Unemployment benefits are most relevant',
        ikkeAktuelt: 'Unemployment benefits are not applicable',
    },
};

const ByttKortLenke = (props: { handleByttKortKlikk: (e: React.MouseEvent) => void; valgtYtelserVisning: string }) => {
    const featuretoggleData = useFeatureToggleData();
    const kanViseKomponent = featuretoggleData['veientilarbeid.onboardingDagpenger.toggle'];
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    if (!kanViseKomponent) return null;

    return (
        <ContentContainer>
            <Grid>
                <Cell xs={1} style={{ alignSelf: 'center', justifySelf: 'center' }}>
                    <BytteIkon />
                </Cell>
                <Cell xs={11}>
                    <Link href="" onClick={props.handleByttKortKlikk}>
                        {props.valgtYtelserVisning === 'dagpenger' ? tekst('ikkeAktuelt') : tekst('aktuelt')}
                    </Link>
                </Cell>
            </Grid>
        </ContentContainer>
    );
};

export default ByttKortLenke;
