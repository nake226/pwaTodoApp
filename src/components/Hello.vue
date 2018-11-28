<template>
  <div id="todo" class="container">
    <h1 class="appName">
      Todo リスト
      <span class="numOfTask">（{{ remaining.length }}/{{ todos.length }}）</span>
    </h1>
    <ul>
      <li class="txt txt-alert" v-show="!todos.length">Nothing to do!!</li>
      <li v-for="(todo, index) in todos">
        <label>
          <input type="checkbox" v-model="todo.is_done"><span class="checkbox"></span>
        </label>
        <span :class="{done: todo.is_done}">{{ todo.name }}</span>
        <span @click="deleteTask(index)" class="btn-delete">[×]</span>
      </li>
    </ul>
    <form @submit.prevent="addTask">
      <input class="txt" type="text" v-model="task">
    </form>
    <div class="btn_block">
      <button class="btn btn-add" @click="addTask">Todoを追加する</button>
      <button class="btn btn-purge" @click="purge">完了したTodoを一斉削除</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'hello',
  data() {
    return {
      name: "",
      task: "",
      todos: [],
    }
  },
  // 監視
  watch: {
    /**
     * @name todos
     * タスクの内部（プロパティ / 値）も監視する
     */
    todos: {
      handler: function(){
        localStorage.setItem('todos', JSON.stringify(this.todos));
      },
      deep: true
    }
  },
  // データがマウントされた直後
  mounted: function(){
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
  },
  // 関数
  methods: {
    // タスク追加
    addTask(){
      var newTask = {
        name: this.task,
        is_done: false
      }
      if (this.task.length !== 0) {
        this.todos.push(newTask); 
      }
      // todoの追加後に入力欄を空にする
      this.task = "";
    },
    // タスク削除
    deleteTask(index){
      this.todos.splice(index, 1);
    },
    // 処理済みタスクの削除
    purge(){
      if(!confirm('delete finished task?')){
        return;
      }
      this.todos = this.remaining;
    }
  },
  // 算出プロパティ
  computed: {
    /**
     * @name remaining
     * @returns 残りのタスク
     */
    remaining: function(){
      return this.todos.filter(function(todo){
        return !todo.is_done;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  font-size: 16px;
  font-family: Verdana, sans-serif;
  margin: 5% auto 0;
}
.container {
  box-sizing: border-box;
  margin: auto;
  padding: 0 7.25%;
  width: 100%;
}
#todo h1 {
  border-bottom: 1px solid #ddd;
  font-size: 22px;
  margin: 0 auto;
  padding: 0 0 18px;
  text-align: center;
}
#todo h1 > button {
  float: right;
}
#todo #name {
  margin-bottom: 30px;
}
#todo .numOfTask {
  color: #bbb;
  font-size: 12px;
}
#todo ul {
  margin: 18px auto 0;
  padding: 0;
  list-style: none;
}
#todo li {
  line-height: 2.5;
}
#todo li > span.done {
  text-decoration: line-through;
  color: #bbb;
}
#todo form {
  margin: 18px auto 0;
}
#todo input[type="text"] {
  border: solid 2px #777;
  border-radius: 3px;
  font-size: 16px;
  height: 25px;
  width: 60%;
  padding: 5px 8px 6px;
}
#todo input[type="checkbox"] {
  -appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: absolute;
  top: 0;
  left: 0;
}
#todo input[type="checkbox"] + span {
  padding: 0 30px 0 0;
  position: relative;
}
#todo label {
  position: relative;
}
#todo input[type="checkbox"] + span::before {
  background: transparent;
  border: 2px #616161 solid;
  border-radius: 3px;
  content: "";
  display: inline-block;
  height: 15px;
  width: 15px;
  position: absolute;
  top: 2px;
  bottom: 0;
  margin: auto;
}
#todo input[type="checkbox"]:checked + span::before {
  background: #616161;
}
#todo input[type="checkbox"]:checked + span::after {
  border: 2px solid #fff;
  border-width: 0 2px 2px 0;
  content: "";
  display: inline-block;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  top: 4px;
  height: 9px;
  width: 4px;
  left: 7px;
}
#todo .btn_block {
  margin: 25px auto 0;
}
#todo .txt {
  margin: auto;
}
#todo .txt-alert {
  font-size: 17px;
}
#todo .btn {
  background: #ffffff;
  display: inline-block;
  padding: 8px 8px 7px;
  text-decoration: none;
  border-radius: 3px;
  font-size: 14px;
}
#todo .btn-delete {
  font-size: 13px;
  cursor: pointer;
  color: #08c;
}
#todo .btn-purge {
  color: #EB8686;
  border: double 2px #EB8686;
}
#todo .btn-add {
  color: #08c;
  border: double 2px #08c;
  margin-right: 10px;
}
</style>
