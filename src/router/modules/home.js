// router/modules/home.js
const home = [
	{
        //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
      path: 'pages/home/index',
      aliasPath:'/home',  //对于h5端你必须在首页加上aliasPath并设置为/
      name: 'home',
        meta: {
	        title: '首页',
	    },
    },
]
export default home