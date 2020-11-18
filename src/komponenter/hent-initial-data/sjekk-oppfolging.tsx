import * as React from 'react';
import InnholdView from '../../innhold/innhold-view';

interface OwnProps {
    underOppfolging: boolean;
    children: React.ReactElement<any>;
}

const SjekkOppfolging = ({ underOppfolging, children }: OwnProps) => {
    if (!underOppfolging) {
        return <InnholdView />;
    }

    return children;
};

export default SjekkOppfolging;
