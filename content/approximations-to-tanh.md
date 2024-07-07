Title: Approximations to tanh(x)
Date: 2024-06-08
Category: Maths
Tags: maths, machine-learning
Slug: approximations-to-tanh

The function $\tanh(x)$ is extremely important in machine learning as it
is commonly used as an [activation function](https://en.wikipedia.org/wiki/Activation_function)
in neural networks. It has the useful properties that it is continuous 
and infinitely differentiable, and bounded, taking values between -1 and 1.
As such, the rapid, repeated computation of $\tanh(x)$ is valuable for
a performant nn.
