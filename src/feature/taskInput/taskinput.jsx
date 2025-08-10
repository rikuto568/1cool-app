import React, { useState } from "react";
import HelpModal from "../help/HelpModal";
import "./taskinput.css";

function TaskInput({ task, setTask, startMatching, error }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("usage");

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
          type="text"
          className="input-text"
          placeholder="洗濯物をたたむ"
        />
      </div>
      <div className="battle-button">
        <button onClick={startMatching}> バトル開始！！</button>
      </div>

      {/* ✅ help-buttonsをfirst-page内に移動 */}
      <div className="help-buttons">
        <button className="help-button" onClick={() => openModal("usage")}>
          📖 使い方
        </button>
        <button className="help-button" onClick={() => openModal("terms")}>
          📜 利用規約
        </button>
      </div>

      {/* ✅ モーダルもfirst-page内に移動 */}
      <HelpModal isOpen={modalOpen} onClose={closeModal} type={modalType} />
    </div> // ✅ first-pageの閉じタグ
  );
}

export default TaskInput;
