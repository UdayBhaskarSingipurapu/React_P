import React, { useRef, useState } from 'react'
import ResultModal from './ResultModal';

function TimerChallenge({title, targetTime}) {
    let timer = useRef();
    let dialog = useRef();
    // let [timerStarted, setTimerStarted] = useState(false);
    // let [timerExpired, setTimerExpired] = useState(false);
    let [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
    let timerActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if(timeRemaining <= 0){
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset(){
        setTimeRemaining(targetTime * 1000);
    }

    function handleStart(){
        timer.current = setInterval(() => {
            setTimeRemaining((prev) => prev - 10);
        }, 10)
    }
    function handleStop(){
        dialog.current.open();
        clearInterval(timer.current);
    }
    return (
        <>
        <ResultModal ref={dialog} result="lost" targetTime={targetTime} timeRemaining={timeRemaining} onReset={handleReset} />
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's': ''}
            </p>
            <p>
                <button onClick={timerActive ? handleStop: handleStart}>{timerActive ? 'Stop' : 'Start'} Challenge</button>
            </p>
            <p className={timerActive ? 'active': undefined}>
                {timerActive ? 'Time is running...': 'Timer inactive'}
            </p>
        </section>
        </>
    )
}

export default TimerChallenge