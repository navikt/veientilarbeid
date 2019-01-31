import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { Input } from 'nav-frontend-skjema';
import './stillingsok.less';

export const STILLINGSOK_URL = 'https://stillingsok.nav.no/stillinger'; // tslint:disable-line

interface DummyProp {
    dummy?: string; // TypeScript klager hvis props kun er InjectedIntlProps
}

interface InputState {
    inputValue: string;
}

type Props = DummyProp & InjectedIntlProps;

class StillingSok extends React.Component<Props, InputState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            inputValue: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handlePressEnter = this.handlePressEnter.bind(this);
    }

    handleChange(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        this.setState({
            inputValue: e.currentTarget.value
        });
    }

    handlePressEnter(e: React.KeyboardEvent, url: string) {
        if (e.key === 'Enter') {
           window.location.href = url;
        }
    }

    render() {
        const { inputValue } = this.state;
        const intl = this.props.intl;
        const URL = `${STILLINGSOK_URL}/?q=${inputValue}`;

        return (
            <div className="stillingsok">

                <Innholdstittel className="stillingsok__tittel blokk-s">
                    <FormattedMessage id="stillingsok-overskrift" />
                </Innholdstittel>

                <div className="input-container">
                    <Input
                        className="sok-stillinger-input"
                        label=""
                        placeholder={intl.messages['stillingsok-placeholder']}
                        onChange={event => this.handleChange(event)}
                        onKeyPress={(event) => this.handlePressEnter(event, URL)}
                    />
                    <div className="sok-stillinger-knapp">
                        <a className="knapp knapp--hoved" href={URL}>
                            {inputValue === ''
                                ? <FormattedMessage id="stillingsok-knapp-sok-alle" />
                                : <FormattedMessage id="stillingsok-knapp-sok" />
                            }
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
export default injectIntl(StillingSok);
