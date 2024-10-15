<template>
    <div class="form-container">
      <form class="styled-form">
        <div class="form-group">
          <label for="name">{{ p.fname }}</label>
          <input type="text"  id="name" required />
        </div>
        <div class="form-group">
          <label for="email">{{ p.femail }}</label>
          <input type="email"  id="email" required />
        </div>
        <div class="form-group">
          <label for="password">{{ p.fpassword }}</label>
          <input type="password" id="password" required />
        </div>
        <button type="submit" @click="register">注册</button>
        <button type ="button" @click="changeLanguage">{{ lan }}</button>
        <button type ="button" @click="lla">语言切换</button>
        <button type ="button" @click="sw">停止</button>
        <p>注册成功！</p>
        
      </form>
    </div>
  </template>
  
  <script lang="ts" setup>
    import { ref, watch } from 'vue'
     
    let lan = ref('中文')
    let flag = true

    


//------------------------------------------------
    function changeLanguage(){
      
      if(flag){
        lan.value = 'Chinese'
        flag = false
      }else{
        lan.value = '中文'
        flag = true
      }
      
    }


    let ls : undefined | number=undefined
    function sw(){
      if(ls){
        clearInterval(ls)
      }
    }

    function lla(){
      ls = setInterval(() =>{changeLanguage()},3000 )
    }


    //---------------获取对象
    const p = ref({
      fname: '姓名',
      femail: '邮箱',
      fpassword: '密码',
    })
    



    //--------------------------------------------------------------------
    function register(){
     


























    //--------------promise
    const hha = new Promise((resolve,reject) => {
      setInterval(() => {  
        p.value.fname = '王五'
        p.value.femail = '123@qq.com'
        p.value.fpassword = '123456'
        resolve("good")
      },1000)
    })
      //--------------promise
      hha.then((res) => {
        console.log(res)
      })
      }
  </script>
  
  <style scoped>
  .form-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
  }
  
  .styled-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .success-message {
    color: green;
    margin-top: 10px;
  }

  .hhh{
    color: red;
    background-color: black;
  }
  .fsa{
    margin-top: 10px;
    background-color: #4CAF50;
  }
  </style>
  