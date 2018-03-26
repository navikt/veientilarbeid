import * as React from 'react';
import Komigang from './komigang/kom-i-gang';
import CV from './cv/cv';
import Arbeidssoker from './arbeidssoker/arbeidssoker';
import Informasjon from './informasjon/informasjon';

function Home() {
    return (
        <div>
            <Komigang/>
            <CV/>
            <Informasjon/>
            <Arbeidssoker/>
        </div>
    );
}

export default Home;