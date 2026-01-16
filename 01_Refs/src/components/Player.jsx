import { useRef, useState } from "react";

export default function Player() {
  let inputName = useRef();
  let [player, setPlayer] = useState(null);

  function handleClick(){
    setPlayer(inputName.current.value);
  }

  return (
    <section id="player">
      <h2>Welcome {player ?? 'unknown'}</h2>
      <p>
        <input ref={inputName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
