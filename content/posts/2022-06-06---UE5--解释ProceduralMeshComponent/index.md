---
title: "UE5 详细解释ProceduralMeshComponent"
date: "2022-06-06T08:12:03.284Z"
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

上一节我们通过UE5渲染了一个面，其中最重要的是使用了ProceduralMeshComponent这篇主要就是讲解一下这一函数所需要的参数。

**我自己对图形学了解也不是很多，所以目前只能从使用的角度对此组件进行描述**
1. Vertices用来存储每个面的顶点

2. 一个四边形由两个三角面构成，三角面的渲染通过三个顶点来构成

3. UVs用来存储贴图的坐标。

这次我们依旧使用ProceduralMeshComonent,但是更为简单一些，在UE5中创建一个空的C++UE5项目，然后创建一个C++类 继承AActor，然后再定义必须的一些参数：
#### VoxelCube.h头文件
```c++
#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "ProceduralMeshComponent.h"
#include "ProcMesh.generated.h"

UCLASS()
class PROCEDURALMESH_API AProcMesh : public AActor
{
	GENERATED_BODY()
	
	TArray<FVector> Vertices;
	TArray<int32> Triangles;
	TArray<FVector2D> UVs;

	UPROPERTY()
	UProceduralMeshComponent* ProcMesh;

	void CreateMesh();
public:
	
	// Sets default values for this actor's properties
	AProcMesh();
protected:
	UPROPERTY(EditAnywhere)
	UMaterialInterface* Material;
	
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
```


#### VoxcelCube.cpp源文件
```c++
#include "ProcMesh.h"

AProcMesh::AProcMesh()
{
 	ProcMesh = CreateDefaultSubobject<UProceduralMeshComponent>("ProcMesh");
	RootComponent = ProcMesh;
}

void AProcMesh::CreateMesh()
{
	Vertices.Add(FVector(-50, 0, 50));
	Vertices.Add(FVector(-50, 0, -50));
	Vertices.Add(FVector(50, 0, 50));
	Vertices.Add(FVector(50, 0, -50));

	UVs.Add(FVector2D(0, 0));
	UVs.Add(FVector2D(0, 1));
	UVs.Add(FVector2D(1, 0));
	UVs.Add(FVector2D(1, 1));

	//Triangle1
	Triangles.Add(0);
	Triangles.Add(1);
	Triangles.Add(2);

	//Triangle2
	Triangles.Add(2);
	Triangles.Add(1);
	Triangles.Add(3);
	
	ProcMesh->CreateMeshSection(0, Vertices, Triangles, TArray<FVector>(), UVs, TArray<FColor>(), TArray<FProcMeshTangent>(), true);
	if (Material)
	{
		ProcMesh->SetMaterial(0, Material);
	}
}

// Called when the game starts or when spawned
void AProcMesh::BeginPlay()
{
	Super::BeginPlay();

	CreateMesh();
}


```
以上的代码可以画出下面的面：![渲染的面](/media/Plane.jpg)

三角形的顶点索引添加的顺序会影响面的正反。下图是代码渲染的三角面![三角面](/media/Triangles.jpg)  

最后是对贴图坐标的添加![如图](/media/UV.jpg)  


**下面是自己有关这三个参数的一些资料希望对你有所帮助！**

- [最原始的ProceduralMeshComponent的说明文档，有些地方已经过时了](https://nerivec.github.io/old-ue4-wiki/pages/procedural-mesh-component-in-cgetting-started.html)
- [基本介绍ProceduralMeshComponent](https://superyateam.com/2021/06/26/how-to-use-proceduralmeshcomponent-in-ue4/)
	- [接上文更进一步的介绍](https://80.lv/articles/building-procedural-art-tools-in-unreal-engine-4/)
- [中文版的介绍ProceduralMeshComponent](https://zhuanlan.zhihu.com/p/346745928)

- [根据顶点生成面](https://zhuanlan.zhihu.com/p/413467168)

- [对UV的详细说明](https://zhuanlan.zhihu.com/p/136033515)

- [这一篇同样是对UV的说明，非常推荐](https://blog.csdn.net/weixin_33905756/article/details/85669648?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-3.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-3.nonecase)

- [英文版非常详细的说明了UV和贴图](https://www.spiria.com/en/blog/desktop-software/understanding-uv-mapping-and-textures/)

如果你有更好的相关资料可以在留言里附上链接！感谢！
<figure>
	<blockquote>
		<p>This is just test!</p>
		<footer>
			<cite>Please Leave a Comment Below if You Have Any Questions! Cheers!</cite>
		</footer>
	</blockquote>
</figure>




