import Link from "next/link"
import React, { FunctionComponent } from "react"

const linkClassName = "link text-4xl mt-1 md:text-3xl"

const NavLink: FunctionComponent<{ href: string }> = ({ href, children }) => (
  <a className={linkClassName} href={href}>
    {children}
  </a>
)

const Nav = () => (
  <nav className="flex flex-col items-end justify-end">
    <Link href="/resume">
      <a className={linkClassName}>resume</a>
    </Link>
    <NavLink href="https://codepen.io/dylanbyars/">codepen</NavLink>
    <NavLink href="https://github.com/dylanbyars/">github</NavLink>
    <NavLink href="https://linkedin.com/in/dylanbyars/">linkedin</NavLink>
  </nav>
)

export default Nav
