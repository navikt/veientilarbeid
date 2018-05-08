//tslint:disable
import * as React from 'react';
import MaskedInput from 'react-maskedinput';
import {erGyldigFormattertDato, ISODateToDatePicker} from './datovelger-utils';

interface Props {
    valgtDato: Date;
    velgDato: (dato: Date) => void;
}

class DatoInputfelt extends React.Component<Props> {
    /*
    const datostring = props.dato;
    const value: string = erGyldigISODato(props.dato) ? ISODateToDatePicker(props.dato) : props.dato;
    */

    endreDato(datostring: string) {
        if (erGyldigFormattertDato(datostring)) {
            console.log(datostring + ' er gyldig');
            this.props.velgDato(new Date(datostring));
        }
    }

    render() {
        return (
            <div className="datovelger__inputContainer">
                <MaskedInput
                    type="tel"
                    mask="11.11.1111"
                    autoComplete="off"
                    placeholder="dd.mm.åååå"
                    disabled={false}
                    className={`skjemaelement__input input--m datovelger__input`}
                    value={ISODateToDatePicker(this.props.valgtDato)}
                    onChange={event => this.endreDato(event.target.value)}
                />
            </div>
        );
    }
}

export default DatoInputfelt;