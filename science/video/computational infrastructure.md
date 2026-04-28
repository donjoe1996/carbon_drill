---
target: https://youtu.be/b_cDEJ8AxNE
doc_type:
  - video
tags:
  - AI
  - EO
description: (Episode 5) TECHNICAL UNIVERSITY OF MUNICH Lecture video series
year_pub: 2026
---
> [!Note] Original course name is AI4EO Platforms and Best Practices (episode 5).
> For the sake of connecting this resource with other materials, I renamed it as computational infrastructure.

>[!Note] Nighttime and Sea Surface Temperature
>https://colab.research.google.com/drive/1ncO2JJ3XeVvfpiL39NCGkVc26eyYXoYL?usp=sharing


[![Watch the video](https://img.youtube.com/vi/b_cDEJ8AxNE/0.jpg)](https://www.youtube.com/watch?v=b_cDEJ8AxNE)

# EO cloud sources
1. Google earth engine
2. Microsoft planetary computer
3. Amazon https://aws.amazon.com/earth/

# Cloud compute

![[Pasted image 20260217205238.png]]


# Library

TorchGeo is a [PyTorch](https://pytorch.org/) domain library, similar to [torchvision](https://docs.pytorch.org/vision), providing datasets, samplers, transforms, and pre-trained models specific to geospatial data.
The goal of this library is to make it simple:
1. for machine learning experts to work with geospatial data, and
2. for remote sensing experts to explore machine learning solutions.

# Programming paradigm
1. Imperative programming
2. Declarative programming
3. Functional programming -> used in Google Earth Engine

# Map, Filter, Reduce
- Map-> run the same operation in list/tuple
- Filter ->  filter out elements that do not satisfy some function
- Reduce -> apply a function cumulatively to all elements

a = ['1','2','3','4']
b = map(int, a)
c = filter(greater_than_2, b)
d = reduce(add, c)

# GEE
![[Pasted image 20260217211222.png]]

# Limitations of GEE
Pros
- Hundreds of free datasets for Earth science analysis
- Upload your own assets if a dataset is missing
- Automatically parallelize code and distribute across servers (no CS PhD required!)
- Abstract away complexities of dealing with CRS and projections (no geodesy PhD required!)

Cons
- Only free for non-commercial, non-production use
- Strict usage quotas
- Non-extensible:
	- No deep learning support
	- Not all problems can be solved by map-filter-reduce paradigm
	- Barely open source, "free" NASA/ESA data is now copyright

# When to use GEE
![[Pasted image 20260217211222.png]]