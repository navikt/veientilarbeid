import * as React from 'react';
import Banner from '../banner/banner';

interface SideProps {
    bannerTittelId: string;
    bannerBrodsmuleId: string;
    children?: React.ReactNode | React.ReactNode[];
}

const Side: React.SFC<SideProps> = (props: SideProps) => {
    return (
        <>
            <Banner tittelId={props.bannerTittelId} brodsmuleId={props.bannerBrodsmuleId}/>
            {props.children}
        </>
    );
};

export default Side;