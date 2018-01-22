import { stubFetchWithErrorResponse, stubFetchWithResponse } from '../test/test-utils';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { fetchToJson } from './utils';

chai.use(chaiAsPromised);
const expect = chai.expect;

afterEach(() => fetch.restore());

describe('Test fetchToJson', () => {
    it('skal feile', () => {
        stubFetchWithErrorResponse();
        return expect(fetchToJson({url: 'url'})).to.be.rejected;
    });

    it('skal reocover med object', () => {
        stubFetchWithErrorResponse();
        return expect(fetchToJson({url: 'url', recoverWith: {foo: 'bar'}})).to.eventually.have.property('foo');
    });
    it('skal reocover med function', () => {
        stubFetchWithErrorResponse();
        return expect(fetchToJson({url: 'url', recoverWith: () => ({foo: 'bar'})})).to.eventually.have.property('foo');
    });
    it('skal reocover om 404', () => {
        stubFetchWithErrorResponse(404);
        return expect(fetchToJson({
            url: 'url',
            recoverWith: (status) => status === 404 ? {foo: 'bar'} : undefined,
        })).to.eventually.have.property('foo');
    });
    it('skal ikke reocover om 500', () => {
        stubFetchWithErrorResponse(500);
        return expect(fetchToJson({
            url: 'url',
            recoverWith: (status) => status === 404 ? {foo: 'bar'} : undefined,
        })).to.be.rejected;
    });
    it('skal ikke reocover om 500', () => {
        stubFetchWithErrorResponse(500);
        return expect(fetchToJson({
            url: 'url',
            recoverWith: (status) => status === 404 ? {foo: 'bar'} : null,
        })).to.be.rejected;
    });
    it('skal ikke recover dersom fetch-kall er ok', () => {
        stubFetchWithResponse({bar: 'foo'});
        return expect(fetchToJson({
            url: 'url',
            recoverWith: {foo: 'bar'},
        })).to.eventually.have.property('bar');
    });

});