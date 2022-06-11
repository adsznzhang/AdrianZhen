---
title: "UE5 解释UE基础知识1"
date: "2022-06-10T08:12:03.284Z"
template: "post"
draft: false
slug: "UE5"
category: "Game Engine"
tags:
  - "Tech"
  - "UE5"
  - "SideProject"
description: "对ProceduralMeshComponent参数的一些解释"
socialImage: "https://raw.githubusercontent.com/adsznzhang/PicBed/main/imgVoxelPluginUE5.jpg"
---
#### Class and Inheritance 类和继承
1. 类
    - 父类 由变量和函数构成
    - 子类也由变量和函数构成，子类继承父类的变量和函数，子类的的函数可以重写父类的函数。子类可以访问父类的函数和变量。子类又可以有自己的子类，形成继承树。
    - 多个子类可以继承于同一个父类，一个子类可以继承于多个父类，这个子类可以同时继承所有父类的变量和函数。
    - 创建一个父类型的指针变量，这个指针可以指向继承树里的子类和父类。
        - 继承树里的子类，都可以对父类的函数重写，拥有自己的版本，如有创建一个父类型的指针，指向子类型里的函数，那么这个函数调用的是哪个版本呢？这种情况下默认都是调用子类型里的函数，这种模式称为Polymorphism。
    - a cast will take the variable pointer to parent access the object that it points to and convert it into type child one object.

#### Unreal Engine 的继承模式
1. Object-> Actor -> Pawn-> Character
    - Object 存储数据，不能被放在场景
    - Actor 可以放在场景，可以拥有视觉展示属性
    - Pawn是Actor 但是有额外的功能，可以通过控制器来控制，
    - Character 拥有角色移动组件和与角色对应的函数。jump,swimming,fly等等
    - 举个简单的例子，object actor pawn character都有很多子类
        - object 下有UStaticMesh， UTexture
        - Actor下有 ACameraActor， AHUD
        - Pawn 下有 AWheeledVehicle
        - Character有APaperCharacter

#### 要区分 IS A 和 HAS A 的关联和区别
1. 假设一个子类继承于一个父类，我们可以说，子类是父类，因为子类继承于父类(主要原因是子类继承了父类的变量和函数)。**但是我们不能说父类是子类。**
2. 一个子类可以有另一个子类，我们暂时称之为Grandchild class。父类不是子类，父类也不是Grandchild， 但是我们可以说，子类是父类（不能说子类是Grandchild），Grandchild是子类或者父类。
    - 同理在虚幻引擎里我们可以说， Object不是Actor也不是Pawn。 Actor是Object但不是Pawn， Pawn是Object也是Actor。
3. 子类里的变量可以是多种数据类型，也可能是另一个类，另一个类里可能会有一个变量包含另一个类etc
    - 虚幻引擎里的类，会有多层镶嵌。最外层为Package，次一层为World，第三层是Level，在level里面的类，继承自Actor，Actor里的Sub class为Actor Component。
    - **然后我们就可以说Package HAS A World， A World HAS A Level，A Level HAS A Actors， An Actor HAS Components**
        - **A World is Bubobject of its owning Package**
        - **A Leve is a Subobject of its owning World**
        - **An Actor is a Subobject of its owning Level**
        - **A Component is a Subobject of its owning Actor**
    - 还有一些在Package下，但不是Subobject的，例如 Meshes， Textures

#### 要了解Reflection
1. Reflection是程序在运行时的自检。c++没有内建的自检系统，但是虚幻引擎拥有自己的自检系统。
    - 这一系统的功能是融合C++数据，供虚幻的蓝图使用。
        - 如果创建一个继承自Object的对象，那么默认是不能通过蓝图来创建一个继承它的类的。需要做的是在ULASS(blueprintable)函数中传递blueprintable参数，并重新编译就可以了。
        - 创建的变量需要用UPROPERTY()来标记，并且还要传递BlueprintReadWrite参数，注意变量需要用Public：来修饰作用域
        - 创建的函数需用用UFUNCTION()，并且要传递BlueprintCallable参数
    - 垃圾回收
        - 虚幻引擎的垃圾回收会记录变量对对象的引用，如果对象不被变量引用，则会自动删除
        - 为了对象能被这一系统识别，需要使用专用的宏SPECIAL_MACRO()，任何想要被虚幻引擎垃圾回收系统管理的对象，都要使用这一宏，
        - Unreal Header Tool  UHT是一个用来在编译时收集这一信息的程序。当遇到这一宏时，额外的代码会添加到这一对象，供垃圾回收系统获取关于对象的信息。
            - UCLASS 是垃圾回收系统用来标记对象的。
            - 对象里的变量必须用UPROPERTY()来标记
            - 对象里的函数必须用UFUNCTION()来标记
            - 同时还需要添加一个头文件#include "MyActor.generated.h" MyActor是你创建的类的名字。

<figure>
	<blockquote>
		<p>This is just test!</p>
		<footer>
			<cite>Please Leave a Comment Below if You Have Any Questions! Cheers!</cite>
		</footer>
	</blockquote>
</figure>




