import { hentQueryParam } from '../../utils/query-param-utils';
import { DemoData } from '../../demo/demo-state';

function ArbeidsledigDato(): JSX.Element | null {
    const visKomponent = hentQueryParam(DemoData.VIS_ARBEIDSLEDIG_DATO) === 'true';

    if (!visKomponent) {
        return null;
    }

    return (
        <div style={{ backgroundColor: 'hotpink', padding: '1em' }}>
            <h1>Når mistet du eller kommer du til å miste jobben?</h1>
        </div>
    );
}

export default ArbeidsledigDato;
