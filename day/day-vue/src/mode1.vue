<template>
  <div class="mode1">
    <h1>姓： {{ p.lan1 }}</h1>
    <button @click="changeLan">修改名字</button>
    <h2 @click="changeLan2">名： {{ p.lan2 }}</h2>
    <button @click="changeLan2">修改名字</button>

    <button @click="changeLan3">修改</button>

    <button @click="awesome = !awesome">Toggle</button>

    <!-- <h1 v-if="awesome">Vue is awesome!</h1>
    <h1 v-else>Oh no 😢</h1> -->
    <h1 v-show=" awesome " >Vue is awesome!</h1>


    <span>组合： {{ hr }}</span>

    <p>Message is: {{ message }}</p>

    <input v-model="message"  @blur="tetx"  placeholder="edit me" :class="{active: awesome}" />


    //------------------------------------------

    <div class="kku" :class="{active: item.isActive}" @mouseenter="item.isActive = true" @mouseleave="item.isActive = false" v-for="(item,index) in item" :key="index" >{{ item.message }}

      <div v-if="item.isActive"><span class="kkk" v-for=" (b,index) in item.some" :key="index">{{ b }}</span></div>
    </div>
    
    
    
    <span class="hhh">{{ title }}</span>
      <button @click="startCounters" class="fsa">开始</button>
    <p>用户密码</p>
    <input v-model="pass" type="password" placeholder="密码">
    <p>确认密码</p>
    <input v-model="pass2" type="password" placeholder="确认密码">
    <button @click="confr">确认</button>
    <div v-show="isok"><span>密码不一致</span></div>
</div>
</template>

<script lang="ts" setup>

onUnmounted(()=>{
  console.log("ouum")
})

//-----------------密码对比
let pass = ref("")
let pass2 = ref("")
let isok = ref(false)


function confr(){
  pass2.value === pass.value ? isok.value = false : isok.value = true
}
// import { watch } from 'vue';

  
//---------------------
let message2 = ref("")
function tetx(){
  console.log(message2.value)
}

let message = ref('Hello World!')

// let br = reactive([{message:"kkii",isActive:false,},
//   {message:"内核",isActive:false},
//   {message:"内",isActive:false}])

let item = ref([
  {message:"kkii",isActive:false,some:"like"},
  {message:"内核",isActive:false,some:"good"},
  {message:"内",isActive:false,some:"但是1+"}
])

//----------------绑定 HTML class----------------------------
let isActive = ref(false)
let awesome = ref(false)


const title = ref(0)

    //------------------------------------------------
let timer: number | null = null
let timer1: number | null = null

function startCounters() {
 title.value = 0

 timer = setInterval(() => {
  title.value++
 }, 1000)

 watch(title, (newValue) => {
  if (newValue === 10) {
   if (timer !== null) clearInterval(timer)
  }

 })

  
 
}
































//-------------关于大写的用法
  import { reactive, ref,computed, isReactive, watch, onUnmounted } from 'vue'
    
  let p = reactive({
    lan1:'wang',
    lan2:'san',
    
  })
  let hr = computed(()=>{
    return p.lan1+p.lan2
  })



    function changeLan(){
      p.lan1 = p.lan1.slice(0,1).toUpperCase()+p.lan1.slice(1)
    }

   
   function changeLan2(){
      p.lan2 = p.lan2.slice(0,1).toUpperCase()+p.lan2.slice(1)
   }

   function changeLan3(){
     Object.assign(p,{lan1:'zhang',lan2:'li'})
   }

</script>

<style scoped>

.mode1{
  background-color: rgb(9, 17, 120);
  width: 100%;
  height: 70vh;
}
.active{
  background-color: black;
  color: white;
  
}
.kku{
 
  text-align: center;
  width: 100px;
  height: 100px;
  border: 5px solid red;
}
</style>