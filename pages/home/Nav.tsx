import Link from "next/link"
import React, { FunctionComponent } from "react"

// TODO: How guaranteed is the order of the array returned by `Object.entries`? Does the size of the object affect the uncertainty?
const EXTERNAL_LINKS: { [title: string]: string } = {
  github: "https://github.com/dylanbyars/",
  linkedin: "https://linkedin.com/in/dylanbyars/",
  codepen: "https://codepen.io/dylanbyars/",
}

const linkClassName = "link text-4xl mt-1 md:text-3xl"

const Nav: FunctionComponent = () => (
  <nav className="flex flex-col items-end justify-end">
    <Link
      href="/resume"
      className={linkClassName}
      title="My official (and lightly abridged) resume">
      
        resume
      
    </Link>
    {Object.entries(EXTERNAL_LINKS).map(([title, href]) => (
      <a title={title} href={href} className={linkClassName} key={title}>
        {title}
      </a>
    ))}
  </nav>
)

export default Nav
