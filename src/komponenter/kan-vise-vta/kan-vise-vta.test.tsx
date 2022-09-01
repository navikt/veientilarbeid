import { render } from '@testing-library/react';
import { Formidlingsgruppe, Servicegruppe } from '../../contexts/oppfolging';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';

describe('tester at komponenten rendrer som forventet', () => {
    test('Komponenten rendres når bruker er standard innsatsgruppe, og toggle er på og kreverStandardInnsatsgruppe prop er true', () => {
        const props: ProviderProps = {
            globaleProps: {
                kreverStandardInnsatsgruppe: true,
            },
            oppfolging: {
                formidlingsgruppe: Formidlingsgruppe.ARBS,
                servicegruppe: Servicegruppe.IKVAL,
            },
            featureToggle: {
                'veientilarbeid.kanViseUtfraSituasjon': true,
            },
        };
        const { container } = render(<p id="testinnhold-kan-vise-vta">Testinnhold</p>, {
            wrapper: contextProviders(props),
        });
        expect(container).not.toBeEmptyDOMElement();
    });

    test('Komponenten rendres ikke når bruker ikke er standard innsatsgruppe, featuretoggle er på og kreverStandardInnsatsgruppe er true', () => {
        const props: ProviderProps = {
            globaleProps: {
                kreverStandardInnsatsgruppe: true,
            },
            oppfolging: {
                formidlingsgruppe: Formidlingsgruppe.IARBS,
                servicegruppe: Servicegruppe.IKVAL,
            },
            featureToggle: {
                'veientilarbeid.kanViseUtfraSituasjon': true,
            },
        };
        const { container } = render(<p id="testinnhold-kan-vise-vta">Testinnhold</p>, {
            wrapper: contextProviders(props),
        });

        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten rendres ikke når bruker er standard innsatsgruppe, toggle er på og kreverStandardInnsatsgruppe er undefind', () => {
        const props: ProviderProps = {
            globaleProps: {
                kreverStandardInnsatsgruppe: undefined,
            },
            oppfolging: {
                formidlingsgruppe: Formidlingsgruppe.ARBS,
                servicegruppe: Servicegruppe.IKVAL,
            },
            featureToggle: {
                'veientilarbeid.kanViseUtfraSituasjon': true,
            },
        };
        const { container } = render(<p id="testinnhold-kan-vise-vta">Testinnhold</p>, {
            wrapper: contextProviders(props),
        });

        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten rendres når bruker ikke er standard innsatsgruppe og featuretoggle er på og kreverStandardInnsatsgruppe er av', () => {
        const props: ProviderProps = {
            globaleProps: {
                kreverStandardInnsatsgruppe: undefined,
            },
            oppfolging: {
                formidlingsgruppe: Formidlingsgruppe.IARBS,
                servicegruppe: Servicegruppe.IKVAL,
            },
            featureToggle: {
                'veientilarbeid.kanViseUtfraSituasjon': true,
            },
        };
        const { container } = render(<p id="testinnhold-kan-vise-vta">Testinnhold</p>, {
            wrapper: contextProviders(props),
        });

        expect(container).not.toBeEmptyDOMElement();
    });

    test('Komponenten rendres når bruker ikke er standard innsatsgruppe toggle er av og kreverStandardInnsatsgruppe er på', () => {
        const props: ProviderProps = {
            globaleProps: {
                kreverStandardInnsatsgruppe: true,
            },
            oppfolging: {
                formidlingsgruppe: Formidlingsgruppe.IARBS,
                servicegruppe: Servicegruppe.IKVAL,
            },
            featureToggle: {
                'veientilarbeid.kanViseUtfraSituasjon': false,
            },
        };
        const { container } = render(<p id="testinnhold-kan-vise-vta">Testinnhold</p>, {
            wrapper: contextProviders(props),
        });

        expect(container).not.toBeEmptyDOMElement();
    });

    test('Komponenten rendres når bruker er standard innsatsgruppe toggle er av og kreverStandardInnsatsgruppe er på', () => {
        const props: ProviderProps = {
            globaleProps: {
                kreverStandardInnsatsgruppe: true,
            },
            oppfolging: {
                formidlingsgruppe: Formidlingsgruppe.ARBS,
                servicegruppe: Servicegruppe.IKVAL,
            },
            featureToggle: {
                'veientilarbeid.kanViseUtfraSituasjon': false,
            },
        };
        const { container } = render(<p id="testinnhold-kan-vise-vta">Testinnhold</p>, {
            wrapper: contextProviders(props),
        });

        expect(container).not.toBeEmptyDOMElement();
    });
});
