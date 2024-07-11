# Personal Website

My personal portfolio website. The idea is a combination of a lot of concepts
I've seen online with my own personal flair. I've always had this idea of the
*right way to do something* (though I don't know how often I end up doing that),
so my projects tend to be made from scratch because I like figuring things out.
This website is no exception to that.

## The Concept

The main idea for the website was to create a "slide show" that gives a bit of
information about myself. The homepage would be separate from the projects page
simply because I wanted my GitHub user page to redirect directly to the projects
page. This would also mean that extensions to the URL would take users to any
deployed GitHub Pages I have. The homepage on the other hand is just another static
GitHub Pages website.

## The Design

The design concept can be seen in the wireframes I made:

![Personal website wireframes](/images/kalvin-portfolio/wireframes.jpg)

I wanted to keep the UI minimalistic and elegant. I've always been inspired by
the UI/UX design paradigms because they give a lot of structure to something, so
expansive. For that reason, I like taking bits and pieces from different paradigms
to make my components. For example, the **Button** component has a lot of inspiration
from Material Design. I'm particularly proud of creating a ripple effect as a
React hook, which means any component can potentially ripple, not just a button!
I've used this ripple effect in other projects, such as Urban Archaeology's
Website.

This is the ripple expand:
```js
// We create the circle.
const circle = document.createElement("span");
const diameter = Math.max(target.clientWidth, target.clientHeight);
const radius = diameter / 2;

// We then set the circle's styles.
circle.style.width = circle.style.height = `${diameter}px`;
circle.style.left = `${event.clientX - radius}px`;
circle.style.top = `${event.clientY - radius}px`;
circle.classList.add("ripple");

// Check if the component already has a circle and remove it.
// I might look into a way to have the original ripple fade
// instead, so that there isn't just a tiny circle getting spammed.
const ripple = target.getElementsByClassName("ripple")[0];
ripple?.remove();
target.appendChild(circle); //Here we append the new ripple.
```

This is the ripple fade:
```js
// Getting the ripple circle.
const ripple = target.getElementsByClassName("ripple")[0];
ripple?.classList.add("ripple-fade"); // We add the fade animation.
setTimeout(() => ripple?.remove(), 600); // Set the timeout to kill it once the animation is over.
```

While the code is simple enough, I hadn't found anyone, in my research on recreating this
effect on the web, whom employed the onMouseDown and onMouseUp pointer events. This is what
gives my buttons the abillity to be held down to slowly watch the circle expand, and then
releasing to watch it fade away. Others tend to just spawn an expanding circle on click, which
works, but wasn't enough for me.

## Technologies Used

This website was developed using Next.js and React.js. Certain components
use React Markdown and Highlight.js for stylizing.

### Links
##### React Markdown,https://github.com/remarkjs/react-markdown/
##### Highligh.js,https://highlightjs.org/
