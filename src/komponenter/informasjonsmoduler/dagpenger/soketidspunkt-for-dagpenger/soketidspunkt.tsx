import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Datovelger from './datovelger/datovelger';

interface DummyProp {
    dummy?: string; // TypeScript klager hvis props kun er InjectedIntlProps
}

type Props = DummyProp & InjectedIntlProps;

class SoketidspunktForDagpenger extends React.Component<Props> {
    render() {
        return (
            <div>
                <Datovelger/>
            </div>
        );
    }
}

export default injectIntl(SoketidspunktForDagpenger);