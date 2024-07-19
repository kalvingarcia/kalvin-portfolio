# Physarum Slime Mold Simulation
A physarum slime mold simulation using modern OpenGL (core 4.6). Built using C/C++.
I found some challenges in understanding the concept of compute shaders, but with the 
help of [Victor Gordon](https://www.youtube.com/watch?v=nF4X9BIUzx0) I was able to 
understand the concept and apply it to this project. I am hoping to implement the 
ability to have multiple slime "families" in the simulation at once, and possibly 
the ability to have mulitple simulations running in a small "petri dish" within the window.
I was also inspired by [Alon Emanuel](https://www.youtube.com/watch?v=fOIL7Gmgbr0) to
possibly include food.

![Slime Mold Simulation 1](/images/slime-mold-sim/sim_1.gif)

# The Concept
I originally watched the [Sebastian Lague](https://www.youtube.com/watch?v=X-iSQQgOd1A&t=1s)
video on the physarum, which he built using C#. I was inspired to create a simillar simulation,
but instead using C++. I did some research and found an article on the process using openFramworks
by [Sage Jenson](https://cargocollective.com/sagejenson/physarum). I decided to use the opportunity
to learn GLFW and GLEW, as well as OpenGl's Shader Language.

![Slime Mold Simulation 2](/images/slime-mold-sim/sim_2.gif)

# The Implementation
For more information about the implementation of the project, and how to download it for yourself,
visit the [GitHub page](https://github.com/kalvingarcia/slime-mold-sim).