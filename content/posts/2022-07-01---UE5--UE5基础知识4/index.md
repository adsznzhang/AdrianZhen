---
title: "UE5基础知识4"
date: "2022-07-01T08:12:03.284Z"
template: "post"
draft: false
slug: "UE5"
category: "Game Engine"
tags:
  - "Tech"
  - "UE5"
  - "SideProject"
description: "主要介绍FMath function 和 Pawn Class"
socialImage: "https://raw.githubusercontent.com/adsznzhang/PicBed/main/imgVoxelPluginUE5.jpg"
---
## FMath函数的使用
- FMath::Frand() 默认是生成0-1之间的随机数。
- Sin函数的用法
```cpp
void AFloater::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

	if (bShouldFloat)
	{
		FVector NewLocation = GetActorLocation();

		NewLocation.Z = NewLocation.Z + FMath::Sin(RunningTime);

		SetActorLocation(NewLocation);
		RunningTime += DeltaTime;
		
		// FHitResult HitResult;
		// AddActorLocalOffset(InitialDirection, false, &HitResult);
		//
		// FVector HitLocation = HitResult.Location;
		// UE_LOG(LogTemp, Warning, TEXT("Hit Location: X = %f, Y = %f, Z = %f"), HitLocation.X, HitLocation.Y,
		//        HitLocation.Z);
	}
}
```

- Delete Class 删除类
	- 蓝图里的类直接右键就可以删除，或者强制删除
	- C++里的类删除方式是：
		1. 找到项目文件夹下的Source文件夹，然后直接删除里面你想要删除的类。 
		2. 同时删除项目文件夹下的Binary文件夹。
		3. 然后右键unreal engine project， Genrate Visual Studio 项目文件
## Pawn Class 
- Pawn 类有RootComponent变量继承自Actor。可以通过CreateDefaultSubobject来进行初始化 类型是UScenceComponent。
- 未完待续


<figure>
	<blockquote>
		<p>This is just test!</p>
		<footer>
			<cite>Please Leave a Comment Below if You Have Any Questions! Cheers!</cite>
		</footer>
	</blockquote>
</figure>




