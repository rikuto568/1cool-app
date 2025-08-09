import React from "react"; // ←これを追加
import "./taskinput.css";
function TaskInput({ task, setTask, startMatching, error }) {
  return (
    <div className="first-page">
      <div className="title">ToDOバトル</div>
      <div className="head-text">
        <p>タスクを入力してください</p>
      </div>
      {error && <div className="error-message">⚠️ {error}</div>}
      <div className="input-box">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          // onChangeは入力された文字を取得して、setTaskに渡す
          type="text"
          className="input-text"
          placeholder="洗濯物をたたむ"
        />
      </div>
      <div className="battle-button">
        <button onClick={startMatching}> バトル開始！！</button>
      </div>
    </div>
  );
}
export default TaskInput;
