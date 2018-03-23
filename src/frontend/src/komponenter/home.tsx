import * as React from 'react';
import Komigang from './komigang/kom-i-gang';
import CV from './cv/cv';
import Arbeidssoker from './arbeidssoker/arbeidssoker';

function Home() {
    return (
        <div>
            <Komigang/>
            <CV/>
            <Arbeidssoker/>
        </div>
    );
}

export default Home;