https://torchgeo.readthedocs.io/en/stable/api/models.html

## TorchGeo Model Architectures

### **Foundation Models (Multimodal & Sensor-Agnostic)**

**1. Aurora** A Swin Transformer U-Net architecture designed for Earth observation tasks with foundation model capabilities.

**2. DOFA (Dynamic One-For-All)** A vision transformer that uses a novel wavelength-based spectral hypernetwork to handle RGB, SAR, MSI (multispectral), and HSI (hyperspectral) data with any number of spectral bands. It maps spectral wavelengths to learned representations, making it highly flexible across different sensors.

**3. Panopticon** Extends DINOv2 with cross attention over channels, additional metadata in the patch embeddings, and spectrally-continual pretraining. Excellent for SAR and HSI data, and handles "non-standard" sensors with improved performance over DOFA.

**4. Copernicus-FM** Combines the spectral hypernetwork introduced in DOFA with a new language hypernetwork and additional metadata. Designed to combine image data with non-spectral data like DEMs (Digital Elevation Models), land use/land cover data, and air quality data. Supports variable image dimensions via FlexiViT.

**5. CROMA (Cross-Modal Attention)** A multimodal model that handles both SAR and optical imagery simultaneously. Uses cross-attention mechanisms to learn joint representations from different sensor modalities. Available in base and large versions.

**6. Scale-MAE** The first foundation model to explicitly support RGB images across a wide range of spatial resolutions, making it adaptable to different satellite sensors with varying ground sample distances.

**7. EarthLoc** A geolocation model designed for localizing images based on Earth observation data.

**8. Be The Change (BTC)** A model architecture focused on change detection tasks in geospatial imagery.

### **Classic Deep Learning Backbones**

**9. ResNet (ResNet-18, [[ResNet-50]], ResNet-152)** Standard residual networks adapted for multispectral imagery. TorchGeo provides pre-trained weights on Sentinel-1, Sentinel-2, Landsat, and other satellite data sources, going beyond the typical 3-channel RGB ImageNet weights.

**10. Vision Transformer (ViT)** Transformer-based models (small, base, large variants) pre-trained on satellite imagery datasets like SSL4EO-S12 using self-supervised learning methods (DINO, MoCo).

**11. Swin Transformer** Hierarchical vision transformer with shifted windows, pre-trained on massive amounts of Sentinel-2 and NAIP data via the Satlas project.

### **Change Detection Models**

**12. ChangeStar** Enables any segmentation model to detect binary change by attaching a ChangeMixin module to a segmentation model without the classification head. Useful for both binary and multi-class change detection under bitemporal or single-temporal supervision.

**13. ChangeViT** Vision Transformer-based architecture specifically designed for change detection tasks in satellite imagery.

**14. FC-Siamese Networks (FCSiamConc, FCSiamDiff)** Fully-convolutional Siamese networks for change detection. Processes pairs of images from different time periods to identify changes. Includes concatenation (FCSiamConc) and difference (FCSiamDiff) variants.

### **Semantic Segmentation Models**

**15. U-Net** The classic encoder-decoder architecture for semantic segmentation, adapted for geospatial data with support for multispectral imagery.

**16. FarSeg (Foreground-Aware Relation Network)** Can be used for binary or multi-class object segmentation, such as building, road, ship, and airplane segmentation. Uses ResNet backbones and focuses on foreground-background relationships.

**17. FCN (Fully-Convolutional Network)** A simple 5-layer fully convolutional network with leaky ReLUs, designed as a baseline for semantic segmentation tasks.

### **Specialized Architectures**

**18. ConvLSTM** Convolutional LSTM for spatiotemporal sequence modeling, useful for analyzing time series of satellite imagery.

**19. L-TAE (Lightweight Temporal Attention Encoder)** Designed for crop classification and other temporal analysis tasks using satellite image time series.

**20. MOSAIKS (Multi-task Observation using Satellite Imagery & Kitchen Sinks)** A model that uses random convolutional features for rapid analysis of satellite imagery across multiple tasks.

**21. TileNet** (in latest version) A model for learning representations from geospatial tiles.

**22. Tessera** (in latest version) Another specialized architecture for geospatial analysis.

---

Each model comes with pre-trained weights from various datasets (SSL4EO, Satlas, SeCo, etc.) and can be fine-tuned for specific downstream tasks like land cover classification, crop type mapping, building detection, or disaster monitoring.