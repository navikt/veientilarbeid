import meldekortHistore from "../mocks/meldekort.json";
import dagerTilFrist from "./meldekort-dager-til-siste-frist";

describe("tester at meldekort-dager-til-siste-frist fungerer", () => {
  test("den returnerer null uten meldekortHistorie", () => {
    const iDag = new Date(new Date().toISOString().substr(0, 10));
    const dager = dagerTilFrist(iDag);
    expect(dager).toBe(null);
  });

  test("den returnerer null for 2021-01-19", () => {
    const iDag = new Date("2021-01-19T12:00:00+01:00");
    const dager = dagerTilFrist(iDag, meldekortHistore);
    expect(dager).toBe(null);
  });

  test("den returnerer 2 dager etter periodeslutt for 2020-12-15", () => {
    const iDag = new Date("2020-12-15T12:00:00+01:00");
    const dager = dagerTilFrist(iDag, meldekortHistore);
    expect(dager).toBe(2);
  });

  test("den returnerer 2 dager etter periodeslutt for 2020-12-29", () => {
    const iDag = new Date("2020-12-29");
    const dager = dagerTilFrist(iDag, meldekortHistore);
    expect(dager).toBe(2);
  });

  test("den returnerer 0 dager etter periodeslutt for 2020-12-27", () => {
    const iDag = new Date("2020-12-27");
    const dager = dagerTilFrist(iDag, meldekortHistore);
    expect(dager).toBe(0);
  });

  test("den returnerer -1 dager etter periodeslutt for 2020-12-26", () => {
    const iDag = new Date("2020-12-26");
    const dager = dagerTilFrist(iDag, meldekortHistore);
    expect(dager).toBe(-1);
  });

  test("den returnerer 8 dager etter periodeslutt for 2021-01-04", () => {
    const iDag = new Date("2021-01-04");
    const dager = dagerTilFrist(iDag, meldekortHistore);
    expect(dager).toBe(8);
  });
});
