---
title: "UE5 Voxel Chapter One"
date: "2022-06-01T08:12:03.284Z"
template: "post"
draft: false
slug: "UE5"
category: "Game Engine"
tags:
  - "Tech"
  - "UE5"
  - "SideProject"
description: "用UE5渲染一个面"
socialImage: "https://raw.githubusercontent.com/adsznzhang/PicBed/main/imgVoxelPluginUE5.jpg"
---

还是想从基础学起，所以通过网络找到这个[视频](https://www.bilibili.com/video/BV1ME411n7TB?spm_id_from=333.999.0.0)

**主要的坑：由于UE5较新，VS和Rider等IDE还未做好适配，同时其他插件对UE5也有很多BUG**
1. 主要是UE5的环境搭建实在是太恶心了，体积庞大，系统不同会遇到很多小错误。比如我之前遇到的无法找到头文件，最后的解决办法是重新从Epic Lancher下载最新版本的UE5
然后，再下载Rider安装包版本，才真正解决了那些恶心的问题。

2. 第一部分需要对引擎的整体的渲染周期和几个重要的组件加以了解。

解决了环境搭建问题后，第一步我直接就跟着视频做了，和Unity里面对一个立方体的渲染非常相似！[Unity传送门](https://github.com/b3agz/Code-A-Game-Like-Minecraft-In-Unity)我觉得里面有特别值得借鉴的地方，暂时还没有开始他的代码。
#### VoxelCube.h头文件
```c++
// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
//最重要的是ProcedualMeshCompnent，如果你加载头文件错误请走这里
#include "ProceduralMeshComponent.h"
#include "VoxelCube.generated.h"

//枚举变量用来指示正方体的6个面
UENUM(BlueprintType)
enum class EFaceType:uint8
{
	Up,
	Down,
	Right,
	Left,
	Forward,
	Back
};

UCLASS()
class MYPROJECT_API AVoxelCube : public AActor
{
	GENERATED_BODY()
	
public:	
	// Sets default values for this actor's properties
	AVoxelCube();
	UPROPERTY(BlueprintReadOnly)
	//定义ProceduralMeshComponent组件
	UProceduralMeshComponent* ProceduralMesh;

//ProceduralMesh->CreateMeshSection_LinearColor 组件里 这个方法所需要的变量
	TArray<FVector> Vertices;
	TArray<int32> Triangels;
	TArray<FVector> Normals;
	TArray<FVector2D> UV0;
	TArray<FLinearColor> VertexColors;
	TArray<FProcMeshTangent> Tangents;

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
	virtual  void OnConstruction(const FTransform& Transform) override;
	

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;
	//建立立方体
	void BuildCube();

//建立三角面，每一个立方体的面都是由2个三角面组成
	void BuildFace(EFaceType facetype, FVector center, FVector up,FVector right, bool reversed);

};
```
#### VoxcelCube.cpp源文件
```c++
// Fill out your copyright notice in the Description page of Project Settings.


#include "VoxelCube.h"

// Sets default values
AVoxelCube::AVoxelCube()
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

}

// Called when the game starts or when spawned
void AVoxelCube::BeginPlay()
{
	Super::BeginPlay();
	
}
//在进行构造VoxcelCube类的时候实现ProceduralMeshComponent
void AVoxelCube::OnConstruction(const FTransform& Transform)
{
	//Super::OnConstruction(Transform);
	ProceduralMesh = NewObject<UProceduralMeshComponent>(this,"ProceduralMesh");
	ProceduralMesh->RegisterComponent();

	RootComponent = ProceduralMesh;
	ProceduralMesh->SetWorldTransform(Transform);

	BuildCube();
}

// Called every frame
void AVoxelCube::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

}
//建立立方体的方法
void AVoxelCube::BuildCube()
{

	BuildFace(EFaceType::Up,FVector(0,0,100),FVector::ForwardVector,FVector::RightVector,true);
	ProceduralMesh->ClearAllMeshSections();
	ProceduralMesh->CreateMeshSection_LinearColor(0,Vertices,Triangels,Normals,UV0,VertexColors,Tangents,true);
}

//渲染三角面的方法
void AVoxelCube::BuildFace(EFaceType facetype, FVector center, FVector up, FVector right, bool reversed)
{
	//the sequence is important,you have to know the order of drawing face
	//一个面由4个顶点构成，顶点添加是按顺序添加的
	Vertices.Add(center);
	Vertices.Add(center+up*100);
	Vertices.Add(center+up*100+right*100);
	Vertices.Add(center+right*100);

//每个三角面由3个顶点构成，顺序也是有要求的，会影响法线。
	Triangels.Add(1);
	Triangels.Add(0);
	Triangels.Add(2);
	Triangels.Add(3);
	Triangels.Add(2);
	Triangels.Add(0);
//添加UV，默认是黑白方格图
	const FVector2D bUVs[] {FVector2D(0.0,0.0),FVector2D(0.0,1.0),FVector2D(1.0,1.0),FVector2D(1.0,0.0)};
	UV0.Append(bUVs,UE_ARRAY_COUNT(bUVs));
}

```
以上的代码可以画出一个面，整个的步骤还是非常简单。未完待续。这一部分还有非常需要了解的地方！我会之后慢慢添加！
**这些实现都没有从数据库读取xyz，而是简单定义一个中心坐标，再定义一个世界的长宽高，希望能够实现的是从数据库读取xyz，渲染体素，编辑体素后再写入数据库**
<figure>
	<blockquote>
		<p>This is just test!</p>
		<footer>
			<cite>Please Leave a Comment Below if You Have Any Questions! Cheers!</cite>
		</footer>
	</blockquote>
</figure>




