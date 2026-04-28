# 🌍 4-Week Geospatial AI Learning Plan

## Overview
**Goal:** From deep learning fundamentals → Computer vision basics → Ready for geospatial projects

**Time Commitment:** 4 weeks, ~10-15 hours per week

**End Result:** You can classify satellite imagery and detect objects in geospatial data

---

>[!note] PREREQUISITES 
>(What you MUST understand first):
>- [[ReLU]]
>- [[backpropagation]] (how to train)
>- Gradient Descent (how to update weights)
>
>BUILT ON TOP OF PREREQUISITES:
>- Convolution (how to apply to images)
>- CNN (stacking conv layers)
>- Computer Vision Tasks (classification, detection, segmentation)
>- Geospatial Applications (satellite imagery) 
>
>You CAN'T understand convolution without understanding ReLU and backprop. You CAN'T train a CNN without understanding backprop. You CAN'T do geospatial AI without understanding all of it.
## WEEK 1: Computer Vision Fundamentals (10-12 hours)

### Day 1-2: Digital Images (4 hours)
**What You'll Learn:**
- What is a digital image? (pixels, channels, color)
- RGB, grayscale, multispectral imagery
- Image arrays in Python (NumPy)
- Loading and displaying images

**Activities:**
- [x] Load and visualize local images using Python
- [x] Understand image dimensions (height, width, channels)
- [x] Convert RGB to grayscale
- [x] Understand pixel values (0-255)

**Code Example You'll Write:**
```python
import numpy as np
from PIL import Image

# Load image
img = Image.open('satellite.jpg')
img_array = np.array(img)

print(img_array.shape)  # (height, width, channels)
print(img_array.min(), img_array.max())  # 0, 255
```

**Resources:**
- Read: "What is a Digital Image?" (1 hour)
- Practice: Load 10 different images (1.5 hours)
- Visualize: Create side-by-side RGB/Grayscale comparisons (1.5 hours)

---

### Day 3-4: Convolution Operation (4 hours)
**What You'll Learn:**
- What is a filter/kernel?
- How convolution works (step-by-step)
- What different filters detect (edges, corners, textures)
- How convolution reduces parameters

**Activities:**
- [ ] Manually compute a convolution (by hand, then code)
- [ ] Apply edge detection filters to images
- [ ] Understand kernel/filter visualization
- [ ] See how convolution preserves spatial structure

**Visual Intuition:**
```
Image:          Filter (3×3):    Result:
┌─────┐        ┌─────┐         ┌─────┐
│ ... │   *    │ ... │    =    │ ... │
└─────┘        └─────┘         └─────┘

Filter SLIDES across image
Each position: multiply + sum = feature
```

**Code Example:**
```python
from scipy import signal
import numpy as np

# Define edge detection filter
edge_filter = np.array([[-1, -1, -1],
                        [-1,  8, -1],
                        [-1, -1, -1]])

# Apply convolution
edges = signal.convolve2d(img_array, edge_filter)
```

**Resources:**
- Interactive visualization: Convolution visualizer (1 hour)
- Practice: Apply 5 different filters to 1 image (1.5 hours)
- Understand: Why convolution is useful (1 hour)
- Coding: Implement manual convolution (0.5 hours)

---

### Day 5: Pooling & Stride (2-3 hours)
**What You'll Learn:**
- Max pooling and average pooling
- Why pooling? (reduce size, keep important features)
- Stride: how far filter moves each step
- Relationship: convolution + pooling = dimensionality reduction

**Activities:**
- [ ] Apply max pooling to images
- [ ] Visualize what information is preserved
- [ ] Understand receptive field concept
- [ ] See how stride affects output size

**Code Example:**
```python
from torch.nn import MaxPool2d

# Max pooling 2×2
pool = MaxPool2d(kernel_size=2, stride=2)
pooled = pool(feature_map)
# Input: (32, 32) → Output: (16, 16)
```

---

## WEEK 2: CNN Architecture & Training (10-12 hours)

### Day 1-2: CNN Architecture (4 hours)
**What You'll Learn:**
- Layers in a CNN: Conv → ReLU → Pooling
- Dense layers at the end
- How information flows through CNN
- Why CNNs work for images (local patterns, translation invariance)

**Architecture Visualization:**
```
Image (256×256×3)
    ↓ [Conv 3×3, 32 filters, ReLU]
Feature Maps (256×256×32)
    ↓ [Max Pool 2×2]
(128×128×32)
    ↓ [Conv 3×3, 64 filters, ReLU]
(128×128×64)
    ↓ [Max Pool 2×2]
(64×64×64)
    ↓ [Flatten]
(262,144 values)
    ↓ [Dense 128]
(128 values)
    ↓ [Dense 10] ← Output classes
```

**Activities:**
- [ ] Understand what each Conv layer learns
- [ ] Visualize learned filters
- [ ] Trace how size changes through network
- [ ] Understand parameters vs RNNs

**Code Example:**
```python
import torch
import torch.nn as nn

class SimpleCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.fc1 = nn.Linear(64*64*64, 128)
        self.fc2 = nn.Linear(128, 10)
    
    def forward(self, x):
        x = self.pool(torch.relu(self.conv1(x)))
        x = self.pool(torch.relu(self.conv2(x)))
        x = x.view(x.size(0), -1)
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x
```

---

### Day 3-4: Training CNNs (4 hours)
**What You'll Learn:**
- Data preparation for images
- Train/validation/test splits
- Loss functions for classification (CrossEntropyLoss)
- Training loop: forward → loss → backward → update
- Evaluating accuracy and metrics

**Activities:**
- [ ] Load image dataset (CIFAR-10 or similar)
- [ ] Normalize images (0-1 range)
- [ ] Create train/val/test splits
- [ ] Train a CNN from scratch
- [ ] Monitor loss and accuracy

**Code Example:**
```python
import torch.optim as optim

# Training loop
for epoch in range(10):
    for images, labels in train_loader:
        # Forward pass
        outputs = model(images)
        loss = criterion(outputs, labels)
        
        # Backward pass
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
    
    # Validation
    val_accuracy = evaluate(model, val_loader)
    print(f"Epoch {epoch}: Loss={loss:.4f}, Accuracy={val_accuracy:.2f}")
```

---

### Day 5: Image Preprocessing (2-3 hours)
**What You'll Learn:**
- Normalization: why rescale to 0-1 or mean/std?
- Augmentation: rotate, flip, crop images
- Data loaders and batching
- Common preprocessing mistakes

**Activities:**
- [ ] Normalize images properly
- [ ] Apply augmentation transforms
- [ ] Create data loaders
- [ ] See effect on training

---

## WEEK 3: Computer Vision Tasks & Pre-trained Models (10-12 hours)

### Day 1-2: Image Classification (3-4 hours)
**What You'll Learn:**
- Classification task: assign single label to whole image
- Softmax activation and probabilities
- Different architectures: VGG, ResNet, EfficientNet
- Transfer learning: use pre-trained models

**Activities:**
- [ ] Understand multi-class classification
- [ ] Load pre-trained ResNet50
- [ ] Fine-tune on custom dataset
- [ ] Make predictions

**Code Example:**
```python
from torchvision import models

# Load pre-trained ResNet50
model = models.resnet50(pretrained=True)

# Replace final layer for your task (10 classes)
model.fc = nn.Linear(2048, 10)

# Train on your data
for images, labels in train_loader:
    outputs = model(images)
    loss = criterion(outputs, labels)
    # ... backprop
```

**For Geospatial:** This is how you'd classify satellite tiles as forest/urban/water/etc.

---

### Day 3: Object Detection (3-4 hours)
**What You'll Learn:**
- Object detection: find AND localize objects
- Bounding boxes: (x, y, width, height)
- YOLO, Faster R-CNN architectures
- Non-maximum suppression (NMS)

**Activities:**
- [ ] Load pre-trained YOLO model
- [ ] Detect objects in images
- [ ] Understand bounding box format
- [ ] Visualize detections

**Code Example:**
```python
from ultralytics import YOLO

# Load pre-trained YOLO
model = YOLO('yolov8n.pt')

# Predict
results = model('image.jpg')

# Draw boxes
for result in results:
    for box in result.boxes:
        print(f"Class: {box.cls}, Confidence: {box.conf}")
        # Draw box on image
```

**For Geospatial:** This is how you'd find buildings, roads, trees in satellite imagery.

---

### Day 4: Semantic Segmentation (3-4 hours)
**What You'll Learn:**
- Segmentation: label EVERY pixel
- Difference from classification/detection
- U-Net architecture
- Mask generation and evaluation

**Activities:**
- [ ] Understand pixel-wise classification
- [ ] Load segmentation dataset
- [ ] Train U-Net model
- [ ] Evaluate with IoU (Intersection over Union)

**Code Example:**
```python
# Segmentation head
class SegmentationNet(nn.Module):
    def __init__(self, num_classes):
        super().__init__()
        self.encoder = models.resnet50(pretrained=True)
        self.decoder = UNetDecoder(2048, num_classes)
    
    def forward(self, x):
        features = self.encoder(x)
        output = self.decoder(features)
        return output  # Same spatial size as input
```

**For Geospatial:** This is how you'd create land-cover maps (every pixel labeled).

---

### Day 5: Choosing the Right Task (2-3 hours)
**What You'll Learn:**
- When to use classification vs detection vs segmentation
- Pros/cons of each approach
- Multi-task learning

**Decision Tree:**
```
Do you need to...
├── Classify ENTIRE image? → Classification
├── Find AND LOCATE objects? → Detection
└── Label EVERY pixel? → Segmentation
```

---

## WEEK 4: Geospatial Basics & First Project (15-18 hours)

### Day 1-2: Geospatial Data Fundamentals (5-6 hours)
**What You'll Learn:**
- Raster vs Vector data
- GeoTIFF format (georeferenced images)
- Coordinate systems and projections
- Multispectral imagery (more than RGB)
- Libraries: Rasterio, Geopandas

**Activities:**
- [ ] Download free satellite data (Sentinel-2, Landsat)
- [ ] Load GeoTIFF files
- [ ] Extract specific bands
- [ ] Understand geospatial metadata
- [ ] Reproject data

**Code Example:**
```python
import rasterio
import numpy as np

# Load GeoTIFF
with rasterio.open('sentinel2.tif') as src:
    # Read specific bands (Sentinel-2 has 11+ bands)
    red = src.read(4)      # Band 4 = Red
    green = src.read(3)    # Band 3 = Green
    blue = src.read(2)     # Band 2 = Blue
    nir = src.read(8)      # Band 8 = Near Infrared
    
    # Create RGB image
    rgb = np.stack([red, green, blue], axis=2)
    
    # Calculate NDVI (vegetation index)
    ndvi = (nir - red) / (nir + red + 1e-8)
```

**Resources:**
- Understanding coordinate systems (1 hour)
- Working with Rasterio (1.5 hours)
- Free satellite data sources (0.5 hours)
- Creating true-color composites (1 hour)
- Calculating indices (NDVI, NDBI, etc.) (1 hour)

---

### Day 3-4: Project - Land Cover Classification (8-10 hours)

**Project Goal:** Classify satellite imagery into 5 classes
- Urban
- Forest
- Agriculture
- Water
- Cloud/Bare

**Project Steps:**

**Step 1: Data Preparation (2 hours)**
- [ ] Download Sentinel-2 data (or use provided dataset)
- [ ] Extract RGB bands
- [ ] Normalize to 0-1
- [ ] Create train/val/test splits
- [ ] Augment data (rotate, flip)

**Step 2: Model Building (2 hours)**
- [ ] Use pre-trained ResNet50
- [ ] Replace final layer (5 classes)
- [ ] Setup loss function (CrossEntropyLoss)
- [ ] Setup optimizer (Adam)

**Step 3: Training (2 hours)**
- [ ] Train for 10-20 epochs
- [ ] Monitor train/val loss
- [ ] Monitor accuracy
- [ ] Save best model

**Step 4: Evaluation (1.5 hours)**
- [ ] Test on unseen data
- [ ] Calculate precision, recall, F1
- [ ] Create confusion matrix
- [ ] Visualize predictions vs ground truth

**Step 5: Deployment (0.5 hours)**
- [ ] Create prediction function
- [ ] Test on new satellite images
- [ ] Visualize results on map

**Code Skeleton:**
```python
import torch
import torchvision.models as models
from torch.utils.data import DataLoader

# 1. DATA
train_dataset = LandCoverDataset('train_images/', 'train_labels/')
val_dataset = LandCoverDataset('val_images/', 'val_labels/')
train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)

# 2. MODEL
model = models.resnet50(pretrained=True)
model.fc = torch.nn.Linear(2048, 5)  # 5 classes

# 3. TRAINING
criterion = torch.nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

for epoch in range(20):
    for images, labels in train_loader:
        outputs = model(images)
        loss = criterion(outputs, labels)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
    
    # Validation
    val_loss = evaluate(model, val_loader)
    print(f"Epoch {epoch}: Train Loss={loss:.4f}, Val Loss={val_loss:.4f}")

# 4. EVALUATION
test_accuracy = evaluate(model, test_loader)
print(f"Test Accuracy: {test_accuracy:.2f}%")

# 5. DEPLOYMENT
def predict_image(image_path):
    img = load_image(image_path)
    with torch.no_grad():
        output = model(img.unsqueeze(0))
    return torch.argmax(output, dim=1)
```

**Deliverables:**
- [ ] Trained model (save as .pth file)
- [ ] Predictions on test set
- [ ] Visualization: predicted map vs ground truth
- [ ] Metrics: accuracy, F1-score, confusion matrix
- [ ] Documentation: what you learned

---

### Day 5: Reflection & Next Steps (2-3 hours)

**What You'll Do:**
- [ ] Review what you built
- [ ] Document your learnings
- [ ] Identify challenges
- [ ] Plan next project

**Reflect On:**
1. What was hardest? (likely: data preparation, overfitting)
2. What surprised you? (likely: how fast training can be)
3. What would you do differently? (iterate!)

**Next Steps Available:**
- Project 2: Building detection (object detection)
- Project 3: Land cover segmentation (semantic segmentation)
- Advanced: Change detection (comparing before/after)

---

## Daily Time Breakdown

```
WEEK 1 (Computer Vision Basics): 10-12 hours
├── Day 1-2: Digital Images (4 hours)
├── Day 3-4: Convolution (4 hours)
└── Day 5: Pooling & Stride (2-3 hours)

WEEK 2 (CNN Architecture): 10-12 hours
├── Day 1-2: CNN Architecture (4 hours)
├── Day 3-4: Training & Metrics (4 hours)
└── Day 5: Preprocessing & Augmentation (2-3 hours)

WEEK 3 (CV Tasks): 10-12 hours
├── Day 1-2: Classification & Transfer Learning (3-4 hours)
├── Day 3: Object Detection (3-4 hours)
├── Day 4: Semantic Segmentation (3-4 hours)
└── Day 5: Task Selection (2-3 hours)

WEEK 4 (Geospatial + Project): 15-18 hours
├── Day 1-2: Geospatial Fundamentals (5-6 hours)
├── Day 3-4: Land Cover Classification Project (8-10 hours)
└── Day 5: Reflection & Next Steps (2-3 hours)

TOTAL: 45-54 hours (very achievable in 4 weeks!)
```

---

## Learning Resources by Week

### Week 1
- Convolution visualizer: https://distill.pub/2016/misunderstanding-cnns/
- Image processing: Pillow documentation
- NumPy for images: NumPy array manipulation guide

### Week 2
- CNN architectures: Papers with Code
- PyTorch tutorials: pytorch.org/tutorials
- Understanding backprop in CNNs: DeepLearning.AI

### Week 3
- PyTorch Vision models: torchvision docs
- YOLO tutorial: ultralytics.com
- U-Net paper & implementations: Kaggle notebooks

### Week 4
- Rasterio documentation: rasterio.readthedocs.io
- Sentinel-2 data: Copernicus Open Access Hub
- Geopandas tutorial: geopandas.org

---

## Success Metrics

**By end of Week 4, you should be able to:**

✅ Explain convolution and why it's useful for images
✅ Build and train a CNN from scratch
✅ Use pre-trained models (transfer learning)
✅ Choose between classification, detection, segmentation
✅ Load and work with satellite imagery (GeoTIFF)
✅ Build a working land cover classifier
✅ Evaluate models with proper metrics

---

## Tips for Success

1. **Code daily** - Don't just watch tutorials, write code
2. **Use Jupyter notebooks** - Visualize intermediate outputs
3. **Start with pre-trained models** - Faster than training from scratch
4. **Use cloud computing** - Google Colab has free GPU
5. **Join communities** - GeoAI, Kaggle, Reddit r/MachineLearning
6. **Build projects** - The project is where real learning happens

---

## After 4 Weeks - What's Next?

Once you complete this plan, you'll be ready for:

**Advanced Geospatial Projects:**
- Building footprint extraction (object detection)
- Change detection (flood mapping, deforestation)
- Crop type classification (agricultural monitoring)
- Urban growth monitoring (time-series analysis)

**Advanced Skills:**
- Multi-temporal analysis (comparing over time)
- SAR imagery processing (works in clouds)
- 3D data (point clouds, LiDAR)
- Advanced architectures (Vision Transformers, Graph Neural Networks)

**Career Paths:**
- Remote sensing analyst
- GIS + AI specialist
- Geospatial data scientist
- Climate/environmental monitoring
- Urban planning with AI

---

## Questions to Ask Yourself

As you learn, think about:
- "Why does convolution work better than fully connected layers for images?"
- "When would I use detection vs segmentation for my geospatial problem?"
- "How do I handle clouds in satellite imagery?"
- "What happens if my training/test data are from different regions?"

Good luck! 🚀🌍