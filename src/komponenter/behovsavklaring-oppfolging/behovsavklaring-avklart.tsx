import BehovsavklaringAvklartSituasjonsbestemt from './behovsavklaring-avklart-situasjonsbestemt';
import BehovsavklaringAvklartStandard from './behovsavklaring-avklart-standard';

function BehovsavklaringAvklart() {
    const erStandard = true;

    return erStandard ? <BehovsavklaringAvklartStandard /> : <BehovsavklaringAvklartSituasjonsbestemt />;
}

export default BehovsavklaringAvklart;
