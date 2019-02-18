import { servicekodeToggleKey, jobbsokerbesvarelseToggleKey, demoToggleKey } from '../ducks/feature-toggles';

const featureTogglesMock = {
    [servicekodeToggleKey]: true,
    [jobbsokerbesvarelseToggleKey]: true,
    [demoToggleKey]: false
};

export default featureTogglesMock;