import { hentProfilnokkelFraLocalStorage } from '../../utils/profil-id-mapper';
import FeedbackProfil from './feedback-profil';

interface Props {
    id: string;
    className?: string;
    sporsmal?: string;
}

function Feedback(props: Props) {
    const { id, className, sporsmal } = props;
    const feedbackProfilId = hentProfilnokkelFraLocalStorage(id);
    return <FeedbackProfil id={feedbackProfilId} className={className} sporsmal={sporsmal} />;
}

export default Feedback;
