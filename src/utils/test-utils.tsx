import { Matcher, render } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { ReactElement } from 'react';

export function regexMatcher(innhold: RegExp): Matcher {
    return (content: string, node: Element | null) => {
        if (!node) return false;

        const hasText = (innerNode: any) => innhold.test(innerNode.textContent);
        const nodeHasText = hasText(node);
        const childrenDontHaveText = Array.from(node.children).every((child) => !hasText(child));
        return nodeHasText && childrenDontHaveText;
    };
}

const SWRTestConfig = ({ children }: any) => {
    // dedupingInterval settes til 0 så responser ikke caches
    // provider er med for at "toHaveBeenCalled" ikke skal slå ut på kall som tilhører tidligere tester
    return <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>{children}</SWRConfig>;
};

const renderWithSWRConfig = (ui: ReactElement) => {
    return render(ui, { wrapper: SWRTestConfig });
};

export { renderWithSWRConfig as render };
