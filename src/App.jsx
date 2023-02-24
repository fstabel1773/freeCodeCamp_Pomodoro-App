import { useState } from 'react'



function App() {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timeLeft, setTimeLeft] = useState (1500)
  const [countdownType, setCountdownType] = useState("SESSION")
  const [isRunning, setIsRunning] = useState(false)

  function handleIncrement(event) {
    if (event.target.id === "break-increment") {
      if (breakLength < 60) {
        setBreakLength(prevBreakLength => prevBreakLength + 1)
      }
    } else if (sessionLength < 60) {
        setSessionLength(prevSessionLength => prevSessionLength + 1)
      }
  }

  function handleDecrement(event) {
    if (event.target.id === "break-decrement") {
      if (breakLength > 0) {
        setBreakLength(prevBreakLength => prevBreakLength - 1)
      }
    } else if (sessionLength > 0) {
        setSessionLength(prevSessionLength => prevSessionLength - 1)
      }
  }

  

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-warning">
      <div id="App-Wrapper" className="container p-5 border border-5 border-dark rounded w-50">

        <div className="row">
          <h1 className="col text-center">Pomodoro-Clock</h1>
        </div>

        <div className="row my-3">
          <div className="col-6">
            <div className="row">
              <h3 id="break-label" 
                className="text-center"
                >Break Length</h3>
            </div>
            <div className='row'>
              <h3 className="text-center">
                <i id="break-decrement" 
                  className="bi bi-arrow-down-square"
                  onClick={handleDecrement}
                  ></i>
                <span id="break-length" className="mx-2">
                  {breakLength}
                </span>
                <i id="break-increment" 
                  className="bi bi-arrow-up-square pe-auto"
                  onClick={handleIncrement}
                  ></i>
              </h3>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <h3 id="session-label" className="text-center">Session Length</h3>
            </div>
            <div className='row'>
              <h3 className="text-center">
                <i id="session-decrement" 
                  className="bi bi-arrow-down-square"
                  onClick={handleDecrement}
                  ></i>
                <span id="session-length" className="mx-2">
                  {sessionLength}
                </span>
                <i id="session-increment" 
                  className="bi bi-arrow-up-square pe-auto"
                  onClick={handleIncrement}
                  ></i>
              </h3>
            </div>
          </div>
        </div>

        <div className="row w-50 mx-auto my-3 py-4 border border-4 border-dark rounded-3">
          <div className="col-12 text-center">
            <h4 id="timer-label" className="">Session</h4>
          </div>
          <div className="col-12 text-center">
            <h1 id="time-left">
              25:00
            </h1>
          </div>
        </div>

        <div className="row w-50 mx-auto my-3">
          <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div className="btn-group btn-group-lg mr-2 mx-auto" role="group" aria-label="First group">
              <button id="start_stop" type="button" className="btn btn-dark text-warning">
                <i className="bi bi-play-fill"></i>
                <i className="bi bi-pause-fill"></i>
              </button>
              <button id="reset" type="button" className="btn btn-dark text-warning">
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
