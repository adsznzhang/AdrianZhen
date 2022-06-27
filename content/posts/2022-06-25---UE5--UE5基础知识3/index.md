---
title: "UE5基础知识3"
date: "2022-06-25T08:12:03.284Z"
template: "post"
draft: false
slug: "UE5"
category: "Game Engine"
tags:
  - "Tech"
  - "UE5"
  - "SideProject"
description: "主要介绍Actor和Actor Component"
socialImage: "https://raw.githubusercontent.com/adsznzhang/PicBed/main/imgVoxelPluginUE5.jpg"
---


## Actors and Actor Component
- 对类的命名要具有代表性！比如在C++类创建一个Floater，如果使用Blueprint继承这个类，那么可以Floater_BP。当然你可以自己决定命名的方式，但要具有意义！  
- 在C++类中使用UPEROPERTY宏，暴露UstaticMeshComponent 变量，同时还需要使用CreateDefaultSubobject模板来创建一个组件并赋值给变量。此时我们就能在蓝图类中看到创建的这一个StaticMeshComponent组件，并且可以为它进行赋值
- 设置Actor的坐标使用SetActorLocation()函数，此函数接受FVector()构造函数，
```cpp
SetActorLocation(FVector(0.0f,0.0f,0.0f));

//or you can also do below
FVector InitialLocation = FVector(0.0f,0.0f,0.0f);
SetActorLocation(InitialLocation);

```

- 通过UPROPERTY()可以把属性暴露给Blueprint. 下面的BlueprintReadWrite参数可以让变量在蓝图中Get和Set，EditInstanceOnly意思就是字面的意思，只有在实例上才能编辑，蓝图里的Default无法编辑。如果想在Default的细节中编辑变量，则需要添加EditDefaultsOnly这个参数。TIPS  按住Shift+F1可以跳出运行的游戏

```cpp
public:	
	// Sets default values for this actor's properties
	AFloater();

	UPROPERTY(VisibleAnywhere,Category="ActorMeshComponents")
	UStaticMeshComponent* StaticMesh;//we have to construct it in cpp file

	//create a FVector variable and use in blueprint
	UPROPERTY(EditInstanceOnly, BlueprintReadWrite,Category="FloaterVectors")
	FVector InitialLocation = FVector(0.0f);

    	//location of Actor when dragged in from the editor
	UPROPERTY( VisibleInstanceOnly, BlueprintReadWrite,Category="FloaterVectors")
	FVector PlaceLocation;

    UPROPERTY(EditDefaultsOnly, BlueprintReadWrite,Category="Floater Variables")
	bool bInitializerFloaterLocations;

```

- 补充留位置

## Collision碰撞

- Complex碰撞的计算量大，是Mesh本身，会降低性能，一般会赋予简单碰撞网格
- 物理模拟可以开启和关闭，默认是关闭
- AddActorLocalOffset函数的第二个参数bSweep，是一个布尔值来决定是否sweep，进而控制碰撞的检测
- AddActorLocalOffset函数的第三个参数是FHitResult,可以通过定义查看此参数。同时我们可以使用UE_LOG来打印我们所需要的信息：
```cpp
void AFloater::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
	if (bShouldFloat)
	{
		FHitResult HitResult;
		AddActorLocalOffset(InitialDirection,false, &HitResult);

		FVector HitLocation = HitResult.Location;
		UE_LOG(LogTemp,Warning,TEXT("Hit Location: X = %f, Y = %f, Z = %f"),HitLocation.X,HitLocation.Y,HitLocation.Z);
	}

}
```
- 在Collision Details里面设置Object Type 来决定碰撞对不同对象的交互，是Ignore Overlap还是Block （根据对象的Object Type属性来决定碰撞的行为）

## World 和 Local

- 熟悉AddActorWorldOffset 和 AddActorLocalOffset
- 熟悉AddActorLocalRotation()
## Force 和 Torque
- 熟悉UStaticMeshComponent类下的AddForce方法

<figure>
	<blockquote>
		<p>This is just test!</p>
		<footer>
			<cite>Please Leave a Comment Below if You Have Any Questions! Cheers!</cite>
		</footer>
	</blockquote>
</figure>




