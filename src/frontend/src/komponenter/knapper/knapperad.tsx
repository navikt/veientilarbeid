import * as React from 'react';

interface KnapperadProps {
    children: React.ReactElement<Element>;
}

function Knapperad({ children }: KnapperadProps) {
    return(
        <div className="knapperad">
            {children}
        </div>
    );
}

export default Knapperad;