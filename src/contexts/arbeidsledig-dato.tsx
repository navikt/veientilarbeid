import { fjernQueryParam, hentQueryParam } from '../utils/query-param-utils';
import { DemoData } from '../demo/demo-state';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

interface ArbeidsledigDatoProviderType {
    visModal: boolean;
    settVisModal: () => void;
    settLukkModal: () => void;
}

const ArbeidsledigDatoContext = createContext<ArbeidsledigDatoProviderType>({
    visModal: false,
    settVisModal() {},
    settLukkModal() {},
});

function ArbeidsledigDatoProvider(props: { children: ReactNode }) {
    const [visModal, settVisModal] = useState<boolean>(false);

    useEffect(() => {
        settVisModal(hentQueryParam(DemoData.VIS_ARBEIDSLEDIG_DATO) === 'true');
    }, []);

    const onClose = useCallback(() => {
        fjernQueryParam(DemoData.VIS_ARBEIDSLEDIG_DATO);
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

    return <ArbeidsledigDatoContext.Provider value={contextValue}>{props.children}</ArbeidsledigDatoContext.Provider>;
}

function useArbeidsledigDato() {
    const context = useContext(ArbeidsledigDatoContext);

    if (context === undefined) {
        throw new Error('useArbeidsledigDato må brukes under en ArbeidsledigDatoProvider');
    }

    return context;
}

export { ArbeidsledigDatoProvider, useArbeidsledigDato };
