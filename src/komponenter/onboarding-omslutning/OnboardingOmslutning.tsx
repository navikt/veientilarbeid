import Panel from 'nav-frontend-paneler';
import './OnboardingOmslutning.less';

const OnboardingOmslutning = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
    <div className={'kort-omslutning'}>
        <Panel className={'kort-panel'}>
            <div className={'kort-innhold'}>{children}</div>
        </Panel>
    </div>
);

export default OnboardingOmslutning;
