"use strict";(self["webpackChunkmyblog"]=self["webpackChunkmyblog"]||[]).push([[184],{98184:function(e,t,r){r.r(t),r.d(t,{default:function(){return l}});var o=r(73396);const a={id:"ArticleID",oncontextmenu:"return false",onselectstart:"return false",oncopy:"return false"};function n(e,t,r,n,s,i){return(0,o.wg)(),(0,o.iD)("div",a,[(0,o._)("article",null,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(s.random,(e=>((0,o.wg)(),(0,o.iD)("main",{id:"mdToHTML",key:e.id})))),128))])])}var s=r(20065),i={name:"ArticleID",data(){return{random:{id:new Date}}},watch:{userInfo(){this.backHome()}},computed:{...(0,s.rn)(["userInfo"])},methods:{backHome(){this.userInfo.user||(this.$router.replace("/Article"),this.$message.error("当前未登录,请先登录后阅读文章"))},unloadFn(){this.userInfo.user},async getArt(){let e=this.$route.params.id,{data:t}=await this.$axios({method:"GET",url:"/get/articleID",params:{id:e}});if(t.code)return this.$message({type:"error",message:t.msg,duration:1e3,onClose:()=>{this.$router.replace("/article")}});let{data:r}=await this.$axios({method:"GET",url:`${t.data.md}`});editormd.markdownToHTML("mdToHTML",{markdown:r,emoji:!0})}},beforeRouteEnter(e,t,r){r((e=>{e.backHome()}))},mounted(){window.addEventListener("beforeunload",(e=>{this.unloadFn(e)})),this.getArt()},destroyed(){window.removeEventListener("beforeunload",(e=>{this.unloadFn(e)}))}},d=r(40089);const u=(0,d.Z)(i,[["render",n],["__scopeId","data-v-2fa665fe"]]);var l=u}}]);
//# sourceMappingURL=184.988c4223.js.map