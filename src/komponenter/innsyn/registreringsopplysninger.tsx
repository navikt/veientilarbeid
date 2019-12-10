import React from 'react';

const opplysninger = (props: any) => {
  const { opprettetDato, manueltRegistrertAv, besvarelse } = props;
  return (
    <>
      <div>{ opprettetDato }</div>
      <div>{ manueltRegistrertAv }</div>
      <div>{ besvarelse.dinSituasjon }</div>
      <div>{ besvarelse.fremtidigSituasjon }</div>
      <div>{ besvarelse.sisteStilling }</div>
      <div>{ besvarelse.tilbakeIArbeid }</div>
      <div>{ besvarelse.helseHinder }</div>
      <div>{ besvarelse.utdanning }</div>
      <div>{ besvarelse.utdanningBestatt }</div>
      <div>{ besvarelse.utdanningGodkjent }</div>
    </>
  )
};

export default opplysninger;