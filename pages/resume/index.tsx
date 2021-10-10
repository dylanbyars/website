import fs from "fs"
import { NextPage } from "next"
import { join } from "path"
import React from "react"
import { remark } from "remark"
import html from "remark-html"

const Resume: NextPage<{ content: string }> = ({ content }) => (
  <article
    className="prose font-mono font-medium mx-auto mt-8 mb-4"
    dangerouslySetInnerHTML={{ __html: content }}
  />
)

export async function getStaticProps() {
  const content = await remark()
    .use(html)
    .process(
      fs.readFileSync(join(process.cwd(), "pages/resume/resume.md"), "utf8")
    )

  return { props: { content: content.toString() } }
}

export default Resume
