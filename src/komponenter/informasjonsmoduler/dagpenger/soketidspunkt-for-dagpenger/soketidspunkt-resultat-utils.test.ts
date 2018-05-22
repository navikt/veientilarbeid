import { formaterResultatperiode } from './soketidspunkt-resultat-utils';
import { inputDatostringTilISODate } from './moment-utils';
import * as moment from 'moment';
import 'moment/locale/nb';
import * as chai from 'chai';

const expect = chai.expect;
moment.locale('nb');

describe('test av soketidspunkt-resultat.ts', () => {
    it('skal bare nevne måned og år én gang hvis perioden er inneholdt i én måned', () => {
        expect(
            formaterResultatperiode(
                inputDatostringTilISODate('01.07.2014'),
                inputDatostringTilISODate('04.07.2014')
            )
        ).to.equal('1. - 4. juli 2014.');
    });

    it('skal ha med måned hvis perioden inneholder månedskifte', () => {
        expect(
            formaterResultatperiode(
                inputDatostringTilISODate('30.06.2014'),
                inputDatostringTilISODate('04.07.2014')
            )
        ).to.equal('30. juni - 4. juli 2014.');
    });

    it('skal ha med år og måned hvis perioden inneholder årskifte', () => {
        expect(
            formaterResultatperiode(
                inputDatostringTilISODate('30.06.2014'),
                inputDatostringTilISODate('04.07.2015')
            )
        ).to.equal('30. juni 2014 - 4. juli 2015.');
    });
});