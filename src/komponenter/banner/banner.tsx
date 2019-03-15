import * as React from 'react';
import Brodsmuler from '../brodsmuler/brodsmuler';
import { Sidetittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import './banner.less';

interface BannerProps {
    tittelId: string;
    brodsmuleId: string;
}

const Banner: React.FunctionComponent<BannerProps> = (props: BannerProps) => {
    return (
        <header className="banner">
            <div className="banner--veientilarbeid">
                <Brodsmuler brodsmuleId={props.brodsmuleId}/>
                <Sidetittel className="banner--veientilarbeid__tittel">
                    <FormattedMessage id={props.tittelId}/>
                </Sidetittel>
            </div>
        </header>
    );
};

export default Banner;
