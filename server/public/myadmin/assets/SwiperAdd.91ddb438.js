import{resolveComponent as o,openBlock as f,createElementBlock as h,createElementVNode as r,createVNode as t,withCtx as s,pushScopeId as w,popScopeId as g,createTextVNode as d}from"https://esm.sh/vue@3.0.5";import{_ as b}from"./index.10c0c1b8.js";import"https://cdn.jsdelivr.net/npm/ant-design-vue@2.2.0-beta.6/lib/grid/style/index.css";import"https://esm.sh/axios@0.21.1";import"https://esm.sh/vuex@4.0.2";import"https://esm.sh/dayjs@1.10.5";import"https://esm.sh/dayjs@1.10.5/plugin/localeData.js";import"https://esm.sh/dayjs@1.10.5/plugin/customParseFormat.js";import"https://esm.sh/dayjs@1.10.5/plugin/advancedFormat.js";import"https://esm.sh/dayjs@1.10.5/plugin/weekOfYear.js";import"https://esm.sh/dayjs@1.10.5/plugin/weekYear.js";import"https://esm.sh/dayjs@1.10.5/plugin/dayOfYear.js";import"https://esm.sh/dayjs@1.10.5/plugin/isSameOrAfter.js";import"https://esm.sh/dayjs@1.10.5/plugin/isSameOrBefore.js";const v={name:"SwiperAdd",data(){return{form:{swiper:""}}},methods:{async submit(){let{data:e}=await this.$axios({method:"POST",url:"/adminServer/swiper/add",data:this.form});if(e.code)return this.$message.error(e.msg);await this.$router.push("/swiperManager")},fileChange(e,a){e.status==="ready"&&(/^(\s|\S)+(jpg|png|JPG|PNG)+$/.test(e.name)||(this.$message.error("\u53EA\u80FD\u4E0A\u4F20.png \u6216. jpj\u6587\u4EF6"),a.pop()))},submitSwiper(){this.$refs.swiperForm.submit()},swiper_upload_success(e){if(e.code)return this.$message.error("\u4E0A\u4F20\u8F6E\u64AD\u56FE\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u540E\u7AEF\u62A5\u9519");this.form.swiper=e.url,this.submit()}}},S=e=>(w("data-v-03b17b45"),e=e(),g(),e),x={class:"swiperAdd"},$={class:"swiperPhoto"},y={class:"el-icon-upload"},A=S(()=>r("div",{class:"el-upload__text"},[d("\u5C06.jpj\u6216\u8005png\u6587\u4EF6\u62D6\u5230\u6B64\u5904\uFF0C\u6216"),r("em",null,"\u70B9\u51FB\u4E0A\u4F20")],-1)),C=d("\u786E\u8BA4\u4E0A\u4F20");function j(e,a,P,k,l,i){const n=o("upload-filled"),c=o("el-icon"),m=o("el-upload"),p=o("el-form-item"),_=o("el-button"),u=o("el-form");return f(),h("div",x,[r("div",$,[t(u,{model:l.form},{default:s(()=>[t(p,{label:"\u8F6E\u64AD\u56FE\u4E0A\u4F20\uFF1A","label-width":"150px"},{default:s(()=>[t(m,{class:"upload-demo",drag:"",action:`${e.baseURL}/adminServer/swiper/swiperAdd`,"auto-upload":!1,"on-change":i.fileChange,limit:1,ref:"swiperForm","on-success":i.swiper_upload_success,"with-credentials":!0},{default:s(()=>[r("i",y,[t(c,{class:"el-icon--upload"},{default:s(()=>[t(n)]),_:1})]),A]),_:1},8,["action","on-change","on-success"])]),_:1}),t(p,null,{default:s(()=>[t(_,{type:"primary",onClick:i.submitSwiper,size:"large",style:{margin:"50px 16%"}},{default:s(()=>[C]),_:1},8,["onClick"])]),_:1})]),_:1},8,["model"])])])}var U=b(v,[["render",j],["__scopeId","data-v-03b17b45"]]);export{U as default};
//# sourceMappingURL=SwiperAdd.91ddb438.js.map