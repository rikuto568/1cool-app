import { useState } from "react";
import TextInput from "./feature/taskInput/taskinput";
import TimerDisplay from "./feature/timer/timerDisplay";

function App() {
  const [task, settask] = useState("");
  const [isMatching, setIsMatching] = useState(false);
  const [isBattleStarted, setIsBattleStarted] = useState(false);
  //画面遷移のためのやつ

  function handleStartMatching() {
    setIsMatching(true);
    setTimeout(() => {
      setIsMatching(false);
      setIsBattleStarted(true);
    }, 2000);
  }

  let content;
  if (isBattleStarted) {
    content = <TimerDisplay task={task} />;
  } else if (isMatching) {
    content = <MatchingScreen isMatching={isMatching} />;
  } else {
    content = (
      <TextInput
        task={task}
        setTask={settask}
        startMatching={handleStartMatching}
      />
    );
  }

  return <div className="App">{content}</div>;
}
export default App;
