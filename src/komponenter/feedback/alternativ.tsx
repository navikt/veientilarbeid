import React from 'react';
import { amplitudeLogger } from '../../metrics/amplitude-utils'

interface Props {
  feedbackId: string;
  alternativ: string;
}

function Alternativ ({ feedbackId, alternativ }: Props) {
  function handleClick (event: React.MouseEvent) {
    event.preventDefault();
    amplitudeLogger(feedbackId, {
      alternativ
    })
  }
  return (
    <div>
      <a href='' onClick={handleClick}>{alternativ}</a>
    </div>
  )
}

export default Alternativ
