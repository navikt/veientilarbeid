import MeldekortOnboarding from '../onboardingMeldekort/meldekort-onboarding';
import Onboarding14A from '../onboarding14a/Onboarding14a';
import YtelserOnboarding from '../onboarding-ytelser/ytelser-onboarding';
import { Cell, Grid } from '@navikt/ds-react';

const Temapanel = () => {
    return (
        <Grid>
            <Cell xs={12} md={4}>
                <Onboarding14A />
            </Cell>
            <Cell xs={12} md={4}>
                <MeldekortOnboarding />
            </Cell>
            <Cell xs={12} md={4}>
                <YtelserOnboarding />
            </Cell>
        </Grid>
    );
};

export default Temapanel;
