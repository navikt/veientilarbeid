import { Periode, Data } from '../ducks/oppfolging'

export function parseOppfolging (oppfolging: Data) {
  let erReaktivert = false;
  if (oppfolging) {
    const erIkkeAvsluttet = (periode: Periode): boolean => periode.sluttDato === '';
    const oppfolgingsPerioder = oppfolging.oppfolgingsPerioder || [];
    const ikkeAvsluttedePerioder = oppfolgingsPerioder.filter(erIkkeAvsluttet);
    erReaktivert = oppfolging.underOppfolging === true && (oppfolgingsPerioder.length > 1 && ikkeAvsluttedePerioder.length > 0);
  }
  return erReaktivert;
}
