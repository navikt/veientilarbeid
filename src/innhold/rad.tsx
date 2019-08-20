import * as React from 'react';

const Rad: React.FunctionComponent = ({children}) => {
    return (
        <div className="rad blokk-l">
            <div className="limit">
                {children}
            </div>
        </div>
    );
};

export default Rad;
