import type { NextPage } from "next"
import Head from "next/head"

// TODO: put github links here somewhere? optionally link to code for current page
const PageContainer: NextPage<{ title: string }> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        {/* <meta name="description" content="TODO:" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </>
  )
}

export default PageContainer
