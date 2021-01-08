import grupperGeografiskTilknytning from './grupper-geografisk-tilknytning'

describe('tester at funksjonen fungerer som forventet', () => {
  test('funksjonen returnerer Ukjent ved ukjent', () => {
    expect(grupperGeografiskTilknytning('ukjent')).toBe('Ukjent')
  })

  test('funksjonen returnerer Ukjent ved tom', () => {
    expect(grupperGeografiskTilknytning()).toBe('Ukjent')
  })

  test('funksjonen returnerer Oslo for 030112', () => {
    expect(grupperGeografiskTilknytning('030112')).toBe('Oslo')
  })

  test('funksjonen returnerer Innlandet for 3401', () => {
    expect(grupperGeografiskTilknytning('3401')).toBe('Innlandet')
  })

  test('funksjonen returnerer Rogaland for 110302', () => {
    expect(grupperGeografiskTilknytning('110302')).toBe('Rogaland')
  })
})
