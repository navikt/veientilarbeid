import * as React from 'react';
import Tjenester from './tjenester/tjenester';
import Komigang from './overskrift/kom-i-gang';
import Oppgaver from './oppgaver/oppgaver';
import HomeModal from './homeModal';

function Home() {
    return (
        <div className='body__wrapper'>
            <HomeModal/>
            <Komigang/>
            <Oppgaver />
            <Tjenester/>
        </div>
    );
}

export default Home;