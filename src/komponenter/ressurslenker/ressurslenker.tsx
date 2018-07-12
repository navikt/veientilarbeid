import * as React from 'react';
import LenkepanelMedBilde from '../lenkepanel-med-bilde/lenkepanel-med-bilde';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

export default function Ressurslenker() {
    return (
        <div className="ressurslenker">
            <LenkepanelMedBilde
                className="ressurslenker__mia ressurslenke"
                src={require('./mia.svg')}
                alt="Norgeskart med forstørrelsesglass"
                href="/test"
            >
                <Innholdstittel className="blokk-s">
                    <FormattedMessage id="mia-overskrift" />
                </Innholdstittel>
                <Normaltekst className="blokk-s">
                    <FormattedMessage id="mia-tekst" />
                </Normaltekst>
            </LenkepanelMedBilde>
            <LenkepanelMedBilde
                className="ressurslenker__jobbsokertips ressurslenke"
                src={require('./jobbsokertips.svg')}
                alt="Jobbsøkerutstyr"
                href="/test"
            >
                <Innholdstittel className="blokk-s">
                    <FormattedMessage id="jobbsokertips-overskrift" />
                </Innholdstittel>
                <Normaltekst className="blokk-s">
                    <FormattedMessage id="jobbsokertips-tekst" />
                </Normaltekst>
            </LenkepanelMedBilde>
        </div>
    );
}