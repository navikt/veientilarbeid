import { useFeatureToggleData } from '../../contexts/feature-toggles';

import { hentProfilnokkelFraLocalStorage } from '../../utils/profil-id-mapper';

import FeedbackLegacy from './feedback-legacy';
import FeedbackProfil from './feedback-profil';

function Feedback(id: string) {
    const featureToggles = useFeatureToggleData();
    const brukProfil = featureToggles['veientilarbeid.bruk-profil'];
    const feedbackProfilId = hentProfilnokkelFraLocalStorage(id);
    return brukProfil ? <FeedbackProfil id={feedbackProfilId} /> : <FeedbackLegacy id={id} />;
}

export default Feedback;
