import { useEffect, useState } from 'react';
import flex from './flex.module.css';
import AiaTabs from './tabs/aia-tabs';
import InnholdStandard from './innhold/innhold-standard';

const MIN_TABS_BREDDE = 666;
function StandardWrapper() {
    const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const updateInnerWidth = () => {
            setInnerWidth(window.innerWidth);
        };

        window.addEventListener('resize', updateInnerWidth);

        return () => window.removeEventListener('resize', updateInnerWidth);
    }, []);

    const brukTabs = innerWidth > MIN_TABS_BREDDE;

    return <div className={`${flex.flex} ${flex.center}`}>{brukTabs ? <AiaTabs /> : <InnholdStandard />}</div>;
}

export default StandardWrapper;
