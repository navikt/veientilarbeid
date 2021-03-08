import { amplitudeLogger } from '../../metrics/amplitude-utils'

function Alternativ ({ feedbackId, alternativ }) {
  function handleClick (event) {
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
