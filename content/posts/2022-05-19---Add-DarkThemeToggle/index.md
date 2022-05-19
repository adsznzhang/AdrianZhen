---
title: "Add Dark Theme Toggle"
date: "2022-05-19T08:12:03.284Z"
template: "post"
draft: false
slug: "Gatsby"
category: "GatsbyBlog"
tags:
  - "Tech"
  - "BlogFunction"
  - "SideProject"
description: "There are few function to be improved on my blog"
socialImage: "/media/gutenberg.jpg"
---

添加暗黑主题的Toggle，但是对全局CSS的改变还没有调整好。

**主要的几个坑 : 由于自己的React的编程能力实在太烂只能用插件来实现一些功能，但是插件有一些会年久停更。。**

1. 我是用的gatsbyV4 新版的React和Gatsby并不能很好的兼容Gatsby-plugin-dark-mode。所以安装的时候需要用下面这种方式[传送门](https://github.com/insin/gatsby-plugin-dark-mode/issues/16) 

2. 安装完成后，在使用Themetoggle组件的时候会报错，无法找到插件。解决方法[在项目文件夹下创建.d.ts](https://stackoverflow.com/questions/67015128/how-to-use-gatsby-plugin-dark-mode-in-typescript-gatsby)

3. 最后不要忘记了在gatsby-config.ts文件夹下添加下面的语句
```js
//gatsby-config.ts
module.exports={
	plugins:[
		"gatsby-plugin-dark-mode"
	]
}
```

如果经过上面的步骤还是不行，那只能硬克代码了。




## More Function 

5月19号添加暗黑主题的Toggle按钮！


<figure>
	<blockquote>
		<p>This is just test!</p>
		<footer>
			<cite>—cool</cite>
		</footer>
	</blockquote>
</figure>




