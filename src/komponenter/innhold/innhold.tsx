import * as React from 'react';
import Aktivitetsplanen from '../komigang/aktivitetsplanen';
import Ressurslenker from '../ressurslenker/ressurslenker';
import Dagpenger from '../informasjonsmoduler/dagpenger/dagpenger';

function Innhold() {
    return (
        <div className="innhold">
            <Aktivitetsplanen/>
            <Ressurslenker/>
            <Dagpenger/>
        </div>
    );
}

export default Innhold;