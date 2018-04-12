import * as React from 'react';
import Komigang from './komigang/kom-i-gang';
import HvordanSokeJobber from './hvordansokejobber/hvordansokejobber';

function Home() {
    return (
        <>
            <Komigang/>
            <HvordanSokeJobber/>
        </>
    );
}

export default Home;