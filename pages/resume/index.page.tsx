import classNames from "classnames"
import fs from "fs"
import { NextPage } from "next"
import { join } from "path"
import React, { useEffect, useState } from "react"
import { remark } from "remark"
import markdown2html from "remark-html"
import PageContainer from "../../components/PageContainer"

const Resume: NextPage<{ html: string; raw: string }> = ({ html, raw }) => {
  const [showRaw, setShowRaw] = useState(false)
  const isPrinting = useDetectPrint()

  useEffect(() => {
    setShowRaw(isPrinting)
  }, [isPrinting])

  return (
    <PageContainer title="Resume · Dylan Byars" className="py-3 md:py-8">
      {showRaw ? (
        <article className={classNames({ "m-3": !isPrinting })}>
          {raw.split("\n").map((line, idx) => (
            <div
              key={`${idx}-${line.slice(-3)}`}
              className={classNames({
                "my-1": line === "",
                "text-lg": /^#/.test(line),
              })}
            >
              {line}
            </div>
          ))}
        </article>
      ) : (
        <article
          className="prose md:max-w-3xl font-mono mx-auto px-4"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </PageContainer>
  )
}

export async function getStaticProps() {
  const resumeFile = fs.readFileSync(
    join(process.cwd(), "pages/resume/Dylan_Byars_Resume.md"),
    "utf8"
  )

  const virtualFile = await remark().use(markdown2html).process(resumeFile)

  return { props: { html: virtualFile.toString(), raw: resumeFile } }
}

export default Resume

function useDetectPrint() {
  const [isPrinting, setIsPrinting] = useState(false)

  const handleBeforeprint = () => setIsPrinting(true)
  const handleAfterprint = () => setIsPrinting(false)

  useEffect(() => {
    window.addEventListener("beforeprint", handleBeforeprint)
    window.addEventListener("afterprint", handleAfterprint)
    return () => {
      window.removeEventListener("beforeprint", handleBeforeprint)
      window.removeEventListener("afterprint", handleAfterprint)
    }
  })

  return isPrinting
}
