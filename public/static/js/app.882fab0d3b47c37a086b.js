webpackJsonp([1],{"+skl":function(t,e){},0:function(t,e){},HCjY:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n("j1ja");var s=n("7+uW"),a=n("hKoQ"),i=n.n(a),o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var r=n("VU/8")({name:"App"},o,!1,function(t){n("TZDN")},null,null).exports,u=n("/ocq"),c=n("mvHQ"),l=n.n(c),h={name:"admim",data:function(){return{deleteModal:!1,map:null,marker:null,deleteAim:"",newQuest:{phoneNumber:"",desc:""},currentPointer:"",currentDesc:"",startNew:!1,startNewLoading:!0,locationInfo:"",currentItem:"18380266573",numberList:[],sendMsgInfo:"重发短信",sendStatus:!1}},methods:{changeItem:function(t){this.$refs.side_menu.updateActiveName(),this.currentPointer=t;for(var e=0;e<this.numberList.length;e++)if(t===this.numberList[e].phoneNumber)if(this.currentDesc=this.numberList[e].desc,"unknow"===this.numberList[e].location)this.marker&&this.map.remove(this.marker),this.map.setFitView(),this.map.panTo([116.397428,39.90923]),this.locationInfo="等待确认";else{var n=JSON.parse(this.numberList[e].location);this.locationInfo=n.formattedAddress,this.marker&&this.map.remove(this.marker),this.drawMarker(n)}},createMap:function(){var t=new AMap.Map("container",{resizeEnable:!0,zoom:11,center:[116.397428,39.90923]});this.map=t},drawMarker:function(t){var e=[];e[1]=t.position.Q,e[0]=t.position.R;var n=new AMap.Marker({icon:"https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",position:e});this.marker=n,this.map.add(n),this.map.setFitView()},getsocket:function(){this.$socket.emit("client message","admin")},startNewModal:function(){this.startNew=!0},cancleNew:function(){this.startNew=!1},isPoneAvailable:function(t){return!!/^[1][3,4,5,7,8][0-9]{9}$/.test(t)},deleteItem:function(t){this.deleteAim=this.numberList[t].phoneNumber,this.deleteModal=!0},sendDelete:function(){var t=this;this.$api.deleteItem(this.deleteAim).then(function(e){t.$Message.info("删除成功"),t.deleteModal=!1,t.getData()}).catch(function(e){t.$Message.error("删除失败"),t.deleteModal=!1})},cancleDelete:function(){this.deleteModal=!1},sendNewQuest:function(){var t=this,e=!1,n=this;""===this.newQuest.phoneNumber&&(this.$Message.error("电话号码不能为空"),e=!0),this.isPoneAvailable(this.newQuest.phoneNumber)||(this.$Message.error("请输入正确的电话号码"),e=!0),this.numberList.forEach(function(n){n.phoneNumber===t.newQuest.phoneNumber&&(t.$Message.error("此报警人已经存在"),e=!0)}),e?setTimeout(function(){t.startNewLoading=!1,t.$nextTick(function(){n.startNewLoading=!0})},1e3):this.$api.addItem(n.newQuest).then(function(e){t.$Message.info("新建成功"),t.startNew=!1,t.getData()}).catch(function(e){t.$Message.error("新建失败"),t.startNew=!1})},getData:function(){var t=this;this.$api.getList().then(function(e){"notLogin"===e.data?t.$router.push({path:"/"}):t.numberList=e.data}).catch(function(e){t.$Message.error("获取列表失败")})},resendMsg:function(){var t=this;if(""===this.currentPointer)return this.$Message.error("请先选择报警人员"),!1;if(!this.sendStatus){this.sendStatus=!0;for(var e={phoneNumber:this.currentPointer,secretNumber:null},n=0;n<this.numberList.length;n++)this.currentPointer===this.numberList[n].phoneNumber&&(e.secretNumber=this.numberList[n].secretNumber);this.sendMsgInfo="正在发送",this.$api.resendMsg(e),then(function(e){t.$Message.info("发送成功"),t.sendMsgInfo="请等待",setTimeout(function(){t.sendStatus=!1,t.sendMsgInfo="重发短信"},5e3)}).catch(function(e){t.$Message.error("发送失败"),t.sendStatus=!1,t.sendMsgInfo="重发短信"})}},wbMap:function(t){console.log(t),this.$Message.info("电话号码为"+t.msg.phoneNumber+"的位置信息更新了");for(var e=0;e<this.numberList.length;e++)if(t.msg.phoneNumber===this.currentPointer&&this.numberList[e].phoneNumber===this.currentPointer){this.numberList[e]=t.msg,this.currentDesc=this.numberList[e].desc;var n=JSON.parse(this.numberList[e].location);this.locationInfo=n.formattedAddress,this.drawMarker(n)}},init_socket:function(){var t=this,e=this.$io.connect("//localhost:3000/");e.on("connect",function(){var t=window.localStorage.getItem("token");e.emit("authenticate",{token:t})}).on("authenticated",function(){e.on("map",t.wbMap)}).on("unauthorized",function(t){throw console.log("unauthorized: "+l()(t.data)),new Error(t.data.type)})}},mounted:function(){this.init_socket(),this.createMap(),this.getData()}},d={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"layout"},[n("Layout",{staticStyle:{height:"100%"}},[n("Header",[n("Menu",{attrs:{mode:"horizontal",theme:"dark"}},[n("div",{staticClass:"headerTitle"},[t._v("眉山消防定位系统")]),t._v(" "),n("div",{staticClass:"layout-nav"})])],1),t._v(" "),n("Layout",[n("Sider",{style:{background:"#fff"},attrs:{"hide-trigger":""}},[n("Menu",{ref:"side_menu",attrs:{theme:"light",width:"auto","open-names":["1"]},on:{"on-select":t.changeItem}},[n("Submenu",{attrs:{name:"1"}},[n("template",{slot:"title"},[t._v("\n                            报警人员列表\n                        ")]),t._v(" "),t._l(t.numberList,function(e,s){return n("div",{key:s},[n("MenuItem",{attrs:{name:e.phoneNumber}},[t._v(t._s(e.phoneNumber)+"\n                            "),n("Button",{attrs:{type:"error",size:"small"},on:{click:function(e){return t.deleteItem(s)}}},[t._v("删除")])],1)],1)}),t._v(" "),n("Button",{staticStyle:{margin:"20px 0 0 40px"},attrs:{type:"primary"},on:{click:t.startNewModal}},[t._v("新建火灾信息")])],2)],1)],1),t._v(" "),n("Layout",{staticStyle:{position:"relative"}},[n("div",{staticStyle:{width:"100%",height:"100%"},attrs:{id:"container"}}),t._v(" "),n("Card",{staticClass:"infoCard"},[n("p",{attrs:{slot:"title"},slot:"title"},[t._v("\n                      具体位置信息:\n                  ")]),t._v(" "),n("p",[t._v(t._s(this.locationInfo))]),t._v(" "),n("p",{staticStyle:{"word-wrap":"break-word"}},[n("b",[t._v("报警人描述信息:")]),t._v(t._s(this.currentDesc))]),t._v(" "),n("Button",{attrs:{type:"primary"},on:{click:function(e){return t.resendMsg()}}},[t._v(t._s(t.sendMsgInfo))])],1)],1)],1)],1),t._v(" "),n("Modal",{attrs:{loading:t.startNewLoading},on:{"on-cancle":t.cancleNew,"on-ok":t.sendNewQuest},model:{value:t.startNew,callback:function(e){t.startNew=e},expression:"startNew"}},[n("p",[t._v("报警人电话:"),n("Input",{staticStyle:{width:"200px"},model:{value:t.newQuest.phoneNumber,callback:function(e){t.$set(t.newQuest,"phoneNumber",e)},expression:"newQuest.phoneNumber"}})],1),t._v(" "),n("p",[t._v("报警人信息位置描述:"),n("Input",{attrs:{type:"textarea"},model:{value:t.newQuest.desc,callback:function(e){t.$set(t.newQuest,"desc",e)},expression:"newQuest.desc"}})],1)]),t._v(" "),n("Modal",{staticStyle:{"text-align":"center"},on:{"on-cancle":t.cancleDelete,"on-ok":t.sendDelete},model:{value:t.deleteModal,callback:function(e){t.deleteModal=e},expression:"deleteModal"}},[n("p",[t._v("是否删除电话号码为"+t._s(t.deleteAim)+"的位置信息?")])])],1)},staticRenderFns:[]};var m=n("VU/8")(h,d,!1,function(t){n("TI9M")},"data-v-7dbfd237",null).exports,p={name:"client",data:function(){return{info:"定位中，请等待"}},methods:{getLocation:function(){var t=this;AMap.plugin("AMap.Geolocation",function(){new AMap.Geolocation({enableHighAccuracy:!0,timeout:1e4,buttonPosition:"RB",buttonOffset:new AMap.Pixel(10,20),zoomToAccuracy:!0}).getCurrentPosition(function(e,n){"complete"==e?t.onComplete(n):t.info="定位失败"})})},onComplete:function(t){var e=this,n=this.$route.params.number;this.$api.sendLocation(t,n).then(function(t){e.info="定位成功"}).catch(function(t){e.info="网络失败"})}},mounted:function(){this.getLocation()}},f={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"info"},[this._v(this._s(this.info))])},staticRenderFns:[]};var v=n("VU/8")(p,f,!1,function(t){n("HCjY")},"data-v-6ea2b290",null).exports,g={name:"login",data:function(){return{userName:"",userPassword:"",showBubble:!1}},methods:{visitorLogin:function(){var t=this;this.$api.login("VISITOR","VISITORPASSWORD").then(function(e){t.$router.push({path:"/admin"})}).catch(function(e){t.$Message.error("网络错误")})},show:function(){this.showBubble=!0},cancle:function(){this.showBubble=!1},login:function(){var t=this;""!==this.userName&&""!==this.userPassword?this.$api.login(self.userName,self.userPassword).then(function(e){t.$router.push({path:"/admin"})}).catch(function(e){t.$Message.error("账号或密码错误")}):this.$Message.error("用户名或密码不能为空")}}},w={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"bg"},[n("Card",{staticClass:"card"},[n("p",{staticClass:"title"},[t._v("眉山市火灾消防定位系统")]),t._v(" "),n("div",{staticClass:"inputModal"},[n("span",[t._v("账号：")]),n("Input",{staticClass:"input",model:{value:t.userName,callback:function(e){t.userName=e},expression:"userName"}})],1),t._v(" "),n("div",{staticClass:"inputModal"},[n("span",[t._v("密码：")]),n("Input",{staticClass:"input",attrs:{type:"password"},model:{value:t.userPassword,callback:function(e){t.userPassword=e},expression:"userPassword"}})],1),t._v(" "),n("div",[n("Button",{attrs:{type:"info"},on:{click:t.login}},[t._v("登录")]),t._v(" "),n("div",{staticClass:"visitor"},[n("Button",{attrs:{type:"warning"},on:{click:t.visitorLogin},nativeOn:{mouseover:function(e){return t.show(e)},mouseleave:function(e){return t.cancle(e)}}},[t._v("游客登录")]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.showBubble,expression:"showBubble"}],staticClass:"bubble"},[t._v("\n          因为存在短信按量计费的原因，所以没有开放注册功能防止被恶意发送短信。游客账号可以每天发送十个请求:)\n        ")])],1)],1)])],1)},staticRenderFns:[]};var b=n("VU/8")(g,w,!1,function(t){n("xVmL")},null,null).exports;s.default.use(u.a);var M=new u.a({routes:[{path:"/",name:"login",component:b,meta:{requireLogin:!1}},{path:"/admin",name:"admin",component:m,meta:{requireLogin:!0}},{path:"/client/:number",name:"client",component:v,meta:{requireLogin:!1}}]});M.beforeEach(function(t,e,n){t.meta.requireLogin?void 0==window.localStorage.getItem("token")?n("/"):n():n()});var _=M,N=n("BTaQ"),k=n.n(N),L=(n("+skl"),n("mtWM")),$=n.n(L),y=n("DmT9"),I=n.n(y),S=n("Dd8w"),C=n.n(S),P=n("//Fk"),A=n.n(P),x=$.a.create({baseURL:"//localhost:3000",timeout:5e3,responseType:"json",headers:{"Content-Type":"application/json;charset=utf-8"}});x.interceptors.request.use(function(t){var e=window.localStorage.getItem("token");return void 0!==e&&(t.headers.Authorization="Bearer "+e),t},function(t){return A.a.reject(t)});x.interceptors.response.use(function(t){return t.headers.hasOwnProperty("authorization")&&window.localStorage.setItem("token",t.headers.authorization),200===t.status||304===t.status?A.a.resolve(t):A.a.reject(t)},function(t){if(401!==t.response.status)return A.a.reject(res);window.localStorage.hasOwnProperty("authorization")&&window.localStorage.removeItem("token"),_.push({path:"/"})});var Q=x,D={login:function(t,e){return Q({method:"post",url:"/login",data:{userName:t,userPassword:e}})},getList:function(){return Q({method:"get",url:"/admin/getList"})},deleteItem:function(t){return Q({method:"post",url:"/admin/delete",data:{phoneNumber:t}})},addItem:function(t){return Q({method:"post",url:"/admin",data:{data:t}})},resendMsg:function(t){return Q({method:"post",url:"/admin/resendMsg",data:C()({},t)})},sendLocation:function(t,e){return Q({method:"post",url:"/client",data:{result:t,number:e}})}};n("hKoQ").polyfill(),i.a.polyfill(),s.default.config.productionTip=!1,s.default.use(k.a),$.a.defaults.baseURL="//localhost:3000/",s.default.prototype.$axios=$.a,s.default.prototype.$api=D,s.default.prototype.$io=I.a,new s.default({el:"#app",router:_,components:{App:r},template:"<App/>"})},TI9M:function(t,e){},TZDN:function(t,e){},xVmL:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.882fab0d3b47c37a086b.js.map