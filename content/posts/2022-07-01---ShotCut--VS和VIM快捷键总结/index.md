---
title: "VS and Vim Short Cut"
date: "2022-07-01T08:12:03.284Z"
template: "post"
draft: false
slug: "Editor"
category: "Short Cut"
tags:
  - "Vim"
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

## Vim 里的标记相当于VS里的书签功能Mark
在编辑的时候，你忽然想起来需要修改同一个文档的另一个地方，但又想记住当前的位置，以便稍后再回来编辑。应该怎么做呢？vim中我们可以对文本进行标记，这个概念类似于visual studio中的书签，目的是方便vim编辑器在文档的不同位置间跳转。

正常情况下，这意味着要移动到那个位置，编辑，然后再移回来。这样很费事，也容易忘记刚才所在的位置。

Vim有更聪明的办法。移动光标到下述文本的第5行（John Lennon的名言）。用ma创建一个名为‘a’的标记。移动光标到任一地方，比如，4j。

按下'a（即，单引号加上标记的名字），瞧，Vim跳到了刚才做标记的那一行的行首。如果要跳到做标记的位置，按下a(即,上排数字键1左边那个键）。

可以使用任一字母（a-zA-Z）去命名一个标记，意味着一个文件里最多可以有52个命名标记。

### 添加标记
将光标移到某一行，使用 ma 命令添加标记。其中，m 是标记命令，a 是所做标记的名称。

可以使用小写字母 a-z 或大写字母 A-Z 中的任意一个做为标记名称。小写字母的标记，仅用于当前缓冲区；而大写字母的标记，则可以跨越不同的缓冲区。例如，你正在编辑 File1，但仍然可以使 用'A 命令，移动到 File2 中创建的标记A。

### 跳转标记
创建标记后，可以使用 'a 命令，跳转到指定标记行的首个非空字符。这里 ' 是单引号。也可以使用 a 命令，移到所做标记时的光标位置。这里是反引号（也就是数字键1左边的那一个）。

### 列出标记
利用:marks命令，可以列出所有标记。这其中也包括一些系统内置的特殊标记（Special marks）：

. ——最近编辑的位置  
0-9 ——最近使用的文件  
∧ ——最近插入的位置  
' ——上一次跳转前的位置  
" ——上一次退出文件时的位置  
[ ——上一次修改的开始处  
] ——上一次修改的结尾处  

### 删除标记  

如果删除了做过标记的文本行，那么所做的标记也就不存了。我们不仅可以利用标记来快速移动，而且还可以使用标记来删除文本，例如在某一行用ma做了标记，然后就可以使用d'a来删掉这一行。当然，我们也可以使用y'a命令就可以来复制这一行了。

使用:delmarks a b c命令，可以删除某个或多个标记；而:delmarks! 命令，则会删除所有标记。

利用:help mark-motions命令，可以查看关于标记的更多帮助信息。

### 命令小结  

m ——创建标记  
' ——移动到标记的文本行首  
` ——移动到标记的光标位置  
:marks ——列示所有标记  
:delmarks ——删除指定标记  
:delmarks! ——删除所有标记  
<figure>
	<blockquote>
		<p>This is just test!</p>
		<footer>
			<cite>Please Leave a Comment Below if You Have Any Questions! Cheers!</cite>
		</footer>
	</blockquote>
</figure>




