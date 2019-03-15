import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Parser from 'html-react-parser';

const SoketidspunktInnhold: React.FunctionComponent<InjectedIntlProps> = (props?: InjectedIntlProps) => {

    const innhold = props!.intl.messages['aap-rad-soketidspunkt-innhold'];

    return (
        <div className="panel-innhold">
            {Parser(innhold)}
        </div>
    );
};

export default injectIntl(SoketidspunktInnhold);
