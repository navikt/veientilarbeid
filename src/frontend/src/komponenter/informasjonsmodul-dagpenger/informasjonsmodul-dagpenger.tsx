import * as React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import StortEkspanderbartpanel from './stort-ekspanderbartpanel/src';

export default class InformasjonsmodulDagpenger extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="test-test" />
                <StortEkspanderbartpanel
                    tittel="Informasjon om dagpenger"
                    undertekst="Les mer om dagpenger og når du må søke"
                    figur="utklippstavle"
                    onClick={() => {}}
                >
                    panel
                    <Ekspanderbartpanel
                        tittel="Slik ser et panel ut"
                        tittelProps="element"
                        onClick={() => {}}
                    >
                        panel inni panel
                    </Ekspanderbartpanel>
                </StortEkspanderbartpanel>
            </React.Fragment>
        );
    }
}