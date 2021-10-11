import Link from "next/link"
import React from "react"

const PeriodicTableImg = () => (
  <div className="periodic-table-grid-container h-32 w-64">
    <span className="alkali bg-grey text-grey">.</span>
    <span className="alkaline-earth bg-red-light text-red-light">.</span>
    <span className="metals bg-pink-light text-pink-light">.</span>
    <span className="metalloids-ish bg-orange-light text-orange-light">.</span>
    <span className="nobles bg-blue-light text-blue-light">.</span>
    <span className="weirdos bg-green-light text-green-light">.</span>
  </div>
)

const Projects = () => (
  <section className="projects flex flex-col justify-around items-center">
    <Link href="/periodic-table">
      <a className="link" title={periodicTableTitle()}>
        <article className="mx-auto mt-6 flex flex-col items-center">
          <PeriodicTableImg />
          <p className="p-6">
            A wikipedia-powered periodic table built with React.
          </p>
        </article>
      </a>
    </Link>
  </section>
)

export default Projects

function periodicTableTitle() {
  return `This is probably the third generation of Periodic Table applications written by me.

The first crack started as an excuse to build some muscle memory around 
styling html with flex. 120 tiny little squares later and I had a great 
appreciation for centering text vertically AND horizontally.

Soon after, I wanted to add some animations to the party. Hovering over 
an element caused it to expand and show some more information related to
the hovered element.

Now it was time to really _flex_ the ol' javascript skills so I made 
another version in React where the element markup was generated from some 
kind of big blob of element data. The React flavor of this idea has proven
the most extendable. I added a hover animation and a modal that fetches
data for a given element from Wikipedia.

What's next for my humble little workspace? Who knows. It's a project I come
back to intermittently. Reviewing my work after stepping away from the project
for a few months is always a treat. There's always something to improve.

I'm thinking about adding a search input right at the top so a user can 
find a given element on the table by name instead of hunting for it. 

  `
}
