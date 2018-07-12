import * as React from 'react';
import LenkepanelMedBilde from '../lenkepanel-med-bilde/lenkepanel-med-bilde';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';

export default function Ressurslenker() {
    // TODO I overskrift-blibedrejobbsoker brukes det nobreakspace implisitt. Burde bruke &nbsp; i alle
    // TODO mellomrom etter tankestreken.
    return (
        <div className="ressurslenker">
            <LenkepanelMedBilde
                className="ressurslenker__mia ressurslenke"
                src={require('./mia.svg')}
                alt="Norgeskart med forstørrelsesglass"
                href="/test"
            >
                <Innholdstittel className="blokk-s">
                    Muligheter i arbeidsmarkedet
                </Innholdstittel>
                <Normaltekst className="blokk-s">
                    Utforsk ledige stillinger i kart og se hvor mange stillinger det er i din bransje.
                </Normaltekst>
            </LenkepanelMedBilde>
            <LenkepanelMedBilde
                className="ressurslenker__jobbsokertips ressurslenke"
                src={require('./jobbsokertips.svg')}
                alt="Jobbsøkerutstyr"
                href="/test"
            >
                <Innholdstittel className="blokk-s">
                    Jobbsøkertips
                </Innholdstittel>
                <Normaltekst className="blokk-s">
                    Å søke jobb er en jobb i seg selv. Her er informasjon og råd om hva du bør gjøre for å styrke deg
                    selv som jobbsøker.{/*tslint:disable-line*/}
                </Normaltekst>
            </LenkepanelMedBilde>
        </div>
    );
}