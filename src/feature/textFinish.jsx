function TextFinish({ task, onToggle }) {
  return (
    <li>
      <button onClick={() => onToggle(task.id)}>
        {task.completed ? "☑" : "☐"}
      </button>
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          marginLeft: "8px",
        }}
      >
        {task.text}
      </span>
    </li>
  );
}
export default TextFinish;
// このこんぽーねんとは、タスクの完了状態を表示し、
// 完了状態を切り替えるボタンを提供するためのもの
// 1️⃣ ユーザーがボタンをクリック
// ↓
// 2️⃣ onClick={() => onToggle(task.id)} が発動
// ↓
// 3️⃣ onToggle(task.id) → 実体は handleToggle(task.id)
// ↓
// 4️⃣ handleToggle が呼ばれて、該当するタスクの completed を反転
// ↓
// 5️⃣ tasks の状態が更新され、画面が再描画される
