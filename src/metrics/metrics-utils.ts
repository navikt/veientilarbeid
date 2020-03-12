interface InfoPayload {
    message: string;
}

export interface Frontendlogger {
    event: (name: string, fields: any, tags: any) => void;
    info: (payload: InfoPayload) => void;
}

export type FrontendLoggerHelper = (eventNavn: string, feltObjekt?: object, tagObjekt?: object) => void;

export function frontendLogger(eventNavn: string, feltObjekt?: object, tagObjekt?: object) {
    const frontendlogger: Frontendlogger = (window as any).frontendlogger;
    if (frontendlogger) {
        frontendlogger.event(eventNavn, feltObjekt || {}, tagObjekt || {});
    }
}
