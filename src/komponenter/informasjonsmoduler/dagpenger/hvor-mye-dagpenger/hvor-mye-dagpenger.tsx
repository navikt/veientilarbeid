import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import TableBody from './table-body';

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
                <div
                    dangerouslySetInnerHTML={{
                        __html: intl.messages['dagpenger.belop.innhold']
                    }}
                />
                <table>
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
                <div
                    dangerouslySetInnerHTML={{
                        __html: intl.messages['dagpenger.belop.ekstra']
                    }}
                />
            </>
        );
    }
}

/*
<tbody>
                        <tr>
                            <th>{intl.messages['dagpenger.belop.tabell.1.kol.1']}</th>
                            <th>{intl.messages['dagpenger.belop.tabell.1.kol.2']}</th>
                            <th>{intl.messages['dagpenger.belop.tabell.1.kol.3']}</th>
                        </tr>
                        <tr>
                            <th>{intl.messages['dagpenger.belop.tabell.2.kol.1']}</th>
                            <th>{intl.messages['dagpenger.belop.tabell.2.kol.2']}</th>
                            <th>{intl.messages['dagpenger.belop.tabell.2.kol.3']}</th>
                        </tr>
                        <tr>
                            <th>{intl.messages['dagpenger.belop.tabell.3.kol.1']}</th>
                            <th>{intl.messages['dagpenger.belop.tabell.3.kol.2']}</th>
                            <th>{intl.messages['dagpenger.belop.tabell.3.kol.3']}</th>
                        </tr>
                        <tr>
                            <th>{intl.messages['dagpenger.belop.tabell.4.kol.1']}</th>
                            <th>{intl.messages['dagpenger.belop.tabell.4.kol.2']}</th>
                            <th>{intl.messages['dagpenger.belop.tabell.4.kol.3']}</th>
                        </tr>
                        <tr>
                            <th>{intl.messages['dagpenger.belop.tabell.5.kol.1']}</th>
                            <th>{intl.messages['dagpenger.belop.tabell.5.kol.2']}</th>
                            <th>{intl.messages['dagpenger.belop.tabell.5.kol.3']}</th>
                        </tr>
                    </tbody>
 */

export default injectIntl(HvorMyeDagpenger);