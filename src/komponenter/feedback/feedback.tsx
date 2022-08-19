import { useFeatureToggleData } from '../../contexts/feature-toggles';

import { hentProfilnokkelFraLocalStorage } from '../../utils/profil-id-mapper';

import FeedbackLegacy from './feedback-legacy';
import FeedbackProfil from './feedback-profil';

interface Props {
    id: string;
    className?: string;
    sporsmal?: string;
}

function Feedback(props: Props) {
    const { id, className, sporsmal } = props;
    const featureToggles = useFeatureToggleData();
    const brukProfil = featureToggles['veientilarbeid.bruk-profil'];
    const feedbackProfilId = hentProfilnokkelFraLocalStorage(id);
    return brukProfil ? (
        <FeedbackProfil id={feedbackProfilId} className={className} sporsmal={sporsmal} />
    ) : (
        <FeedbackLegacy id={id} className={className} sporsmal={sporsmal} />
    );
}

export default Feedback;
