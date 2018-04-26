import * as React from 'react';
import Informasjonsmodul from '../informasjonsmodul/src/index';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import EkspanderbartpanelGruppe from '../ekspanderbartpanel-gruppe/ekspanderbartpanel-gruppe';
import { EkspanderbartpanelPure } from 'nav-frontend-ekspanderbartpanel';
import { Ingress } from 'nav-frontend-typografi';
import LenkeMedChevron from '../../lenke-med-chevron/lenke-med-chevron';
import HvorMyeDagpenger from './hvor-mye-dagpenger/hvor-mye-dagpenger';
import RettTilDagpenger from './rett-til-dagpenger/rett-til-dagpenger';
import UnderpanelInnhold from './underpanel-innhold/underpanel-innhold';
import {
    ekspanderInformasjonsmodul, visRettTilDagPenger,
    visInformasjonsmodul
} from '../../../utils/utils';

const SOKNAD_OM_DAGPENGER_PATH = '/veiledearbeidssoker/mistet-jobben/dagpenger-soknadsprosess';

interface DummyProp {
    dummy?: string; // TypeScript klager hvis props kun er InjectedIntlProps
}

type Props = DummyProp & InjectedIntlProps;

class Dagpenger extends React.Component<Props> {

    componentDidMount() {
        if (visRettTilDagPenger(location.search)) {
            this.scrollTilInformasjonsmodul();
        }
    }

    render() {
        const intl = this.props.intl;

        // Feature-toggle informasjonsmodul 1/3 (sjekk hent-tekster.tsx)
        if (!visInformasjonsmodul(location.search)) {
            return (null);
        }

        const fellesEkspanderbartpanelProps = {
            tittelProps: 'element',
            // tslint:disable-next-line
            onClick: () => {
            },
            apen: false
        };
        return (
            <div className="informasjonsmoduler">
                <div className="informasjonsmodul__wrapper">
                    <Informasjonsmodul
                        id="informasjonsmodul"
                        tittel={intl.messages['informasjonsmodul-dagpenger-tittel']}
                        undertekst={intl.messages['informasjonsmodul-dagpenger-undertekst']}
                        figur="utklippstavle"
                        // tslint:disable-next-line
                        onClick={() => {}}
                        apen={ekspanderInformasjonsmodul(location.search)}
                    >
                        <div className="informasjonsmodul-ingress__wrapper">
                            <Ingress>
                                Dagpenger er en delvis erstatning for tapt arbeidsinntekt når du mister jobben.
                            </Ingress>
                        </div>
                        <EkspanderbartpanelGruppe
                            indexOfOpenEkspanderbartpanel={visRettTilDagPenger(location.search) ? 0 : -1}
                        >
                            <EkspanderbartpanelPure
                                tittel={intl.messages['informasjonsmodul-dagpenger-del-1-tittel']}
                                {...fellesEkspanderbartpanelProps}
                            >
                                <UnderpanelInnhold>
                                    <RettTilDagpenger/>
                                </UnderpanelInnhold>
                            </EkspanderbartpanelPure>
                            <EkspanderbartpanelPure
                                tittel={intl.messages['informasjonsmodul-dagpenger-del-3-tittel']}
                                {...fellesEkspanderbartpanelProps}
                            >
                                <div className="informasjonsmodul__underpanel-innhold-wrapper">
                                    <UnderpanelInnhold>
                                        <HvorMyeDagpenger/>
                                    </UnderpanelInnhold>
                                </div>
                            </EkspanderbartpanelPure>
                        </EkspanderbartpanelGruppe>
                        <div className="informasjonsmodul__lenke-wrapper">
                            <LenkeMedChevron path={SOKNAD_OM_DAGPENGER_PATH}>
                                {intl.messages['informasjonsmodul-dagpenger-lenke']}
                            </LenkeMedChevron>
                        </div>
                    </Informasjonsmodul>
                </div>
            </div>
        );
    }

    scrollTilInformasjonsmodul() {
        setTimeout(() => {
            const isSupported = 'scrollBehavior' in document.documentElement.style;
            const target = document.getElementById('informasjonsmodul');
            if (target) {
                if (isSupported) {
                    window.scrollTo({'behavior': 'smooth', 'top': target.offsetTop});
                } else {
                    window.scrollTo(0, target.offsetTop);
                }
            }

        },         400);
    }
}

export default injectIntl(Dagpenger);