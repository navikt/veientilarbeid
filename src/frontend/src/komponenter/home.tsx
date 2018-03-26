import * as React from 'react';
import InformasjonsmodulDagpenger from './informasjonsmodul-dagpenger/informasjonsmodul-dagpenger';

import Komigang from './komigang/kom-i-gang';
import CV from './cv/cv';
import Arbeidssoker from './arbeidssoker/arbeidssoker';

function Home() {
    return (
        <div>
            <Komigang/>
            <CV/>
            <InformasjonsmodulDagpenger/>
            <Arbeidssoker/>
        </div>
    );
}

export default Home;