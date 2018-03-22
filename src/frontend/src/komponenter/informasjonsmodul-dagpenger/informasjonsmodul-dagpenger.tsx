import * as React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import StortEkspanderbartpanel from "./stort-ekspanderbartpanel/src";

export default class InformasjonsmodulDagpenger extends React.Component {
    render() {
        return (
            <StortEkspanderbartpanel
                tittel="Slik ser et panel ut"
                tittelProps="element"
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
        );
    }
}