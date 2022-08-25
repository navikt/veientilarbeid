import { vi } from 'vitest';

export const mockResizeObserver = function () {
    global.ResizeObserver = vi.fn(function () {
        this.observe = vi.fn();
        this.unobserve = vi.fn();
        this.disconnect = vi.fn();
    });
};
