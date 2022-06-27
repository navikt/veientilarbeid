import { fjernQueryParam, hentQueryParam } from '../utils/query-param-utils';
import { DemoData } from '../demo/demo-state';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

interface GjelderFraDatoModalProviderType {
    visModal: boolean;
    settVisModal: () => void;
    settLukkModal: () => void;
}

const GjelderFraDatoModalContext = createContext<GjelderFraDatoModalProviderType>({
    visModal: false,
    settVisModal() {},
    settLukkModal() {},
});

function GjelderFraDatoModalProvider(props: { children: ReactNode }) {
    const [visModal, settVisModal] = useState<boolean>(false);

    useEffect(() => {
        settVisModal(hentQueryParam(DemoData.VIS_GJELDER_FRA_DATO) === 'true');
    }, []);

    const onClose = useCallback(() => {
        fjernQueryParam(DemoData.VIS_GJELDER_FRA_DATO);
        settVisModal(false);
    }, [settVisModal]);

    const onShow = useCallback(() => {
        settVisModal(true);
    }, [settVisModal]);

    const contextValue = {
        visModal,
        settVisModal: onShow,
        settLukkModal: onClose,
    };

    return (
        <GjelderFraDatoModalContext.Provider value={contextValue}>{props.children}</GjelderFraDatoModalContext.Provider>
    );
}

function useGjelderFraDatoModal() {
    const context = useContext(GjelderFraDatoModalContext);

    if (context === undefined) {
        throw new Error('useGjelderFraDatoModal må brukes under en GjelderFraDatoModalProvider');
    }

    return context;
}

export { GjelderFraDatoModalProvider, useGjelderFraDatoModal };
