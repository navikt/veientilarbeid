import * as React from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';

import './innholdslaster-laster.less';

interface LasterInterface {
    storrelse?: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
    className?: string;
}

function Laster({ storrelse, className }: LasterInterface) {
    return (
        <div className={className}>
            <NavFrontendSpinner type={storrelse} />
        </div>
    );
}

export default Laster;
