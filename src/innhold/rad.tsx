import * as React from 'react';

const Rad: React.FunctionComponent = ({children}) => {
    return (
        <div className="rad">
            <div className="limit">
                {children}
            </div>
        </div>
    );
};

export default Rad;
