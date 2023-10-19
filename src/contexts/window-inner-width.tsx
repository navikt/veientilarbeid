import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface WindowInnerWidthProps {
    innerWidth: number;
}

const WindowInnerWidthContext = createContext<WindowInnerWidthProps>({ innerWidth: window.innerWidth });
function WindowInnerWidthProvider(props: { children: ReactNode }) {
    const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const updateInnerWidth = () => {
            setInnerWidth(window.innerWidth);
        };

        window.addEventListener('resize', updateInnerWidth);

        return () => window.removeEventListener('resize', updateInnerWidth);
    }, []);

    return <WindowInnerWidthContext.Provider value={{ innerWidth }}>{props.children}</WindowInnerWidthContext.Provider>;
}

function useWindowInnerWidth() {
    const context = useContext(WindowInnerWidthContext);

    if (context === undefined) {
        throw new Error('useWindowInnerWidth må brukes under en WindowInnerWidthProvider');
    }

    return context;
}

export { WindowInnerWidthProvider, useWindowInnerWidth };
