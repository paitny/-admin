import{_ as f,r as t,o as h,c as w,a,b as s,w as o,p as g,e as b,g as l}from"./index.5ddfe03b.js";const v={name:"SwiperAdd",data(){return{form:{swiper:""}}},methods:{async submit(){let{data:e}=await this.$axios({method:"POST",url:"/adminServer/swiper/add",data:this.form});if(e.code)return this.$message.error(e.msg);await this.$router.push("/swiperManager")},fileChange(e,i){e.status==="ready"&&(/^(\s|\S)+(jpg|png|JPG|PNG)+$/.test(e.name)||(this.$message.error("\u53EA\u80FD\u4E0A\u4F20.png \u6216. jpj\u6587\u4EF6"),i.pop()))},submitSwiper(){this.$refs.swiperForm.submit()},swiper_upload_success(e){if(e.code)return this.$message.error("\u4E0A\u4F20\u8F6E\u64AD\u56FE\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u540E\u7AEF\u62A5\u9519");this.form.swiper=e.url,this.submit()}}},S=e=>(g("data-v-03b17b45"),e=e(),b(),e),x={class:"swiperAdd"},$={class:"swiperPhoto"},y={class:"el-icon-upload"},A=S(()=>a("div",{class:"el-upload__text"},[l("\u5C06.jpj\u6216\u8005png\u6587\u4EF6\u62D6\u5230\u6B64\u5904\uFF0C\u6216"),a("em",null,"\u70B9\u51FB\u4E0A\u4F20")],-1)),C=l("\u786E\u8BA4\u4E0A\u4F20");function j(e,i,P,k,n,r){const p=t("upload-filled"),c=t("el-icon"),_=t("el-upload"),d=t("el-form-item"),u=t("el-button"),m=t("el-form");return h(),w("div",x,[a("div",$,[s(m,{model:n.form},{default:o(()=>[s(d,{label:"\u8F6E\u64AD\u56FE\u4E0A\u4F20\uFF1A","label-width":"150px"},{default:o(()=>[s(_,{class:"upload-demo",drag:"",action:`${e.baseURL}/adminServer/swiper/swiperAdd`,"auto-upload":!1,"on-change":r.fileChange,limit:1,ref:"swiperForm","on-success":r.swiper_upload_success,"with-credentials":!0},{default:o(()=>[a("i",y,[s(c,{class:"el-icon--upload"},{default:o(()=>[s(p)]),_:1})]),A]),_:1},8,["action","on-change","on-success"])]),_:1}),s(d,null,{default:o(()=>[s(u,{type:"primary",onClick:r.submitSwiper,size:"large",style:{margin:"50px 16%"}},{default:o(()=>[C]),_:1},8,["onClick"])]),_:1})]),_:1},8,["model"])])])}var N=f(v,[["render",j],["__scopeId","data-v-03b17b45"]]);export{N as default};
