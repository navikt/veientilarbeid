import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Html from '../../../komponenter/html';

const SoketidspunktInnhold: React.SFC<InjectedIntlProps> = (props?: InjectedIntlProps) => {

    const innhold = props!.intl.messages['aap-rad-soketidspunkt-innhold'];

    return (
        <div className="panel-innhold">
            <Html html={innhold}/>
        </div>
    );
};

export default injectIntl(SoketidspunktInnhold);
