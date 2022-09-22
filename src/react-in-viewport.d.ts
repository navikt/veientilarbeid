declare module 'react-in-viewport' {
    import { ReactNode } from 'react';
    import { P } from 'vitest/dist/global-d05ffb3f';
    import { Props } from 'react-in-viewport/dist/types/lib/types';
    export type ViewportConfig = {
        disconnectOnLeave?: boolean;
    };

    export function handleViewport<P>(
        block: (props: Props & ViewportProps) => JSX.Element | null,
        options?: IntersectionObserver,
        config?: ViewportConfig
    ): React.ComponentType<P & { onEnterViewport?: VoidFunction; onLeaveViewport?: VoidFunction }>;

    export type PropsInViewport = {
        inViewport: boolean;
        enterCount: number;
        leaveCount: number;
        forwardedRef?: React.MutableRefObject;
        onEnterViewport?: VoidFunction;
        onLeaveViewport?: VoidFunction;
    };

    export default handleViewport;
}
