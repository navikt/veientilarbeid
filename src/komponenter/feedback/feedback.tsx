import React, { useEffect, useState } from 'react';
import { Xknapp } from 'nav-frontend-ikonknapper';
import { useLocalStorage } from '../../hooks/use-localstorarge';

import Alternativ from './alternativ';

interface Props {
    id: string;
    tekst: string;
    alternativer: Array<string>;
}

function Feedback({ id, tekst, alternativer }: Props) {
    const [visFeedback, setVisFeedback] = useLocalStorage(`vis-${id}`, {
        updated: new Date(),
        state: true,
    });
    const [skjulKomponent, setSkjulKomponent] = useState(false);

    const handleSkjulKomponent = () =>
        setVisFeedback({
            updated: new Date(),
            state: false,
        });

    useEffect(() => {
        const { state } = visFeedback;
        setSkjulKomponent(!state);
    }, [visFeedback]);

    if (skjulKomponent) return null;

    return (
        <>
            <div>{tekst}</div>
            {alternativer &&
                Array.isArray(alternativer) &&
                alternativer.map((alternativ) => <Alternativ feedbackId={id} alternativ={alternativ} />)}
            <Xknapp onClick={handleSkjulKomponent} />
        </>
    );
}

export default Feedback;
