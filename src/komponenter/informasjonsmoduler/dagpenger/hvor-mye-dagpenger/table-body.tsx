import * as React from 'react';
import { EtikettLiten } from 'nav-frontend-typografi';

interface Props {
    antallRader: number;
    antallKolonner: number;
    getTabellverdi: (rad: number, kolonne: number) => string;
}

export default class TableBody extends React.Component<Props> {
    render() {
        const {antallRader, antallKolonner, getTabellverdi} = this.props;

        const rader = this.lagListeMedHeltall(1, antallKolonner).map((rad) => {
            const verdierIRad = this.lagListeMedHeltall(1, antallRader).map((kolonne) => {
                return (
                    <td key={kolonne}>
                        <EtikettLiten>
                            {getTabellverdi(rad, kolonne)}
                        </EtikettLiten>
                    </td>
                );
            });
            return (<tr key={rad}>{verdierIRad}</tr>);
        });

        return (<tbody>{rader}</tbody>);
    }

    lagListeMedHeltall(fraOgMed: number, antall: number): number[] {
        return Array(antall).fill(0)
            .map((_, index) => index + fraOgMed);
    }
}