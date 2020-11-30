import * as React from 'react';
import GenerelleFliser from './komponenter/dittnav/generelle-fliser';

interface OwnProps {
    children: React.ReactNode;
}

interface OwnState {
    hasError: boolean;
}

export default class ErrorBoundary extends React.Component<OwnProps, OwnState> {
    constructor(props: OwnProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }

    componentDidCatch(error: any, info: any) {
        const w = window as any;
        const logError = w.frontendlogger
            ? w.frontendlogger.error
            : (message: any) => {
                  console.error(message);
              };

        logError({
            error: error,
            info: info,
            meta: 'Logget fra Error Boundary',
        });
    }
    render() {
        if (this.state.hasError) {
            return <GenerelleFliser />;
        }
        return this.props.children;
    }
}
