const publicationData = [
    {
        image: "/assets/bayesian_neighborhood_adaptation.png",
        title: "Bayesian Neighborhood Adaptation for Graph Neural Networks",
        authors: "Paribesh Regmi, Rui Li, Kishan KC",
        venue: "Transactions on Machine Learning Research",
        year: "2025",
        paperLink: "https://openreview.net/pdf?id=2zEemRib3a",
        featured: true,
        abstract: "The neighborhood scope (i.e., number of hops) where graph neural networks (GNNs) aggregate information to characterize a node’s statistical property is critical to GNNs’ performance. Two-stage approaches, training and validating GNNs for every pre-specified neighborhood scope to search for the best setting, is a time-consuming task and tends to be biased due to the search space design. How to adaptively determine proper neighborhood scopes for the aggregation process for both homophilic and heterophilic graphs remains largely unexplored. We thus propose to model the GNNs’ message-passing behavior on a graph as a stochastic process by treating the number of hops as a beta process. This Bayesian framework allows us to infer the most plausible neighborhood scope for message aggregation simultaneously with the optimization of GNN parameters. Our theoretical analysis shows that the scope inference improves the expressivity of a GNN. Experiments on benchmark homophilic and heterophilic datasets show that the proposed method is compatible with state-of-the-art GNN variants, achieving competitive or superior performance on the node classification task, and providing well-calibrated predictions."
    },
    {
      image: "/assets/rrag.png",
      title: "Reinforcement Learning from Answer Reranking Feedback for Retrieval-Augmented Answer Generation",
      authors: "Minh Nguyen, Toan Nguyen, Kishan KC, Zihan Zhang, Thuy Vu",
      venue: "Interspeech",
      year: "2024",
      paperLink: "https://www.isca-archive.org/interspeech_2024/nguyen24c_interspeech.pdf",
      featured: true,
      abstract: "Retrieval-augmented generation (RAG) is a method to improve accuracy and reliability of large language models (LLMs) for open-domain question answering (ODQA). Traditional approaches rely on supervised learning, which can result in misaligned user intent and system output. Reinforcement learning from human feedback (RLHF) addresses this issue by training a reward model using human preference feedback. In this work, we introduce a novel RLHF framework for ODQA, leveraging existing large-scale answer reranking datasets for training a reward model. In particular, our reward model for ODQA plays two complementary roles: (i) providing ranking scores as rewards for PPO, and (ii) retrieving relevant facts that enable the ODQA system to formulate a factual answer. Experimental results indicate that our proposed framework is effective for RLHF, leading to near-expert performance for ODQA."
    },
    {
      image: "/assets/llm_2023.png",
      title: "Efficient fine-tuning large language models for knowledge-aware response planning",
      authors: "Minh Nguyen, Kishan KC, Toan Nguyen, Akshay Chadha, Thuy Vu",
      venue: "ECML/PKDD",
      year: "2023",
      paperLink: "https://assets.amazon.science/a2/5f/eb28bdfe4bff878c240003fe018f/efficient-fine-tuning-large-language-models-for-knowledge-aware-response-planning.pdf",
      abstract: "Large Language Models (LLMs) have shown impressive emergent language capabilities, especially in applications with high ambiguity, such as language reasoning and knowledge consolidation. However, previous work explores the use of LLMs for acquiring information using either parametric or external knowledge, which might lead to serious issues such as hallucination. Toward solving these issues, we present a novel approach of knowledge-aware response planning (KARP) and propose a novel framework that employs (i) a knowledge retriever to obtain relevant information from web documents or databases for a given user query, and (ii) a robust fine-tuning strategy for LLMs to exploit the retrieved external knowledge for planning a final response. Experimental results show that our proposed framework can provide natural, concise answers for open-domain questions with high accuracy."
    },
    {
      image: "/assets/qca.png",
      title: "Question-context alignment and answer-context dependencies for effective answer sentence selection",
      authors: "Minh Van Nguyen, Kishan KC, Toan Nguyen, Akshay Chadha, Thuy Vu",
      venue: "Interspeech",
      year: "2023",
      paperLink: "https://arxiv.org/abs/2306.02196",
      abstract: "Answer sentence selection (AS2) in open-domain question answering ranks candidate sentences from web documents to find the correct answer. Recent methods enhance scoring by using answer context as additional input to Transformer models. We propose a novel approach that explicitly incorporates question-context and answer-context dependencies into candidate representations. Using Optimal Transport, we compute question-based dependencies among sentences in the passage, representing them as edges in a graph. A Graph Convolutional Network then derives the candidate's representation. Our model achieves significant improvements on AS2 benchmarks, setting new state-of-the-art results on WikiQA and WDRASS."
    },
    {
      image: "/assets/openfeat.png",
      title: "OpenFEAT: Improving Speaker Identification by Open-Set Few-Shot Embedding Adaptation with Transformer",
      authors: "Kishan KC, Zhenning Tan, Long Chen, Minho Jin, Eunjung Han, Andreas Stolcke, Chul Lee",
      venue: "ICASSP",
      year: "2022",
      paperLink: "https://arxiv.org/pdf/2202.12349.pdf",
      abstract: "Household speaker identification with few enrollment utterances is an important yet challenging problem, especially when household members share similar voice characteristics and room acoustics. A common embedding space learned from a large number of speakers is not universally applicable for the optimal identification of every speaker in a household. In this work, we first formulate household speaker identification as a few-shot open-set recognition task and then propose a novel embedding adaptation framework to adapt speaker representations from the given universal embedding space to a household-specific embedding space using a set-to-set function, yielding better household speaker identification performance. With our algorithm, Open-set Few-shot Embedding Adaptation with Transformer (openFEAT), we observe that the speaker identification equal error rate (IEER) on simulated households with 2 to 7 hard-to-discriminate speakers is reduced by 23% to 31% relative."
    },
    {
      image: "/assets/gnn_selection.png",
      title: "Predicting Biomedical Interactions with Probabilistic Model Selection for Graph Neural Networks",
      authors: "Kishan KC, Rui Li, Pramod Regmi, Anne Haake",
      venue: "arXiv",
      year: "2022",
      paperLink: "https://arxiv.org/abs/2211.13231",
      abstract: "A biological system is a complex network of heterogeneous molecular entities and their interactions contributing to various biological characteristics of the system. However, current biological networks are noisy, sparse, and incomplete, limiting our ability to create a holistic view of the biological system and understand the biological phenomena. Experimental identification of such interactions is both time-consuming and expensive. With the recent advancements in high-throughput data generation and significant improvement in computational power, various computational methods have been developed to predict novel interactions in the noisy network. Recently, deep learning methods such as graph neural networks have shown their effectiveness in modeling graph-structured data and achieved good performance in biomedical interaction prediction. However, graph neural networks-based methods require human expertise and experimentation to design the appropriate complexity of the model and significantly impact the performance of the model. Furthermore, deep graph neural networks face overfitting problems and tend to be poorly calibrated with high confidence on incorrect predictions. To address these challenges, we propose Bayesian model selection for graph convolutional networks to jointly infer the most plausible number of graph convolution layers (depth) warranted by data and perform dropout regularization simultaneously. Experiments on four interaction datasets show that our proposed method achieves accurate and calibrated predictions. Our proposed method enables the graph convolutional networks to dynamically adapt their depths to accommodate an increasing number of interactions."
    },
    {
        image: "/assets/depth_dropout.png",
        title: "Joint Inference for Neural Network Depth and Dropout Regularization",
        authors: "Kishan KC, Rui Li, Mahdi Gilany",
        venue: "NeurIPS",
        year: "2021",
        paperLink: "https://proceedings.neurips.cc/paper_files/paper/2021/file/dfce06801e1a85d6d06f1fdd4475dacd-Paper.pdf",
        codeLink: "https://github.com/kckishan/Depth_and_Dropout",
        featured: true,
        abstract: "Dropout regularization methods prune a neural network’s pre-determined backbone structure to avoid overfitting. However, a deep model still tends to be poorly calibrated with high confidence on incorrect predictions. We propose a unified Bayesian model selection method to jointly infer the most plausible network depth warranted by data, and perform dropout regularization simultaneously. In particular, to infer network depth we define a beta process over the number of hidden layers which allows it to go to infinity. Layer-wise activation probabilities induced by the beta process modulate neuron activation via binary vectors of a conjugate Bernoulli process. Experiments across domains show that by adapting network depth and dropout regularization to data, our method achieves superior performance comparing to state-of-the-art methods with well-calibrated uncertainty estimates. In continual learning, our method enables neural networks to dynamically evolve their depths to accommodate incrementally available data beyond their initial structures, and alleviate catastrophic forgetting."
    },
    {
      image: "/assets/hogcn.png",
      title: "Predicting Biomedical Interactions with Higher-Order Graph Convolutional Networks",
      authors: "Kishan KC, Rui Li, Feng Cui, Anne Haake",
      venue: "IEEE/ACM Transactions on Computational Biology and Bioinformatics",
      year: "2021",
      paperLink: "https://ieeexplore.ieee.org/document/9354550",
      abstract: "Biomedical interaction networks have incredible potential to be useful in the prediction of biologically meaningful interactions, identification of network biomarkers of disease, and the discovery of putative drug targets. Recently, graph neural networks have been proposed to effectively learn representations for biomedical entities and achieved state-of-the-art results in biomedical interaction prediction. These methods only consider information from immediate neighbors but cannot learn a general mixing of features from neighbors at various distances. In this paper, we present a higher-order graph convolutional network (HOGCN)to aggregate information from the higher-order neighborhood for biomedical interaction prediction. Specifically, HOGCN collects feature representations of neighbors at various distances and learns their linear mixing to obtain informative representations of biomedical entities. Experiments on four interaction networks, including protein-protein, drug-drug, drug-target, and gene-disease interactions, show that HOGCN achieves more accurate and calibrated predictions. HOGCN performs well on noisy, sparse interaction networks when feature representations of neighbors at various distances are considered. Moreover, a set of novel interaction predictions are validated by literature-based case studies."
    },    
    {
      image: "/assets/icpr.png",
      title: "Interpretable Structured Learning with Sparse Gated Sequence Encoder for Protein-Protein Interaction Prediction",
      authors: "Kishan KC, Feng Cui, Anne Haake, Rui Li",
      venue: "ICPR",
      year: "2021",
      paperLink: "http://arxiv.org/abs/2010.08514",
      abstract: "Predicting protein-protein interactions (PPIs) by learning informative representations from amino acid sequences is a challenging yet important problem in biology. Although various deep learning models in Siamese architecture have been proposed to model PPIs from sequences, these methods are computationally expensive for a large number of PPIs due to the pairwise encoding process. Furthermore, these methods are difficult to interpret because of non-intuitive mappings from protein sequences to their sequence representation. To address these challenges, we present a novel deep framework to model and predict PPIs from sequence alone. Our model incorporates a bidirectional gated recurrent unit to learn sequence representations by leveraging contextualized and sequential information from sequences. We further employ a sparse regularization to model long-range dependencies between amino acids and to select important amino acids (protein motifs), thus enhancing interpretability. Besides, the novel design of the encoding process makes our model computationally efficient and scalable to an increasing number of interactions. Experimental results on up-to-date interaction datasets demonstrate that our model achieves superior performance compared to other state-of-the-art methods. Literature-based case studies illustrate the ability of our model to provide biological insights to interpret the predictions."
    },
    {
      image: "/assets/gne.png",
      title: "GNE: A deep learning framework for gene network inference by aggregating biological information",
      authors: "Kishan KC, Rui Li, Feng Cui, Qi Yu, Anne Haake",
      venue: "BMC Systems Biology",
      year: "2019",
      paperLink: "https://bmcsystbiol.biomedcentral.com/articles/10.1186/s12918-019-0694-y"
    }
  ];
  
  export default publicationData;
  