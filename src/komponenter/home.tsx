import * as React from 'react';
import Komigang from './komigang/kom-i-gang';
import HvordanSokeJobber from './hvordansokejobber/hvordansokejobber';
import Dagpenger from './informasjonsmoduler/dagpenger/dagpenger';

function Home() {
    return (
        <>
            <Komigang/>
            <Dagpenger/>
            <HvordanSokeJobber/>
        </>
    );
}

export default Home;