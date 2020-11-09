import * as React from 'react';
import { seVeientilarbeidNiva3 } from '../metrics/metrics';
import './innhold.less';
import InnholdView from './innhold-view';

const InnholdLogikkNiva3 = () => {
    React.useEffect(() => {
        seVeientilarbeidNiva3();
    }, []);

    return <InnholdView visRessurslenker={true} skalViseIARBSPlaster={false} />;
};

export default InnholdLogikkNiva3;
