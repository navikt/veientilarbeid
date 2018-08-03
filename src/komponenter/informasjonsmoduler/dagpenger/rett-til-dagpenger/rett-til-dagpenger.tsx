import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { Element } from 'nav-frontend-typografi';

interface DummyProp {
    dummy?: string; // TypeScript klager hvis props kun er InjectedIntlProps
}

type Props = DummyProp & InjectedIntlProps;

class RettTilDagpenger extends React.Component<Props> {
    render() {
        const intl = this.props.intl;
        const arstall = new Date().getFullYear();
        const augmentedValues = {
            arstall,
            arstallMinusEn: arstall - 1,
            arstallMinusTo: arstall - 2,
            arstallMinusTre: arstall - 3
        };

        return (
            <>
                <Element className="blokk-s">
                    {intl.messages['dagpenger.undertittel.rett-til-dagpenger.ingress']}
                </Element>
                <div className="dagpenger-innhold typo-normal">
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
                </div>
            </>
        );
    }
}

export default injectIntl(RettTilDagpenger);