import * as React from 'react';

interface OwnProps {
    children: React.ReactNode;
}

export default class ErrorBoundary extends React.Component<OwnProps> {
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
        return this.props.children;
    }
}
