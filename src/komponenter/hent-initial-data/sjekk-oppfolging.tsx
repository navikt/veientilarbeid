import * as React from 'react';
import InnholdView from '../../innhold/innhold-view';

interface OwnProps {
    underOppfolging: boolean;
    children: React.ReactNode;
}

//TODO: denne må endres når VTA skal vises for alle
const SjekkOppfolging = ({ underOppfolging, children }: OwnProps): JSX.Element => {
    if (!underOppfolging) {
        return <InnholdView />;
    }

    return <>{children}</>;
};

export default SjekkOppfolging;
