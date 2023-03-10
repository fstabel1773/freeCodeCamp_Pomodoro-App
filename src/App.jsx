import { useState, useEffect, useRef } from 'react'



function App() {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timeLeft, setTimeLeft] = useState (1500)
  const [countdownType, setCountdownType] = useState("SESSION")
  const [isRunning, setIsRunning] = useState(false)

  const beep = useRef()

  const defaultBreakLength = 5
  const defaultSessionLength = 25
  const defaultTimeLeft = defaultSessionLength * 60

  function handleBreakIncrement() {
    if(breakLength < 60){
      setBreakLength(breakLength + 1)
    }
  }
  
  function handleBreakDecrement() {
    if(breakLength > 1){
      setBreakLength(breakLength - 1)
    }
  }
  
   function handleSessionIncrement() {
    if(sessionLength < 60){
      setSessionLength(sessionLength + 1)
    }
  }
  
  function handleSessionDecrement() {
    if(sessionLength > 1){
      setSessionLength(sessionLength - 1)
    }
  }

  useEffect(() => {
    countdownType === "SESSION" ? setTimeLeft(sessionLength * 60) : setTimeLeft(breakLength * 60)
  }, [sessionLength])


  function handleStartStop() {
    clearTimeout(timeOut)
    setIsRunning(prevIsRunning => !prevIsRunning)
  }

  function countdown() {
    if (isRunning) {
      timeOut
      resetByTimeout()
    } else {
      clearTimeout(timeOut)
    }
  }

  const timeOut = setTimeout(() => {
    if (timeLeft >= 0 && isRunning)
      setTimeLeft(prevTimeLeft => prevTimeLeft - 1)
    }, 1000)

  useEffect(() => {
    countdown(),
    [isRunning, timeLeft, timeOut]
  })


  function resetByTimeout() {
    if (timeLeft === -1 && countdownType === "SESSION") {
      setCountdownType("BREAK")
      setTimeLeft(prevTimeLeft => prevTimeLeft + 1 + breakLength * 60)
      beep.current.play()
    } else if (timeLeft === -1 && countdownType === "BREAK") {
      setCountdownType("SESSION")
      setTimeLeft(prevTimeLeft => prevTimeLeft + 1 + sessionLength * 60)
    }
  }

  function reset() {
    clearTimeout(timeOut)
    setIsRunning(false)
    setTimeLeft(defaultTimeLeft)
    setBreakLength(defaultBreakLength)
    setSessionLength(defaultSessionLength)
    setCountdownType("SESSION")
    beep.current.pause()
    beep.current.currentTime = 0;
  }

  function timeFormatter(seconds) {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    const minStr = min < 10 ? `0${min}` : `${min}`
    const secStr = sec < 10 ? `0${sec}` : `${sec}`
    const timeFormatted = `${minStr}:${secStr}`
    return timeFormatted
  }

  const title = countdownType === "SESSION" ? "Session" : "Break";

  const styles = countdownType === "BREAK" 
    ? {color:"#0ead69"} 
    : timeLeft < 60 
    ? {color: "#EF233C"} 
    : {}

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-warning">
      <h1 className="text-center text-uppercase mb-4 fw-bold display-6"><span>????</span><span>Pomodoro-</span><span>Clock</span> <span>????</span></h1>
      <div id="App-Wrapper" className="mx-5 p-3 w-75 border border-5 border-dark rounded">

        <div className="d-flex flex-column flex-sm-row justify-content-sm-around">
          <div className="my-3">
            <h3 id="break-label" 
              className="text-center">
              Break Length
            </h3>
            <div className="d-flex align-items-center justify-content-center">
              <button 
                id="break-decrement" 
                onClick={handleBreakDecrement}
                disabled={isRunning}
                className="btn btn-lg btn-dark text-warning">
                <i className="bi bi-arrow-down-square"></i>
              </button>
              <h3 id="break-length" className="mx-2">
                {breakLength}
              </h3>
              <button 
                id="break-increment"
                onClick={handleBreakIncrement}
                disabled={isRunning}
                className="btn btn-lg btn-dark text-warning">
                <i className="bi bi-arrow-up-square"></i>
              </button>
            </div>
          </div>
          <div className="my-3">
            <h3 id="session-label" 
              className="text-center">
              Session Length
            </h3>
            <div className='d-flex align-items-center justify-content-center'>
              <button 
                id="session-decrement" 
                onClick={handleSessionDecrement}
                disabled={isRunning}
                className="btn btn-lg btn-dark text-warning">
                <i className="bi bi-arrow-down-square"></i>
              </button>
              <h3 id="session-length" className="mx-2">
                {sessionLength}
              </h3>
              <button 
                id="session-increment"
                onClick={handleSessionIncrement}
                disabled={isRunning}
                className="btn btn-lg btn-dark text-warning">
                <i className="bi bi-arrow-up-square"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="w-50 mx-auto my-3 py-4 border border-4 border-dark rounded-3">
          <h4 id="timer-label" className="text-center">
            {title}
          </h4>
          <h1 id="time-left" 
            className="text-center"
            style={styles}>
              {timeFormatter(timeLeft)}
          </h1>
        </div>

        <div className="btn-toolbar w-50 mx-auto my-3" role="toolbar" aria-label="Toolbar with button groups">
          <div className="btn-group btn-group-lg mr-2 mx-auto text-wrap" role="group" aria-label="First group">
            <button id="start_stop" 
              type="button" 
              className="btn btn-dark text-warning text-nowrap"
              onClick={handleStartStop}>
                <i className="bi bi-play-fill"></i>
                <i className="bi bi-pause-fill"></i>
            </button>
            <button id="reset" 
              type="button" 
              className="btn btn-dark text-warning"
              onClick={reset}>
              <i className="bi bi-arrow-clockwise"></i>
            </button>
          </div>
        </div>

        <audio id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" 
          ref={beep}>
        </audio>

      </div>
    </div>
  )
}

export default App
