import "./styles.css";

//
// onClickAdd関数
//
const onClickAdd = () => {
  //documentオブジェクトはプロパティ(値)やメソッド(処理)でHTMLドキュメントを表現するオブジェクト
  //getElementByIdメソッドでHTML内でID付与したinputの値を取得する
  const inputText = document.getElementById("add-text").value;

  //入力文字列が空白の場合は処理を飛ばす
  if (inputText === "") return;

  //入力した文字列を初期化する
  document.getElementById("add-text").value = "";

  createInconpleteList(inputText);
};

//
//「未完了のToDo」に追加する関数
//
const createInconpleteList = (text) => {
  //各ToDo項目に必要なタグを定義する(html参照)
  //div生成
  const div = document.createElement("div");
  div.className = "todo-item";

  //ul生成
  const ul = document.createElement("ul");

  //li生成
  const li = document.createElement("li");
  li.className = "item-contents";
  li.innerText = text;

  //完了button生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";

  //完了button押下時の処理
  completeButton.addEventListener("click", () => {
    const addTarget = completeButton.parentNode;
    //「未完了のToDo」から項目の削除
    deleteFromIncompleteList(addTarget);

    //ToDo項目のdivタグ初期化
    addTarget.textContent = null;

    //戻すbutton生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";

    //戻すbutton押下時の処理
    backButton.addEventListener("click", () => {
      const backTarget = backButton.parentElement;
      //「完了のToDo」から項目の削除
      document.getElementById("completed-list").removeChild(backTarget);

      //「完了のToDo」divタグの第一項目(liタグ)のテキストを取得してリスト追加
      const text = backButton.parentNode.firstElementChild.innerText;
      createInconpleteList(text);
    });

    //「完了のToDo」に入れるためのdivタグ作成
    addTarget.appendChild(ul);
    ul.appendChild(li);
    addTarget.appendChild(backButton);

    //HTMLのsectionタグ「完了のToDo」の子要素として設定
    document.getElementById("completed-list").appendChild(addTarget);
  });

  //削除button生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  //削除button押下時の処理
  deleteButton.addEventListener("click", () => {
    deleteFromIncompleteList(deleteButton.parentNode);
  });

  //「未完了のToDo」に入れるためのdivタグ作成
  div.appendChild(ul);
  ul.appendChild(li);

  //HTMLのsectionタグ「未完了のToDo」の子要素として設定
  document.getElementById("incomplete-list").appendChild(div);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);
};

//未完了リストから指定の要素を削除する関数
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

// add-button(「追加」部分)に対してクリックイベントを定義
document //HTML要素を取得するためのオブジェクト
  .getElementById("add-button") //htmlでid定義した要素に対して
  .addEventListener("click", () => onClickAdd()); //addEventListenerはイベントターゲット(ElementやDocument、Window等)のメソッド
