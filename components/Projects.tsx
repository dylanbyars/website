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
      <a className="link">
        <article className="mx-auto my-8 flex flex-col items-center">
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
