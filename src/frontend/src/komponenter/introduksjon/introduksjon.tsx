import * as React from 'react';
import {Component} from 'react';
import {Innholdstittel, Normaltekst} from "nav-frontend-typografi";
import OverlaySide from "./overlaySide";
import Overlay from "./overlay";

export default class Introduksjon extends Component {
    render() {
        return (

            <Overlay>
                <OverlaySide/>
                <Innholdstittel>Registreringen er fullført!</Innholdstittel>
                <Normaltekst>Velkommen til din Jobbsøkerprofil! Her finner du CV, Aktivitetsplan og nyttig informasjon til deg som arbeidssøker.</Normaltekst>
            </Overlay>
        );
    }
}