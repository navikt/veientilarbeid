import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

interface DummyProp {
    dummy?: string; // TypeScript klager hvis props kun er InjectedIntlProps
}

type Props = DummyProp & InjectedIntlProps;

class NarBorDuSokeOmDagpenger extends React.Component<Props> {
    render() {
        const intl = this.props.intl;
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: intl.messages['dagpenger.soketidspunkt.definisjonsliste-innhold']
                }}
            />
        );
    }
}

export default injectIntl(NarBorDuSokeOmDagpenger);