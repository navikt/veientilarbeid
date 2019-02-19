import * as React from 'react';
import Lenkepanel from 'nav-frontend-lenkepanel';
import './dialog.less';

class Dialog extends React.Component  {
    render() {
        return (
            <section className="dialog">
                <Lenkepanel href="./aktivitetsplan/dialog" tittelProps="undertittel" border={true}>
                    Dialog
                </Lenkepanel>
            </section>
        );
    }
}

export default Dialog;
