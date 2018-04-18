import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';

interface DummyProp {
    dummy?: string; // TypeScript klager hvis props kun er InjectedIntlProps
}

type Props = DummyProp & InjectedIntlProps;

class RettTilDagpenger extends React.Component<Props> {
    render() {
        const intl = this.props.intl;
        const arstall = parseInt(intl.messages['meta.arstall'], 10);
        const augmentedValues = {
            arstall,
            arstallMinusEn: arstall - 1,
            arstallMinusTo: arstall - 2,
            arstallMinusTre: arstall - 3
        };

        return (
            <>
                <Normaltekst>
                    {intl.messages['dagpenger.undertittel.rett-til-dagpenger.ingress']}
                </Normaltekst>
                <FormattedMessage id="dagpenger.innhold" values={augmentedValues}>
                    {(text: string) => {
                        return (
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: text
                                }}
                            />
                        );
                    }}
                </FormattedMessage>
            </>
        );
    }
}

export default injectIntl(RettTilDagpenger);