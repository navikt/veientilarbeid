import * as React from 'react';
import Banner from '../banner/banner';
import './side.less';

interface SideProps {
    bannerTittelId: string;
    bannerBrodsmuleId: string;
    children?: React.ReactNode[];
}

const Side: React.SFC<SideProps> = (props: SideProps) => {
    return (
        <>
            <Banner tittelId={props.bannerTittelId} brodsmuleId={props.bannerBrodsmuleId}/>
            <section className="innhold">
                {props.children}
            </section>
        </>
    );
};

export default Side;