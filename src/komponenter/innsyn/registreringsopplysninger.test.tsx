import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Opplysninger from './registreringsopplysninger';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import '@testing-library/jest-dom/extend-expect';
import { DinSituasjonSvar } from '../../ducks/brukerregistrering';

const registreringsopplysninger = {
    manueltRegistrertAv: null,
    opprettetDato: '2020-01-03T11:53:05.486686+01:00',
    besvarelse: {
        utdanning: 'INGEN_UTDANNING',
        utdanningBestatt: 'INGEN_SVAR',
        utdanningGodkjent: 'INGEN_SVAR',
        helseHinder: 'NEI',
        andreForhold: 'NEI',
        sisteStilling: 'Barne- og ungdomsarbeider i skolefritidsordning',
        dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
        fremtidigSituasjon: 'NY_ARBEIDSGIVER',
        tilbakeIArbeid: 'USIKKER',
    },
    profilering: {
        innsatsgruppe: 'SITUASJONSBESTEMT_INNSATS',
    },
    teksterForBesvarelse: [
        {
            sporsmalId: 'fremtidigSituasjon',
            sporsmal: 'Hva tenker du om din fremtidige situasjon?',
            svar: 'Jeg trenger ny jobb',
        },
        {
            sporsmalId: 'utdanningBestatt',
            sporsmal: 'Er utdanningen din bestått?',
            svar: 'Ikke aktuelt svar',
        },
        {
            sporsmalId: 'utdanningGodkjent',
            sporsmal: 'Er utdanningen din godkjent i Norge?',
            svar: 'Ikke aktuelt',
        },
        {
            sporsmalId: 'utdanning',
            sporsmal: 'Hva er din høyeste fullførte utdanning?',
            svar: 'Ingen utdanning',
        },
        {
            sporsmalId: 'andreForhold',
            sporsmal: 'Er det noe annet enn helsen din som NAV bør ta hensyn til?',
            svar: 'Nei',
        },
    ],
};

describe('Tester registreringsopplysninger komponenten', () => {
    test('Rendrer komponenten og tekstene', () => {
        const props: ProviderProps = {
            underOppfolging: { underOppfolging: true },
        };
        render(<Opplysninger {...registreringsopplysninger} />, { wrapper: contextProviders(props) });
        expect(screen.getByText(/du kan endre opplysningene du ga ved å kontakte nav./i)).toBeTruthy();
        const { teksterForBesvarelse } = registreringsopplysninger;
        teksterForBesvarelse.forEach(({ sporsmal, svar }) => {
            expect(screen.getByText(sporsmal)).toBeTruthy();
            expect(screen.getByText(svar)).toBeTruthy();
        });
        expect(screen.queryAllByAltText(/denne teksten skal ikke være her/i).length).toBe(0);
    });
    test('Klikk på lenken fungerer', () => {
        const props: ProviderProps = {
            underOppfolging: { underOppfolging: true },
        };
        const mockHandleClick = jest.fn();
        render(<Opplysninger {...registreringsopplysninger} />, { wrapper: contextProviders(props) });
        const knapp = screen.getByText(/gi beskjed til veilederen din/i);
        knapp.onclick = (event) => {
            event.preventDefault();
            mockHandleClick();
        };
        userEvent.click(knapp);
        expect(mockHandleClick).toHaveBeenCalledTimes(1);
    });

    test('Komponenten rendres IKKE når bruker IKKE er under oppfølging', () => {
        const props: ProviderProps = {
            underOppfolging: { underOppfolging: false },
        };
        const { container } = render(<Opplysninger {...registreringsopplysninger} />, {
            wrapper: contextProviders(props),
        });
        expect(container).toBeEmptyDOMElement();
    });
});
