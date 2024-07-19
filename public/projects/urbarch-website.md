# Urban Archaeology Website
This project was created to replace Urban Archaeology's website. I was
hired to completely redo and modernize the website. Since this was my
first professional project, I decided to take the process extremely seriously
and use the skills I learned in my undergraduate experience by creating a 
software design document to be approved by Urban Archaeology. I, then, 
wireframed and mocked up the website using Figma. Finally, I did research
on the best practices for creating a store-front website, especially one
where I wanted filterable and searchable products.

## The Concept
The website itself needed to be a good successor to the old website,
which had a grid layout using tables to showcase the products. There
was no filterability, which meant that products that could fit in
multiple categories are listed in each place they can be. While I found
this implementation to be inefficient, this is what had been working for
them.

Before I could get started on designing the new website, I needed to
understand the old one, since that was what their user base had gotten
used to, and I needed to continue maintaining the old website while
I created the new one, as the sole web developer working with Urban.

Finally, I was able to create the wireframe for the project:
![Wireframes for the Urban Archaeology website.](/images/urbarch-website/wireframes.jpg)

## The Design
I decided to continue using the website's current color palette and
maintain the font choices, since they were decided upon by the
company's late lead designer, Judith Stockman. I focused solely on
redesigning the website's layout and UI for user accessibility and
ease-of-use.

The main redesign came in the catalog page, which I [demonstrated](/?open=catalog-demo)
for Urban Archaeology to help visualize how the website would function.

Old:
![Catalog old.](/images/urbarch-website/catalog_old.jpg)

Concept:
![Catalog concept.](/images/urbarch-website/catalog_concept.jpg)

Implementation:
![Catalog implementation.](/images/urbarch-website/catalog.jpg)

Another key component in the redesign was the product page, which featured all the
information being presented to the user in the form of text, with little interactive
elements. For that reason, I decided that hiding every variation's pricing
and only displaying the variation the user wanted to see and giving them dropdown
menus to choose from would incentivize users to explore the website, while
giving them less information to digest. I also opted to show related items under
the product, rather than in a separate tab.

Old:
![Product page old.](/images/urbarch-website/product_old.jpg)

Concept:
![Product page concept.](/images/urbarch-website/product_concept.jpg)

Implementation:
![Product page implementation.](/images/urbarch-website/product.jpg)

The old website also didn't have a mobile version. This meant that users
opening the website on their phones didn't have the ability to use the
website easily. Instead needing to navigate the website using the desktop
version. To make the website more accessible, I focused some effort in
adding some responsive elements to the website.

![Mobile implementation](/images/urbarch-website/mobile.jpg)

## The Implementation
For more information about the implementation of the website, go to the
[GitHub page](https://github.com/kalvingarcia/urbarch-website).

The test version of the website can also be viewed in a 
[separate URL](https://urbarch-website.kalvin.live/) while I add the rest 
of the product data to the database.