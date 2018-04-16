import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import TableBody from './table-body';
import { Normaltekst } from 'nav-frontend-typografi';

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
            <div className="hvor-mye-dagpenger__wrapper">
                <div className="hvor-mye-dagpenger">
                    <Normaltekst>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: intl.messages['dagpenger.belop.innhold']
                            }}
                        />
                    </Normaltekst>
                    <table className="tabell-enkel blokk-l">
                        <caption>{intl.messages['dagpenger.belop.tabell.caption']}</caption>
                        <thead>
                            <tr>
                                <th>{intl.messages['dagpenger.belop.tabell.1.header']}</th>
                                <th>{intl.messages['dagpenger.belop.tabell.2.header']}</th>
                                <th>{intl.messages['dagpenger.belop.tabell.3.header']}</th>
                            </tr>
                        </thead>
                        <TableBody
                            antallRader={3}
                            antallKolonner={5}
                            getTabellverdi={(rad, kolonne) => this.getTabellverdi(rad, kolonne)}
                        />
                    </table>
                    <Normaltekst>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: intl.messages['dagpenger.belop.ekstra']
                            }}
                        />
                    </Normaltekst>
                </div>
            </div>
        );
    }
}

export default injectIntl(HvorMyeDagpenger);