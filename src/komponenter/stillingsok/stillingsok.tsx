import * as React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { Input } from 'nav-frontend-skjema';
import './stillingsok.less';
import { Panel } from 'nav-frontend-paneler';

// export const STILLINGSOK_URL = 'https://stillingsok.nav.no'; // tslint:disable-line

interface Props {
    dummy?: string;
}
interface InputState {
    inputValue: string;
}

class StillingSok extends React.Component<Props, InputState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            inputValue: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            inputValue: e.currentTarget.value;
        });
    }

    render() {
        const knappetekst = this.state.inputValue === '' ? 'stillingsok-knapp-sok' : 'stillingsok-knapp-sok-alle';
        return (
            <Panel className="stillingsok">

                <Innholdstittel className="stillingsok__tittel blokk-s">
                    <FormattedMessage id="stillingsok-overskrift" />
                </Innholdstittel>

                <div className="input-container">
                    <Input
                        className="sok-stillinger-input"
                        label=""
                        placeholder="Søk i ledige stillinger"
                        // value={this.state.inputValue}
                        onChange={ () =>
                            this.handleChange.bind(this)
                        }
                    />
                    <div className="sok-stillinger-knapp">
                        <a className="knapp knapp--hoved" href="https://stillingsok.nav.no">
                            <FormattedMessage id={knappetekst}/>
                        </a>
                    </div>
                </div>
            </Panel>

        );
    }
}
export default StillingSok;
