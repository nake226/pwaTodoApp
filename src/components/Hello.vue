<template>
  <div id="todo">
    <button type="submit" v-on:click="logout">ログアウト</button>
    <h2>タスク</h2>
    <div>
      <input type="text" v-model="newTodoName">
      <button type="submit" v-on:click="createTodo()">タスク作成</button>
    </div>
    <ul>
      <li><button type="submit" v-on:click="showTodoType = 'all'">すべて</button></li>
      <li><button type="submit" v-on:click="showTodoType = 'active'">未完タスク一覧</button></li>
      <li><button type="submit" v-on:click="showTodoType = 'complete'">完了タスク一覧</button></li>
    </ul>
    <ul v-for="(todo, key) in filteredTodos">
      <li><input class="toggle" type="checkbox" v-model="todo.isComplete" v-on:click="updateIsCompleteTodo(todo, key)">{{ todo.name }}</li>
      <button type="submit" v-on:click="deleteTodo(key)">削除</button>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'todo',
  created: function() {
    var userId = firebase.auth().currentUser.uid;
    this.database = firebase.database();
    this.todosRef = this.database.ref('todos/' + userId);

    var _this = this;
    this.todosRef.on('value', function(snapshot) {
      _this.todos = snapshot.val(); // データに変化が起きたときに再取得する
    });
  },
  computed: {
    filteredTodos: function () {
      if (this.showTodoType == 'all') {
        return this.todos;
      } else {
        var showIsComplete = false;
        if (this.showTodoType == 'complete') { showIsComplete = true }
        var filterTodos = {};
        for (var key in this.todos) {
          var todo = this.todos[key];
          if (todo.isComplete == showIsComplete) { filterTodos[key] = todo; }
        }
        return filterTodos;
      }
    }
  },
  methods: {
    createTodo: function() {
      if (this.newTodoName == "") { return; }
      this.todosRef.push({
        name: this.newTodoName,
        isComplete: false,
      })
      this.newTodoName = "";
    },
    updateIsCompleteTodo: function (todo, key) {
      todo.isComplete = !todo.isComplete
      var updates = {};
      updates['/todos/' + key] = todo;
      this.database.ref().update(updates);
    },
    deleteTodo: function (key) {
      this.database.ref('todos').child(key).remove();
    },
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  },
  data () {
    return {
      database: null,
      todosRef: null,
      newTodoName: '',
      showTodoType: 'all',
      todos: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  font-size: 16px;
  font-family: Verdana, sans-serif;
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
