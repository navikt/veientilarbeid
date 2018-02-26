import * as React from 'react';
import Tjenester from './tjenester/tjenester';
import Komigang from './overskrift/kom-i-gang';
import Oppgaver from './oppgaver/oppgaver';
import Introduksjon from "./introduksjon/introduksjon";

function Home() {
    return (
        <div className='body__wrapper'>
            <Introduksjon/>
            <Komigang/>
            <Oppgaver />
            <Tjenester/>
        </div>
    );
}

export default Home;