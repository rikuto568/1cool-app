import { useState, useEffect } from "react";
import MatchingScreen from "./feature/matchingScreen/matchingScreen";
import TaskInput from "./feature/taskInput/taskinput";
import TimerDisplay from "./feature/timerDisplay/timerdisplay";
import { askOpenAI } from "./feature/api/openai";
import WinScreen from "./feature/battleResult/WinScreen";
import LoseScreen from "./feature/battleResult/LoseScreen";
import React from "react";

function App() {
  const [task, settask] = useState("");
  const [isMatching, setIsMatching] = useState(false);
  const [isBattleStarted, setIsBattleStarted] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [error, setError] = useState(null);
  const [gameResult, setGameResult] = useState(null); // 'win' | 'lose' | を入れてそこで処理を変える
  // estimatedTimeはAIが計算したタスクの時間を保存するための状態
  //画面遷移のためのやつ
  // バックグラウンドタイマーの復帰処理
  useEffect(() => {
    const timerStart = localStorage.getItem("timerStart");
    const timerDuration = localStorage.getItem("timerDuration");
    const timerTask = localStorage.getItem("timerTask");

    if (timerStart && timerDuration && timerTask) {
      const startTime = parseInt(timerStart);
      const duration = parseInt(timerDuration);
      const elapsed = Math.floor((Date.now() - startTime) / 1000);

      if (elapsed < duration) {
        // まだ時間が残っている
        settask(timerTask);
        setEstimatedTime(Math.ceil(duration / 60));
        setIsBattleStarted(true);
        console.log(`⏰ バックグラウンドタイマー復帰`);
      } else {
        // 時間切れ
        localStorage.removeItem("timerStart");
        localStorage.removeItem("timerDuration");
        localStorage.removeItem("timerTask");
        // 現実時間の時間を利用することによって、バックグラウンドでも動くようにしている
      }
    }
  }, []);

  function resetGame() {
    settask(""); // "洗濯物をたたむ" → ""
    setIsMatching(false);
    setIsBattleStarted(false);
    setEstimatedTime(null);
    setError(null);
    setGameResult(null); // "win+lose" → null
    localStorage.removeItem("timerStart");
    localStorage.removeItem("timerDuration");
    localStorage.removeItem("timerTask");
  }

  async function handleStartMatching() {
    setIsMatching(true);
    try {
      const minutes = await askOpenAI(task);
      setEstimatedTime(minutes);

      setTimeout(() => {
        setIsMatching(false); // マッチング画面終了
        setIsBattleStarted(true); // バトル画面開始
      }, 3000); // 3秒後にバトル画面へ遷移
    } catch (error) {
      console.error(error);
      setError(error.message);
      setIsMatching(false);
    }
  }

  let content;
  if (gameResult && gameResult.result === "win") {
    // ゲームリザルトかつ、勝利だったら勝利画面を表示するっていう処理
    content = (
      <WinScreen
        task={task}
        estimatedTime={estimatedTime}
        resetGame={resetGame}
        actualTime={gameResult.actualTime}
      />
    );
  } else if (gameResult === "lose") {
    content = <LoseScreen task={task} resetGame={resetGame} />;
  }
  // 勝ち負けのコンポーネントのプロップスは別に入れてもどっちでもいい
  else if (isBattleStarted) {
    content = (
      <TimerDisplay
        task={task}
        estimatedTime={estimatedTime}
        setGameResult={setGameResult}
      />
    );
  } else if (isMatching) {
    content = <MatchingScreen isMatching={isMatching} />;
  } else {
    content = (
      <>
        <TaskInput
          task={task}
          setTask={settask}
          startMatching={handleStartMatching}
          error={error} // エラーをTaskInputに渡す
        />
      </>
    );
    // 画面遷移の大まかな仕組みはsetState関数で状態を変える → 条件分岐が再評価される → 違う画面が表示されるって感じ
  }

  return <div className="App">{content}</div>;
}
export default App;
// 通信エラーの時に相手へ何か表示をする仕様を作る
// estimatedMinutesで取得した値をestimatedTimeに保存してる点に注意ね
