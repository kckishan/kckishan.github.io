+++
title = "Joint Inference for Neural Network Depth and Dropout Regularization"
date = 2021-02-15
authors = ["**Kishan KC**", "Rui Li", "Feng Cui", "Anne Haake"]
publication_types = ["1"]
abstract = "Dropout regularization methods prune a neural network's pre-determined backbone structure to avoid overfitting. However, a deep model still tends to be poorly calibrated with high confidence on incorrect predictions. We propose a unified Bayesian model selection method to jointly infer the most plausible network depth warranted by data, and perform dropout regularization simultaneously. In particular, to infer network depth we define a beta process over the number of hidden layers which allows it to go to infinity. Layer-wise activation probabilities induced by the beta process modulate neuron activation via binary vectors of a conjugate Bernoulli process. Experiments across domains show that by adapting network depth and dropout regularization to data, our method achieves superior performance comparing to state-of-the-art methods with well-calibrated uncertainty estimates. In continual learning, our method enables neural networks to dynamically evolve their depths to accommodate incrementally available data beyond their initial structures, and alleviate catastrophic forgetting."
featured = true
publication = "Neural Information Processing Systems (NeurIPS) 2021"
links = [{icon_pack="fas", icon="file-pdf", name="Paper", url=""},
{icon_pack="fab", icon="github", name="Code", url="https://github.com/kckishan/Depth_and_Dropout"}
]
+++

