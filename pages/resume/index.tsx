import fs from "fs"
import { NextPage } from "next"
import { join } from "path"
import React from "react"
import { remark } from "remark"
import html from "remark-html"
import PageContainer from "../../components/PageContainer"

const Resume: NextPage<{ content: string }> = ({ content }) => (
  <PageContainer title="Resume · Dylan Byars">
    <article
      className="prose lg:prose-lg font-mono mx-auto mt-8 mb-4 px-4 md:px-0"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </PageContainer>
)

export async function getStaticProps() {
  const content = await remark()
    .use(html)
    .process(
      fs.readFileSync(
        join(process.cwd(), "components/resume/RESUME.md"),
        "utf8"
      )
    )

  return { props: { content: content.toString() } }
}

export default Resume
