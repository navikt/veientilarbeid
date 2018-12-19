import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';

import './hvor-mye-dagpenger.less';

interface DummyProp {
    dummy?: string; // TypeScript klager hvis props kun er InjectedIntlProps
}

type Props = DummyProp & InjectedIntlProps;

class HvorMyeDagpenger extends React.Component<Props> {

    getTabellverdi(rad: number, kolonne: number): string {
        return this.props.intl.messages[`dagpenger.belop.tabell.${rad}.kol.${kolonne}`];
    }

    render() {
        return (
            <>
                <FormattedMessage id="dagpenger.belop.innhold">
                    {(text: string) => {
                        return (
                            <div
                                className="typo-normal"
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

export default injectIntl(HvorMyeDagpenger);
