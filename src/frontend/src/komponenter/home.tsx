import * as React from 'react';
import InformasjonsmodulDagpenger from './informasjonsmodul-dagpenger/informasjonsmodul-dagpenger';

import Komigang from './komigang/kom-i-gang';

function Home() {
    return (
        <div className="body__wrapper">
            <Komigang/>
            <InformasjonsmodulDagpenger/>
        </div>
    );
}

export default Home;