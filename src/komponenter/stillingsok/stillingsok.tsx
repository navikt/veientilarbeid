import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { Input } from 'nav-frontend-skjema';
import './stillingsok.less';
import { klikkPaSokLedigeStillinger } from '../../metrics';

export const STILLINGSOK_URL = 'https://stillingsok.nav.no/stillinger';

interface InputState {
    inputValue: string;
}

class StillingSok extends React.Component<InjectedIntlProps, InputState> {

    constructor(props: InjectedIntlProps) {
        super(props);
        this.state = {
            inputValue: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            inputValue: e.currentTarget.value
        });
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>, url: string, inputValue: string) {
        e.preventDefault();

        location.href = url;

        const sokeKnappType = inputValue !== '' ? 'SOK-SPESIFIKK-STILLING' : 'SE-ALLE-STILLINGER';
        klikkPaSokLedigeStillinger(sokeKnappType);
    }

    render() {
        const intl = this.props.intl;
        const { inputValue } = this.state;
        const URL = `${STILLINGSOK_URL}?q=${inputValue}`;

        return (
            <div className="stillingsok">
                <Innholdstittel className="stillingsok__tittel blokk-s">
                    <FormattedMessage id="stillingsok-overskrift" />
                </Innholdstittel>
                <form
                    className="input-container"
                    role="search"
                    onSubmit={event => this.handleSubmit(event, URL, inputValue)}
                >
                    <Input
                        className="sok-stillinger-input"
                        type="search"
                        label="Søk:"
                        aria-label={intl.messages['stillingsok-placeholder']}
                        placeholder={intl.messages['stillingsok-placeholder']}
                        onChange={event => this.handleChange(event)}
                    />
                    <button className="sok-stillinger-knapp knapp knapp--hoved" type="submit">
                        {inputValue === ''
                            ? <FormattedMessage id="stillingsok-knapp-sok-alle" />
                            : <FormattedMessage id="stillingsok-knapp-sok" />
                        }
                    </button>
                </form>
            </div>
        );
    }
}
export default injectIntl(StillingSok);
