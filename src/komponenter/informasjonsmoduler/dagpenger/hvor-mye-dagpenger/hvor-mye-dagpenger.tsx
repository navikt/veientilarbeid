import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import TableBody from './table-body';
import { Undertekst } from 'nav-frontend-typografi';

interface DummyProp {
    dummy?: string; // TypeScript klager hvis props kun er InjectedIntlProps
}

type Props = DummyProp & InjectedIntlProps;

class HvorMyeDagpenger extends React.Component<Props> {

    getTabellverdi(rad: number, kolonne: number): string {
        return this.props.intl.messages[`dagpenger.belop.tabell.${rad}.kol.${kolonne}`];
    }

    render() {
        const intl = this.props.intl;

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
                <table className="hvor-mye-dagpenger__tabell blokk-l">
                    <caption>{intl.messages['dagpenger.belop.tabell.caption']}</caption>
                    <thead>
                    <tr>
                        <th><Undertekst>{intl.messages['dagpenger.belop.tabell.1.header']}</Undertekst></th>
                        <th><Undertekst>{intl.messages['dagpenger.belop.tabell.2.header']}</Undertekst></th>
                        <th><Undertekst>{intl.messages['dagpenger.belop.tabell.3.header']}</Undertekst></th>
                    </tr>
                    </thead>
                    <TableBody
                        antallRader={3}
                        antallKolonner={5}
                        getTabellverdi={(rad, kolonne) => this.getTabellverdi(rad, kolonne)}
                    />
                </table>
                <FormattedMessage id="dagpenger.belop.ekstra">
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