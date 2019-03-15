import * as React from 'react';
import AapRad from './aap/aap';
import OkonomiRad from './okonomi/okonomi-rad';
import Banner from '../../komponenter/banner/banner';
import Dialog from '../../komponenter/dialog/dialog';
import InfoPaneler from './info-paneler/info-paneler';
import Aktivitetsplan from '../../komponenter/aktivitetsplan/aktivitetsplan';

import './startside-sykmeldt.less';

const StartsideSykmeldt = () => {
    return (
        <>
            <Banner tittelId="startside-sykmeldt-banner-tittel" brodsmuleId="startside-sykmeldt-banner-brodsmule"/>

            <div className="rad">
                <div className="limit">
                    <Aktivitetsplan/>
                    <Dialog/>
                </div>
            </div>

            <div className="rad">
                <div className="limit">
                    <InfoPaneler/>
                </div>
            </div>

            <div className="rad">
                <div className="limit">
                    <AapRad/>
                </div>
            </div>

            <div className="rad">
                <div className="limit">
                    <OkonomiRad/>
                </div>
            </div>
        </>
    );
};

export default StartsideSykmeldt;
