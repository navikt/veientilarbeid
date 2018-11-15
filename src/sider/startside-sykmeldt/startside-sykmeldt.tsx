import * as React from 'react';
import Side from '../../komponenter/side/side';
import InfoPanelerRad from './info-paneler-rad';
import AapRad from './aap-rad';
import OkonomiRad from './okonomi-rad';
import AktivitetsplanRad from './aktivitetsplan-rad';
import './startside-sykmeldt.less';

const StartsideSykmeldt = () => {
    return (
        <Side
            bannerTittelId="startside-sykmeldt-banner-tittel"
            bannerBrodsmuleId="startside-sykmeldt-banner-brodsmule"
        >
            <main className="startside-sykmeldt--rader">
                <section className="startside-sykmeldt--rad">
                    <AktivitetsplanRad/>
                </section>

                <section className="startside-sykmeldt--rad">
                    <InfoPanelerRad/>
                </section>

                <section className="startside-sykmeldt--rad">
                    <AapRad/>
                </section>

                <section className="startside-sykmeldt--rad">
                    <OkonomiRad/>
                </section>
            </main>
        </Side>
    );
};

export default StartsideSykmeldt;