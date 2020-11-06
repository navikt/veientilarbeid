import * as React from 'react';
import Brodsmuler from '../brodsmuler/brodsmuler';
import { Sidetittel } from 'nav-frontend-typografi';
import './banner.less';
import tekster from '../../tekster/tekster';
import { erMikrofrontend } from '../../utils/app-state-utils';
import { PropsWithChildren } from 'react';
import { BrukerInfoContext } from '../../ducks/bruker-info';

const Banner: React.FunctionComponent<PropsWithChildren<{}>> = () => {
    const { erSykmeldtMedArbeidsgiver } = React.useContext(BrukerInfoContext).data;
    const type = erSykmeldtMedArbeidsgiver ? 'sykmeldt' : 'ordinaer';

    return erMikrofrontend() ? null : (
        <header className="banner">
            <div className="banner--veientilarbeid">
                <Brodsmuler brodsmuleId={`startside-${type}-banner-tittel`} />
                <Sidetittel className="banner--veientilarbeid__tittel">
                    {tekster[`startside-${type}-banner-brodsmule`]}
                </Sidetittel>
            </div>
        </header>
    );
};

export default Banner;
