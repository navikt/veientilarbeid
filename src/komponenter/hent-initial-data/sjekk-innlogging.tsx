import * as React from 'react';
import { AutentiseringContext, InnloggingsNiva } from '../../ducks/autentisering';
import { ReactNode } from 'react';

export type SjekkInnloggingProps = { children: ReactNode; bypassComponent: ReactNode };

export default function SjekkInnlogging({ children, bypassComponent }: SjekkInnloggingProps): React.ReactElement {
    const { securityLevel } = React.useContext(AutentiseringContext).data;

    if (securityLevel === InnloggingsNiva.LEVEL_3) return <>{bypassComponent}</>;

    return <>{children}</>;
}
