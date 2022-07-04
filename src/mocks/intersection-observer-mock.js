import { vi } from 'vitest';

export const mockIntersectionObserver = function () {
    global.IntersectionObserver = vi.fn(function () {
        this.observe = vi.fn();
        this.unobserve = vi.fn();
        this.disconnect = vi.fn();
    });
};
