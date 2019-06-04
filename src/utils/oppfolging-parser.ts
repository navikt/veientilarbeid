export function parseOppfolging (oppfolging: any) {
  let erReaktivert = false
  if (oppfolging) {
    const erIkkeAvsluttet = (periode: any) => periode.sluttDato === ''
    const oppfolgingsPerioder = oppfolging.oppfolgingsPerioder || []
    const ikkeAvsluttedePerioder = oppfolgingsPerioder.filter(erIkkeAvsluttet)
    erReaktivert = oppfolgingsPerioder.length > 1 && ikkeAvsluttedePerioder.length > 0
  }
  console.log(oppfolging)
  console.log(erReaktivert)
  return erReaktivert
}
