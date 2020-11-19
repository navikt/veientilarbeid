import * as React from 'react';
import InnholdLogikkNiva3 from '../../innhold/innhold-logikk-niva3';

interface OwnProps {
    underOppfolging: boolean;
    children: React.ReactElement<any>;
}

const SjekkOppfolging = ({ underOppfolging, children }: OwnProps) => {
    if (!underOppfolging) {
        return <InnholdLogikkNiva3 />;
    }

    return children;
};

export default SjekkOppfolging;
