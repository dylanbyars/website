import type { NextPage } from "next"
import Head from "next/head"

// TODO: put github links here somewhere? optionally link to code for current page
const PageContainer: NextPage<{ title: string; className?: string }> = ({
  children,
  title,
  className,
}) => {
  return (
    <main className={className}>
      <Head>
        <title>{title}</title>
        {/* <meta name="description" content="TODO:" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </main>
  )
}

export default PageContainer
