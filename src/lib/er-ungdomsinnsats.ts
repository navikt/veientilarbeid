import * as BrukerInfo from '../contexts/bruker-info';
import { Data as FeaturetoggleData } from '../contexts/feature-toggles';

function sjekkOmBrukerErUngdomsinnsats({
    brukerInfoData,
    featuretoggleData,
}: {
    brukerInfoData: BrukerInfo.Data;
    featuretoggleData: FeaturetoggleData;
}) {
    const { alder } = brukerInfoData;

    return alder < 30 && featuretoggleData['veientilarbeid.14a-ungdomsinnsats'];
}

export default sjekkOmBrukerErUngdomsinnsats;
