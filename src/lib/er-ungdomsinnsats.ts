import * as BrukerInfo from '../contexts/bruker-info';

function sjekkOmBrukerErUngdomsinnsats({ brukerInfoData }: { brukerInfoData: BrukerInfo.Data }) {
    const { alder } = brukerInfoData;

    return alder < 30;
}

export default sjekkOmBrukerErUngdomsinnsats;
