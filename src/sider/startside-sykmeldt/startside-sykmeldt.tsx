import * as React from 'react';
import Side from '../../komponenter/side/side';
import InfoPanelerRad from './info-paneler-rad/info-paneler-rad';
// import AapRad from './aap-rad/aap-rad';
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
                    <div className="startside-sykmeldt--rad-innhold">
                        <AktivitetsplanRad/>
                    </div>
                </section>

                <section className="startside-sykmeldt--rad">
                    <div className="startside-sykmeldt--rad-innhold">
                        <InfoPanelerRad/>
                    </div>
                </section>

                <section className="startside-sykmeldt--rad">
                    <div className="startside-sykmeldt--rad-innhold">
                        <p>ds</p>
                    </div>
                </section>

                <section className="startside-sykmeldt--rad">
                    <div className="startside-sykmeldt--rad-innhold">
                        <OkonomiRad/>
                    </div>
                </section>
            </main>
        </Side>
    );
};

export default StartsideSykmeldt;