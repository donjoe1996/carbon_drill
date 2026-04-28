**Neural network classification** — The model takes a 13-band image patch as input and outputs a probability for each of the 10 land cover classes.
- [[Loss function]](`CrossEntropyLoss`) — Measures how wrong the model's predictions are. Lower = better.
- **[[Optimizer]]** (`SGD`) — The algorithm that adjusts model weights to minimize the loss, using gradients from backpropagation.
- **[[Training loop]]** — Repeatedly: forward pass → compute loss → backward pass → update weights.
- [[Test splits]]— Train to learn, validate to monitor overfitting, test for final unbiased evaluation.