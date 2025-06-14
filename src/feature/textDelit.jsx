import { useState } from "react";

function TextDelete() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "タスク1" },
    { id: 2, text: "タスク2" },
    { id: 3, text: "タスク3" },
  ]); // タスクのリストを管理するためのuseState+テストダミー
  function handleFinish(id) {
    setTasks(tasks.filter((task) => task.id !== id)); // task.filterは配列から条件に合う要素だけを残すメソッド
  } //filterメソッドが配列の中にある要素を一つ一つ取り出してこの条件に合うのかを検証していくから個々の引数は一つ一つのタスクという意味を込めて単数形
  //!==は等しくないという意味で、idが一致しないものだけを残すという意味
  //filter メソッドは元の配列から 条件に合う要素だけを集めた新しい配列を作る。
  //その条件が task.id !== id （「指定したIDと違うものだけ残す」）なので、
  //削除したいIDのタスクは除外されて、新しい配列には入らない。
  //その結果、状態を更新して表示を変えることで「削除されたように見える」わけです。

  return (
    <div className="finish">
      <h2>削除できるTODOリスト</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => handleFinish(task.id)}>削除</button>
          </li>
        ))}
        {/*オンクリックで上の関数を呼び出して、ふらったーで等しくないものを残さないようにする=>タスクを一覧表示してそれを削除できる */}
      </ul>
    </div>
  );
}
export default TextDelete;
//タスクのリストを表示し、各タスクに削除ボタンを付けて、クリックするとそのタスクを削除する機能を作ったよ！！
