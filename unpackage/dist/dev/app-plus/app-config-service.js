
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["page/Login/login","page/Memorandum/memorandum","page/Creation/creation","page/Login/enroll","page/HandAccount/handAccount","page/Community/community","page/MySetting/mySetting","page/Memorandum/work","page/Memorandum/writeWork","page/Memorandum/classTable","page/Memorandum/plan","page/Memorandum/createPlan","page/Memorandum/record","page/Memorandum/createRecord","page/demo","page/MySetting/account","page/MySetting/person","page/MySetting/privacy","page/MySetting/medal","page/Friends/friends","page/Friends/funs"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uView","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#FFFFFF"},"tabBar":{"color":"#7A7E83","selectedColor":"#3cc51f","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"page/HandAccount/handAccount","iconPath":"./static/uview/common/logo.png","selectedIconPath":"./static/uview/common/logo.png","text":"手账","visible":false},{"pagePath":"page/Memorandum/memorandum","iconPath":"./static/uview/common/logo.png","selectedIconPath":"./static/uview/common/logo.png","text":"创作"},{"pagePath":"page/MySetting/mySetting","iconPath":"./static/uview/common/logo.png","selectedIconPath":"./static/uview/common/logo.png","text":"设置"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"Mine","compilerVersion":"3.2.16","entryPagePath":"page/HandAccount/handAccount","entryPageQuery":"","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/page/Login/login","meta":{"isQuit":true},"window":{"navigationBarTitleText":"登录"}},{"path":"/page/Memorandum/memorandum","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"备忘录"}},{"path":"/page/Creation/creation","meta":{},"window":{"navigationBarTitleText":"创作","softinputMode":"adjustPan"}},{"path":"/page/Login/enroll","meta":{},"window":{"navigationBarTitleText":"注册"}},{"path":"/page/HandAccount/handAccount","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"手账"}},{"path":"/page/Community/community","meta":{},"window":{"navigationBarTitleText":"社区"}},{"path":"/page/MySetting/mySetting","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"设置"}},{"path":"/page/Memorandum/work","meta":{},"window":{"navigationBarTitleText":"事务"}},{"path":"/page/Memorandum/writeWork","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/page/Memorandum/classTable","meta":{},"window":{"navigationBarTitleText":"课表"}},{"path":"/page/Memorandum/plan","meta":{},"window":{"navigationBarTitleText":"计划"}},{"path":"/page/Memorandum/createPlan","meta":{},"window":{"navigationBarTitleText":"建立计划"}},{"path":"/page/Memorandum/record","meta":{},"window":{"navigationBarTitleText":"记录"}},{"path":"/page/Memorandum/createRecord","meta":{},"window":{"navigationBarTitleText":"写点记录"}},{"path":"/page/demo","meta":{},"window":{"navigationBarTitleText":"Demo"}},{"path":"/page/MySetting/account","meta":{},"window":{"navigationBarTitleText":"账号"}},{"path":"/page/MySetting/person","meta":{},"window":{"navigationBarTitleText":"个人"}},{"path":"/page/MySetting/privacy","meta":{},"window":{"navigationBarTitleText":"隐私"}},{"path":"/page/MySetting/medal","meta":{},"window":{"navigationBarTitleText":"勋章"}},{"path":"/page/Friends/friends","meta":{},"window":{"navigationBarTitleText":"关注"}},{"path":"/page/Friends/funs","meta":{},"window":{"navigationBarTitleText":"粉丝"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
