import * as React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import LenkeMedChevron from '../lenke-med-chevron/lenke-med-chevron';
import './sykefravar.less';

const sykefravarSvg = require('./sykefravar.svg');
export const SYKEFRAVAR_URL = '/sykefravar/';

class Sykefravar extends React.PureComponent<{}> {
    render() {
        return (
            <div className="sykefravar">
                <img
                    src={sykefravarSvg}
                    alt="sykefravar-illustrasjon"
                    className="sykefravar__illustrasjon"
                />
                <div className="sykefravar__tekst">
                    <Innholdstittel tag="h2" className="sykefravar__overskrift" >
                        <FormattedMessage id="sykefravar-overskrift"/>
                    </Innholdstittel>
                    <LenkeMedChevron path={SYKEFRAVAR_URL} className="sykefravar__lenke">
                        <FormattedMessage id="sykefravar-lenke"/>
                    </LenkeMedChevron>
                </div>
            </div>
        );
    }
}

export default Sykefravar;