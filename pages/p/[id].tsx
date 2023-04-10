import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import usePostDetail from "../../hooks/usePostDetail";
import { useRouter } from "next/router";
import useUser from "@/hooks/useUser";

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const post = {
//     id: "1",
//     title: "Prisma is the perfect ORM for Next.js",
//     content: "[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!",
//     published: false,
//     author: {
//       name: "Nikolas Burk",
//       email: "burk@prisma.io",
//     },
//   }
//   return {
//     props: post,
//   }
// }

const Post: React.FC = () => {
  const route = useRouter();
  const query: string | undefined = route.query.id;
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
