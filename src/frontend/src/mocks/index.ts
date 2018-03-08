/*tslint:disable*/
import { mock, respondWith } from './utils';

(mock as any).mock('*', respondWith((url: string, config: {}) => mock.realFetch.call(window, url, config)));
