import * as React from 'react';
import BliBedreJobbsoker from './bli-bedre-jobbsoker';
import HvordanSokeJobber from './hvordan-soke-jobber';

export default function Ressurslenker() {
    // TODO I overskrift-blibedrejobbsoker brukes det nobreakspace implisitt. Burde bruke &nbsp; i alle
    // TODO mellomrom etter tankestreken.
    return (
        <div className="hvordansokejobber-container">
            <div className="hvordansokejobber">
                <HvordanSokeJobber />
                <BliBedreJobbsoker />
            </div>
        </div>
    );
}