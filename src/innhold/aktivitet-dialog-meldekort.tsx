import * as React from "react";
import { BrukerInfoContext } from "../ducks/bruker-info";
import Aktivitetsplan from "../komponenter/aktivitetsplan/aktivitetsplan";
import Dialog from "../komponenter/dialog/dialog";
import DittSykefravaer from "../komponenter/ditt-sykefravaer/ditt-sykefravaer";
import Meldekort from "../komponenter/meldekort/meldekort";

export default () => {
    const {erSykmeldtMedArbeidsgiver} = React.useContext(BrukerInfoContext).data;
    return (
        <>
            <Aktivitetsplan/>
            <div className="tokol">
                <Dialog/>
                {erSykmeldtMedArbeidsgiver ? <DittSykefravaer/> : <Meldekort/>}
            </div>
        </>
    );
};