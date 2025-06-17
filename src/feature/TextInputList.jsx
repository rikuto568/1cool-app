import { useState } from "react";
import TextFinish from "./textFinish";

function TextInputList (){
  const [text,setText] = useState(""); // useStateを使ってテキストの状態を管理する
  const [tasks, setTasks] = useState([]); // タスクのリストを管理するためのuseState

  //ユーズステートを設定したい。
  // ユーズステートは変更前と変更後の値を保持できるものでセット～と使うのが基本、
  //上みたいに書くよ
const handleChange = (event) => {
  setText(event.target.value); // イベントから入力値を取得して状態を更新する部分
};

const handleSubmit = (event) => {
  event.preventDefault(); // 標準搭載のリロードを止められる
  if (text.trim() === "") {
    alert("テキストを入力してください"); // 入力が空の場合のアラート
    return;//もし空ならここで止まる
  }
  setText(""); // 入力後にテキストをクリアする
  setTasks([...tasks, text]); // 新しいタスクをリストに追加する
  //...tasks というスプレッド構文は、tasks 配列の中身を1つずつバラして、そこに text をくっつけて、新しい配列を作る
//という意味です！
};
// 完了状態を切り替える
  const handleToggle = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="text-input">
      <h1>ToDoアプリ</h1>
      <form onSubmit={handleSubmit}>{/*追加ボタンが押されると、上に設定した関数が呼び出される。そのなかのif文で、何も書かれていなかったときのの処理と、入力したタスクが消される処理が書いてあるよ */}
      <input 
        type="text"
        value={text}
        onChange={handleChange}{/*この一文で入力した文字の状態を更新する*/}
        {/*２６と２７行目がそろって初めて「入力欄の文字をユーザーの操作に合わせて変更できる」状態になる */}
        placeholder="新しいタスクを入力してください"
      />
      {/*バリューで入力欄に入れられる値の種類を指定する。ここでは、useStateで設定したtextを入れているよ */}
      <button type="submit">追加</button> 
      </form>

      <ul>
        {tasks.map((task) => (
          <TextFinish key={task.id} task={task} onToggle={handleToggle} />
        ))}
        {/*mapメソッドは二つの引数を指定してそれらを展開する波かっこはｊｓ部分だからね */}
      </ul>
    </div>

  );
}
export default TextInputList; 

//テキスト入力欄、追加ボタン、タスクリストの表示、をつくったよ
