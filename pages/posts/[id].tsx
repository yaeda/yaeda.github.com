import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import DateTime from "../../components/date-time";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths } from "next";
import { formatDistanceToNow, isBefore, parseISO, sub } from "date-fns";
import ReactMarkdown from "react-markdown";
import { CodeBlock } from "../../components/code-block";

export default function Post({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    content: string;
  };
}) {
  const postedDate = parseISO(postData.date);
  const aYearAgoDate = sub(Date.now(), { years: 1 });
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <DateTime dateString={postData.date} />
          {isBefore(postedDate, aYearAgoDate) ? (
            <span>
              {" "}
              ({formatDistanceToNow(postedDate, { addSuffix: true })})
            </span>
          ) : null}
        </div>
        <div className="mdpreview">
          <ReactMarkdown
            source={postData.content}
            renderers={{ code: CodeBlock }}
          />
        </div>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};
