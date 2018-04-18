import * as React from 'react';
import StortEkspanderbartpanel from '../informasjonsmodul/src/index';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import EkspanderbartpanelGruppe from '../ekspanderbartpanel-gruppe/ekspanderbartpanel-gruppe';
import { EkspanderbartpanelPure } from 'nav-frontend-ekspanderbartpanel';
import { Ingress } from 'nav-frontend-typografi';
import LenkeMedChevron from '../../lenke-med-chevron/lenke-med-chevron';
import HvorMyeDagpenger from './hvor-mye-dagpenger/hvor-mye-dagpenger';
import RettTilDagpenger from './rett-til-dagpenger';
import UnderpanelInnhold from './underpanel-innhold/underpanel-innhold';

const SOKNAD_OM_DAGPENGER_PATH = '/veiledearbeidssoker/mistet-jobben/dagpenger-soknadsprosess';

interface DummyProp {
    dummy?: string; // TypeScript klager hvis props kun er InjectedIntlProps
}

type Props = DummyProp & InjectedIntlProps;

class Dagpenger extends React.Component<Props> {
    render() {
        const intl = this.props.intl;
        const fellesEkspanderbartpanelProps = {
            tittelProps: 'element',
            // tslint:disable-next-line
            onClick: () => {},
            apen: false
        };
        return (
            <div className="informasjonsmoduler">
                <div className="informasjonsmodul__wrapper">
                    <StortEkspanderbartpanel
                        tittel={intl.messages['informasjonsmodul-dagpenger-tittel']}
                        undertekst={intl.messages['informasjonsmodul-dagpenger-undertekst']}
                        figur="utklippstavle"
                        // tslint:disable-next-line
                        onClick={() => {}}
                        apen={false}
                    >
                        <div className="informasjonsmodul-ingress__wrapper">
                            <Ingress>
                                Dagpenger er en delvis erstatning for tapt arbeidsinntekt når du mister jobben.
                            </Ingress>
                        </div>
                        <EkspanderbartpanelGruppe>
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
                                        <HvorMyeDagpenger />
                                    </UnderpanelInnhold>
                                </div>
                            </EkspanderbartpanelPure>
                        </EkspanderbartpanelGruppe>
                        <div className="informasjonsmodul__lenke-wrapper">
                            <LenkeMedChevron path={SOKNAD_OM_DAGPENGER_PATH}>
                                {intl.messages['informasjonsmodul-dagpenger-lenke']}
                            </LenkeMedChevron>
                        </div>
                    </StortEkspanderbartpanel>
                </div>
            </div>
        );
    }
}

export default injectIntl(Dagpenger);