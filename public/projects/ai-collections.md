# AI Project Anthology
This project, rather collection of projects, is filled with academic and personal projects.
I wanted to showcase them, but they don't have substaintial enough content to be within their
own repositories. They're mostly coding adventures and assignments with little code. Each
project provided a learning experience for myself, so I might combine or return to them at
some point in the future.

## The Concept
The main idea was to provide the code and show that I have the knowledge and experience working
with AI and Machine Learning, but I haven't made a functional, exhaustive project with these
concepts yet. I have ideas that will use some of these projects as starting points, but right now
they're just ideas.

I will be discussing those ideas within each respective project, and once the idea comes to fruition,
I'll link it under the project.

## The Projects
If for some reason you'd like to see the code, and other parts of the notebooks, or you'd like to
download the notebooks to run them yourself. Head over to the [GitHub repository](https://github.com/kalvingarcia/ai-collections)
for installation instructions.

### Generative Pretrained Transformer
I implemented a GPT using Pytorch. I was following a tutorial by [Andrej Karpathy](https://karpathy.ai/) to create the initial
bigram and GPT models that used characters for tokens. The models are trained using Little Shakespeare. I
decided to go further on my own and use OpenAI's TikToken to create a GPT model that uses sub-word tokens.
This, because of limitations on Google Notebook's free version, required me to take steps at making the model
more memory efficient. I did research and opted for using a half-precision model, checkpointing, and accumulated
to reduce the strain on the GPU.

This project inspired me to create a GPT virtual assistant, specifically for one of my other geeky hobbies:
anime, manga, and gaming. That project is currently on the back burner while I complete other projects, like
building a PC that wouldn't require I pay for a service to use GPUs.

### MNIST Deep Learning
For this project, I created a set of procedural neural networks using Google's Jax JIT library to compile each function.
The pure nature of JIT forced me to think outside the box about how I should be implementing each part of the
project. Eventually, I was able to train the model. The accuracy was all over the place, and I foudn that I would
need to implement parallelization to improve preformance and allow me to give the model more layers. I still need
to research parallelization in Jax because all inputs to each function need to be the same length.

### Naive Sentiment Analysis
This project was my first attempt at sentiment analysis, where I used a neural network I implemented from scratch.
The implementation was slow, and the training was impossible on my computer. This project taught me a lot about the
necessity of optimization in machine learning. Eventually, I would like to reattempt sentiment analysis.

### NLTK Chatbot
For this project, I experimented with the NLTK Python library to create a rudimentary Q&A chatbor. The purpose of this
project was to look at the NLTK and see what I could apply to other major projects I'm working on.

### Neural Network Activation Functions Test
This project was an experiment with neural networks. It begun with an object oriented approach, where I had a layer class
and a neural network class. I was following the [Sebastian Lague](https://www.youtube.com/c/SebastianLague) tutorial to gain 
an understanding of neural networks in general. Eventually, I used this project as the opportunity to learn Google's Jax 
library. That meant I needed to convert the object oriented approach into amuch more procedural approach, since Jax requires
pure-stateless functions to use JIT compiling.

### Ride Share Reflex Agent
This project was an assignment for my intro AI course. The idea was to create a reflex agent to handle cars for a ride sharing
application. The agent's job was to pick up passengers and then drop them off. The agent prioritizes picking up passengers, and
when 1 car is assigned multiple pickups or drop-offs, the shortest path is generated using a recursive search. The passengers
are assigned based on the closest car to them.

### Naive Object Oriented Neural Network
Whenever I make have ideas for projects, I always like to learn how to make every component from scratch first. This helps me
understand the lower-level workings of the concepts before I start using libraries and modules. I decided to learn how to make 
a neural network before going to use TensorFlow, PyTorch, or any other library. My neural network attempts have since come a 
long way, as seen in the nn-activation-function-tests project, where I used Google's Jax module.

### Tic-Tac-Toe Markov Agent
For this assignment, I was tasked to create a Markov decision making model to play tic-tac-toe. In order to automate the testing
and gameplay, I also needed to create a reflex agent to mimic the decision making of a human player. Eventually, I found that using
the Markov decision making model wasn't especially beneficial in a game like tic-tac-toe, since the landscape was ever changing.
The model became a glorified reflex agent. I would like to try this again. The Markov agent would be put into the into a landscape
where it would benefit from being a Markov agent. I would also want to try to make a min-max/alpha-beta pruning agent for the
tic-tac-toe langscape.

### Travelling Salesman Genetic Algorithm
This assinment, I was required to make a genetic algorithm to find a solution to the travelling salesperson problem. I found 
difficulty implementing the genetic algorithm. I found that the problem would get stuck on being barely better than average. 
I would like to come back to this now that I have a better understanding of genetic algorithms.