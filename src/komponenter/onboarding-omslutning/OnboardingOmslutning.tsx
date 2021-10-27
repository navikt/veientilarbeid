import Panel from 'nav-frontend-paneler';
import React from 'react';
import './OnboardingOmslutning.less';

export interface OnboardingOmslutningProps extends React.ComponentPropsWithoutRef<'div'> {
    children: JSX.Element | JSX.Element[];
}

const OnboardingOmslutning = ({ children, className, ...rest }: OnboardingOmslutningProps) => (
    <div className={`${className} kort-omslutning`} {...rest}>
        <Panel className={'kort-panel'}>
            <div className={'kort-innhold'}>{children}</div>
        </Panel>
    </div>
);

export default OnboardingOmslutning;
