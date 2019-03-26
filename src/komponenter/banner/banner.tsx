import * as React from 'react';
import Brodsmuler from '../brodsmuler/brodsmuler';
import { Sidetittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import './banner.less';

interface BannerProps {
    type: string;
}

const Banner: React.FunctionComponent<BannerProps> = (props: BannerProps) => {
    return (
        <header className="banner">
            <div className="banner--veientilarbeid">
                <Brodsmuler brodsmuleId={`startside-${props.type}-banner-tittel`}/>
                <Sidetittel className="banner--veientilarbeid__tittel">
                    <FormattedMessage id={`startside-${props.type}-banner-brodsmule`}/>
                </Sidetittel>
            </div>
        </header>
    );
};

export default Banner;
