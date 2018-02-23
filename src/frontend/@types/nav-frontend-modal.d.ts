declare module 'nav-frontend-modal' {
    import * as React from 'react';

    export interface ElementProps {
        closeButton?: boolean;
        isOpen: boolean;
        className?: string;
        contentLabel: string;
        children: React.ReactNode;
        onAfterOpen?: () => void;
        onRequestClose: () => any;
        shouldCloseOnOverlayClick?: boolean;
        closeTimeoutMS?: number;
        contentClass?: string;
    }

    export default class Modal extends React.Component<ElementProps, {}> {}
}