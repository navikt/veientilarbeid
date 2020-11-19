import * as React from 'react';
import InnholdView from '../../innhold/innhold-view';

interface OwnProps {
    underOppfolging: boolean;
    children: React.ReactNode;
}

const SjekkOppfolging = ({ underOppfolging, children }: OwnProps): JSX.Element => {
    if (!underOppfolging) {
        return <InnholdView />;
    }

    return <>{children}</>;
};

export default SjekkOppfolging;
