import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import { useBehovForVeiledning } from '../../contexts/behov-for-veiledning';
import spacing from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';

const TEKSTER = {
    nb: {
        'oppfolging.STANDARD_INNSATS': 'Jeg ønsker å klare meg selv',
        'oppfolging.SITUASJONSBESTEMT_INNSATS': 'Jeg ønsker oppfølging fra NAV',
        'oppfolging.IKKE_BESVART': 'Ikke besvart',
    },
    en: {
        'oppfolging.STANDARD_INNSATS': 'Jeg ønsker å klare meg selv',
        'oppfolging.SITUASJONSBESTEMT_INNSATS': 'Jeg ønsker oppfølging fra NAV',
        'oppfolging.IKKE_BESVART': 'Ikke besvart',
    },
};

const Oppfolging = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    const { behovForVeiledning } = useBehovForVeiledning();

    return (
        <div className={`${spacing.blokkS}`}>
            <div className={`${flexStyles.flex}`}>
                <strong className={spacing.mr05}>Hva slags veiledning ønsker du?</strong>
            </div>
            <div>
                <div className={`${flexStyles.flex} ${flexStyles.alignCenter} ${flexStyles.wrap}`}>
                    <div className={`${spacing.mr05} ${spacing.mb05}`}>
                        {tekst(`oppfolging.${behovForVeiledning?.oppfolging || 'IKKE_BESVART'}`)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Oppfolging;
