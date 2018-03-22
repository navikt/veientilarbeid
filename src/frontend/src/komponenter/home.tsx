import * as React from 'react';
import Komigang from './komigang/kom-i-gang';
import CV from './cv/cv';

function Home() {
    return (
        <div>
            <Komigang/>
            <CV/>
        </div>
    );
}

export default Home;