import * as React from 'react';
import './dialog.less';
import dialogIkon from './dialog.svg';
import { gaTilDialog } from '../../metrics';
import LenkepanelMedIkon from '../lenkepanel-med-bilde/lenkepanel-med-ikon';

export const DIALOG_URL = '/aktivitetsplan/dialog';

class Dialog extends React.Component {
    render() {
        return (
            <section className="dialog blokk-m">
                <div className="limit">
                    <LenkepanelMedIkon
                        href={DIALOG_URL}
                        alt=""
                        onClick={gaTilDialog}
                        ikon={dialogIkon}
                        lenketekst="dialog"
                    />
                </div>
            </section>
        );
    }
}
export default Dialog;
