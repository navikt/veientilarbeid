import * as React from 'react';
import Komigang from './komigang/kom-i-gang';
import Ressurslenker from './ressurslenker/ressurslenker';
import Dagpenger from './informasjonsmoduler/dagpenger/dagpenger';

function Home() {
    return (
        <>
            <Komigang/>
            <Ressurslenker/>
            <Dagpenger/>
        </>
    );
}

export default Home;