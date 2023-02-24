import { useState } from 'react'



function App() {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timeLeft, setTimeLeft] = useState (1500)
  const [countdownType, setCountdownType] = useState("SESSION")
  const [isRunning, setIsRunning] = useState(false)

  function handleIncrement(event) {
    if (event.target.id === "break-increment"
      || event.target.parentElement.id === "break-increment") {
        if (breakLength < 60) {
          setBreakLength(prevBreakLength => prevBreakLength + 1)
        }} else if (sessionLength < 60) {
          setSessionLength(prevSessionLength => prevSessionLength + 1)
        }
  }

  function handleDecrement(event) {
    if (event.target.id === "break-decrement"
      || event.target.parentElement.id === "break-decrement") {
        if (breakLength > 0) {
          setBreakLength(prevBreakLength => prevBreakLength - 1)
        }} else if (sessionLength > 0) {
          setSessionLength(prevSessionLength => prevSessionLength - 1)
        }
  }

  function timeFormatter(seconds) {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    const minStr = min < 10 ? `0${min}` : `${min}`
    const secStr = sec < 10 ? `0${sec}` : `${sec}`
    const timeFormatted = `${minStr}:${secStr}`
    return timeFormatted
  }


  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-warning">
      <div id="App-Wrapper" className="p-5 border border-5 border-dark rounded w-50">

        <h1 className="col text-center">Pomodoro-Clock</h1>

        <div className="break-session-length">
          <div className="">
            <h3 id="break-label" 
              className="text-center">
              Break Length
            </h3>
            <div className='d-flex align-items-center justify-content-center'>
              <button 
                id="break-decrement" 
                onClick={handleDecrement}
                className="btn btn-lg btn-dark text-warning">
                <i className="bi bi-arrow-down-square"></i>
              </button>
              <h3 id="break-length" className="mx-2">
                {breakLength}
              </h3>
              <button 
                id="break-increment"
                onClick={handleIncrement}
                className="btn btn-lg btn-dark text-warning">
                <i className="bi bi-arrow-up-square"></i>
              </button>
            </div>
          </div>
          <div className="">
            <h3 id="session-label" 
              className="text-center">
              Session Length
            </h3>
            <div className='d-flex align-items-center justify-content-center'>
              <button 
                id="session-decrement" 
                onClick={handleDecrement}
                className="btn btn-lg btn-dark text-warning">
                <i className="bi bi-arrow-down-square"></i>
              </button>
              <h3 id="session-length" className="mx-2">
                {sessionLength}
              </h3>
              <button 
                id="session-increment"
                onClick={handleIncrement}
                className="btn btn-lg btn-dark text-warning">
                <i className="bi bi-arrow-up-square"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="w-50 mx-auto my-3 py-4 border border-4 border-dark rounded-3">
          <h4 id="timer-label" className="text-center">Session</h4>
          <h1 id="time-left" className="text-center">
            {timeFormatter(timeLeft)}
          </h1>
        </div>
 
        <div className="btn-toolbar w-50 mx-auto my-3" role="toolbar" aria-label="Toolbar with button groups">
          <div className="btn-group btn-group-lg mr-2 mx-auto" role="group" aria-label="First group">
            <button id="start_stop" type="button" className="btn btn-dark text-warning">
              <i className="bi bi-play-fill"></i>
              <i className="bi bi-pause-fill"></i>
            </button>
            <button id="reset" type="button" className="btn btn-dark text-warning border-start">
              <i className="bi bi-arrow-clockwise"></i>
            </button>
          </div>
        </div>


      </div>
    </div>
  )
}

export default App
