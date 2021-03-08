import { useState } from 'react'
import useLocalStorage from '../../hooks/use-localstorarge'

import Alternativ from './alternativ'

function Feedback ({ id, tekst, alternativer }) {
  const [visFeedback, setVisFeedback] = useLocalStorage(`vis-${id}`, {
    updated: new Date(),
    state: true,
  })
  const [skjulKomponent, setSkjulKomponent] = useLocalStorage()

  const handleSkjulKomponent = () => setVisFeedback({
    updated: new Date(),
    state: false
  })

  useEffect(() => {
    const { state } = visFeedback
    setSkjulKomponent(!state)
  }, [visFeedback])

  if (skjulKomponent) return null

  return (
    <>
      <div>
        {tekst}
      </div>
      {alternativer && Array.isArray(alternativer) && alternativer.map(alternativ => <Alternativ feedbackId={id} alternativ={alternativ}/>)}
      <button onClick={handleSkjulKomponent}>X</button>
    </>
  )

}

export default Feedback
