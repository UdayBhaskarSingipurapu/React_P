import React, { forwardRef, useImperativeHandle, useRef } from 'react'

function ResultModal({result, targetTime, ref, timeRemaining, onReset}) {
    const dialog = useRef();
    let userLost = timeRemaining <= 0;
    const score = Math.round((1 - (timeRemaining / (targetTime * 1000))) * 100)
    // It lets a child component expose only specific methods or values to the parent instead of the whole DOM node.
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    })
    return (
        <dialog ref={dialog} onClose={onReset} className='result-modal'>
            {userLost && <h2>You {result}</h2>}
            {!userLost && <h2>Your Score: {score}</h2>}
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped timer with <strong>{(timeRemaining / 1000).toFixed(2)} seconds left.</strong></p>
            <form action="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>
    )
}

// for older react versions where passing a ref is not possible
// const ResultModal = forwardRef(function ResultModal({result, targetTime}, ref)  {
//     return (
//         <dialog ref={ref} className='result-modal'>
//             <h2>You {result}</h2>
//             <p>The target time was <strong>{targetTime} seconds.</strong></p>
//             <p>You stopped timer with<strong>X seconds left.</strong></p>
//             <form action="dialog">
//                 <button>Close</button>
//             </form>
//         </dialog>
//     )
// });

export default ResultModal