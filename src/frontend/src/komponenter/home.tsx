import * as React from 'react';
import Tjenester from './tjenester/tjenester';
import InformasjonsmodulDagpenger from './informasjonsmodul-dagpenger/informasjonsmodul-dagpenger';

import Komigang from './komigang/kom-i-gang';

function Home() {
    return (
        <div>
            <Komigang/>
            <InformasjonsmodulDagpenger/>
            <Komigang/>
            <Tjenester/>
        </div>
    );
}

export default Home;