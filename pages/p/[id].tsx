/* eslint-disable react/no-children-prop */
import React from "react";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import usePostDetail from "../../hooks/usePostDetail";
import { useRouter } from "next/router";

const Post: React.FC = () => {
  const route = useRouter();
  const query: any = route.query.id;
  const { data } = usePostDetail(query);
  console.log(data);
  let title = data?.title;
  if (!data?.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {data?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={data?.content} />
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Post;
