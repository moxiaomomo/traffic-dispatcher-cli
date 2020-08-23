// router/modules/signin.js
const signin = [
	{
        //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
      path: 'pages/signin/index',
      aliasPath:'/',  //对于h5端你必须在首页加上aliasPath并设置为/
      name: 'signin',
        meta: {
	        title: '登录',
	    },
    },
]
export default signin