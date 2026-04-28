
[[basic_cnn]]


## Software

- Orfeo Toolbox (beginner user)
- Tensorflow (advanced user)
- Orfeo Toolbox + TensorFlow = OTBTF
	- Mac users are encouraged to use the docker
- Source: 2020_AN_deepLearningRemoteSensing_remiCresson

## Architecture
- **ResNet-18** — A convolutional neural network with 18 layers that uses "skip connections" (residual connections) to enable deeper training. It extracts spatial features (edges, textures, shapes) from image patches.
- **`model(images).argmax(1)`** — The model outputs 10 scores; `argmax` picks the class with the highest score as the prediction.
- 