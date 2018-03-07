import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import {getCurrentUrlWithoutQueryParam} from './utils';

chai.use(chaiAsPromised);
const expect = chai.expect;


describe('Test utils', () => {
    it('skal kunne fjerne queryparam fra url', () => {
        expect(getCurrentUrlWithoutQueryParam(
            'param',
            'http://www.test.no/fane',
            '?query=hei&param=5')
        ).to.equal('http://www.test.no/fane?query=hei');
    });
});