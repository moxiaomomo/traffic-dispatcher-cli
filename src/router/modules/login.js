// router/modules/login.js
const login = [
	{
        //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
      path: 'pages/login/index',
      aliasPath:'/',  //对于h5端你必须在首页加上aliasPath并设置为/
      name: 'login',
        meta: {
	        title: '登录',
	    },
    },
]
export default login