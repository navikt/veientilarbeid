import Panel from 'nav-frontend-paneler';
import { Element } from 'nav-frontend-typografi';
import React from 'react';
import { FeaturetoggleContext } from '../../ducks/feature-toggles';
import './OnboardingOmslutning.less';

export interface OnboardingOmslutningProps extends React.ComponentPropsWithoutRef<'div'> {
    children: JSX.Element | JSX.Element[];
}

const OnboardingOmslutning = ({ children, title, className, ...rest }: OnboardingOmslutningProps) => {
    const { data: featuretoggleData } = React.useContext(FeaturetoggleContext);
    const featuretoggleAktivert = featuretoggleData && featuretoggleData['veientilarbeid.vis-oppdatert-styling'];
    return (
        <div
            className={`${className || ''} ${featuretoggleAktivert ? 'oppdatert-kort-omslutning' : 'kort-omslutning'}`}
            {...rest}
        >
            <Panel className={'kort-panel'}>
                {title && <div className="kort-heading"></div>}
                <div className={'kort-innhold'}>
                    <Element tag={'h1'}>{title}</Element>
                    <div className="kort-body">{children}</div>
                </div>
            </Panel>
        </div>
    );
};

export default OnboardingOmslutning;
