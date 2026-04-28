objective:
aims to assign an entire RS image to a predefined land-use category. This task operates at the image level, requiring methods capable of capturing global contextual information. Well-  
known satellite scene classification datasets include f**MoW (Christie** **et al., 2018), EuroSat (Helber et al., 2019), BigEarthNet (Sumbul et al.,** **2019), etc.** Scene classification models often rely on pooling layers or fully connected layers to aggregate features from the entire image. For example, Li et al. (2016) uses pooling layers to fuse multi-scale features for final classification. Recently, Bazi et al. (2021) employed Vision Transformers (ViTs) to encode global features from RS images and used fully connected layers to predict the scene category, demonstrating the effectiveness of Transformer in capturing complex spatial patterns.

code:
1. [scene classification](https://drive.google.com/file/d/1_JOuELYgqAB5Cr4-rwFXfvkMu3iXEhIw/view?usp=sharing)
2. [scene classification tutorial](https://colab.research.google.com/drive/1rOHBSJRpstJE9i1JqkzolRGxOSKIYV1F)