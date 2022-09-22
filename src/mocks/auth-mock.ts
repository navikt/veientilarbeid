import { InnloggingsNiva, Data } from '../contexts/autentisering';

const authMock: Data = {
    authenticated: true,
    securityLevel: InnloggingsNiva.LEVEL_4,
};

export default authMock;

export const authenticatedMock = (securityLevel?: InnloggingsNiva) => {
    return { authenticated: true, securityLevel: securityLevel ? securityLevel : InnloggingsNiva.LEVEL_4 };
};
