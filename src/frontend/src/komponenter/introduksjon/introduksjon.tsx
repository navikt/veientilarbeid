import * as React from 'react';
import {Component} from 'react';
import {Innholdstittel, Normaltekst} from "nav-frontend-typografi";
import OverlaySide from "./overlaySide";
import Overlay from "./overlay";

export default class Introduksjon extends Component {
    render() {
        return (
            <Overlay gjeldendeSide={0}>
                <OverlaySide>
                    <div className='overlay__illustrasjon-jobbsoker'/>
                    <Innholdstittel className="blokk-s">Registreringen er fullført!</Innholdstittel>
                    <Normaltekst>Velkommen til din Jobbsøkerprofil! Her finner du CV, Aktivitetsplan og nyttig informasjon til deg som arbeidssøker.</Normaltekst>
                </OverlaySide>
                <OverlaySide/>
            </Overlay>
        );
    }
}