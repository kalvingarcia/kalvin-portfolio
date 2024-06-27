# Personal Website

My personal portfolio website. The idea is a combination of a lot of concepts
I've seen online with my own personal flair. I've always had this idea of the
*right way to do something* (though I don't know how often I end up doing that),
so my projects tend to be made from scratch because I like figuring things out.
This website is no exception to that.

## The concept

The main idea for the website was to create a "slide show" that gives a bit of
information about myself. The homepage would be separate from the projects page
simply because I wanted my GitHub user page to redirect directly to the projects
page. This would also mean that extensions to the URL would take users to any
deployed GitHub Pages I have. The homepage on the other hand is just another static
GitHub Pages website.

## The Design

The design concept can be seen in the wireframes I made:

![Personal website wireframes](/images/kalvin-portfolio/wireframes.png)

I wanted to keep the UI minimalistic and elegant. I've always been inspired by
the UI/UX design paradigms because they give a lot of structure to something, so
expansive. For that reason, I like taking bits and pieces from different paradigms
to make my components. For example, the **Button** component has a lot of inspiration
from Material Design. I'm particularly proud of creating a ripple effect as a
React hook, which means any component can potentially ripple, not just a button!
I've used this ripple effect in other projects, such as Urban Archaeology's
Website.

```js
//Put the code for the Ripple Effect Hook here
```

## Technologies Used

This website was developed using Next.js and React.js. Certain components
use React Markdown and Highlight.js for stylizing.