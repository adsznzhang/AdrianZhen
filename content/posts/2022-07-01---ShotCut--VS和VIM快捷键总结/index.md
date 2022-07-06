---
title: "VS and Vim Short Cut"
date: "2022-07-01T08:12:03.284Z"
template: "post"
draft: false
slug: "Editor"
category: "Short Cut"
tags:
  - "Tech"
  - "Editor"
  - "VS"
description: "主要介绍VS IDE和 VIM插件的快捷"
socialImage: "https://raw.githubusercontent.com/adsznzhang/PicBed/main/imgVoxelPluginUE5.jpg"
---
## VS加快开发的快捷键 为了速度还是要配置成VIM的操作方式
- ctrl + ， 可以快速在文件直接跳转
- Ctrl + k, Ctrl + O 在头文件和cpp文件之间快速切换
- Ctril + left arrow right arrow 以单词往前或往后移动光标， Vim里的W和b可以快速实现
- Alt + shift + . 快速选中光标所在的单词  Vim里的 viw 可以实现相同效果 然后yiw可以复制选中的单词 或者vaw  yaw
- Alt + Cap + up/down 快速上移下移整行代码 Vim可以使用ddkp 或者ddjp  dd是删除后保存整行到寄存器， k上移，p是粘贴

## Vim 快捷键
**以下命令可以对标点内的内容进行操作。**

- ci'、ci"、ci(、ci[、ci{、ci< - 分别更改这些配对标点符号中的文本内容
- di'、di"、di(或dib、di[、di{或diB、di< - 分别删除这些配对标点符号中的文本内容
- yi'、yi"、yi(、yi[、yi{、yi< - 分别复制这些配对标点符号中的文本内容
- vi'、vi"、vi(、vi[、vi{、vi< - 分别选中这些配对标点符号中的文本内容

另外如果把上面的i改成a可以连配对标点一起操作。

举个例子：

比如要操作的文本如下：

111"222"333

将光标移到"222"的任何一个字符处输入命令 di" ,文本会变成： 111""333

若输入命令 da" ,文本会变成： 111333

比如我要复制从第9行到第15行的数据，复制到第16行
1. 这个最好用，强烈推荐:  
：行号9 ，行号15 copy 行号16                                        将行号9到行号15的内容复制到行号16所在行的后面。
：行号9 ，行号15 move 行号16                                       将行号9到行号15的文本内容移动到行号16所在行的后面。
2. 这个次之:  
光标移到结束行，输入ma  
光标移到起始行，输入y'a  
光标移到需要复制的行，输入p,行前复制输入大写P
3. 较次:  
首先把光标移到第9行，然后d6  
p  
然后把光标移到要粘贴的位置  
p
4、来个压轴版最最好用的  
把光标移到第9行  
shift + v  
再把光标移到第15行  
ctrl + c  
再再把光标移到第16行  
p
备注：  
查询行号，在不可编辑模式下输入：set number


<figure>
	<blockquote>
		<p>This is just test!</p>
		<footer>
			<cite>Please Leave a Comment Below if You Have Any Questions! Cheers!</cite>
		</footer>
	</blockquote>
</figure>




