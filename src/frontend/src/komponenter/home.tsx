import * as React from 'react';
import Tjenester from './tjenester/tjenester';
import Komigang from './overskrift/kom-i-gang';
import Oppgaver from './oppgaver/oppgaver';

function Home() {
    return (
        <div>
            <Komigang/>
            <Oppgaver />
            <Tjenester/>
        </div>
    );
}

export default Home;