import type { NextPage } from "next";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { _setTitle, selectTodo, wrapper } from "../state";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Typography } from "@mui/material";
import { formatDate } from "@/utils/util";
import { useHomeInfo } from "@/make-apis/home-api";
import { ReactElement } from "react";
import Protected from "@/layouts/Protected";
import Seo from "@/layouts/Seo";
import PublicLayout from "@/layouts/PublicLayout";

const Home = (props: any) => {
  const { resolvedUrl } = props;
  const todo = useSelector(selectTodo);
  const url = process.env.NEXT_PUBLIC_API_URL;
  const date = formatDate(new Date(), "yyyy-MM-dd", "2023-10-01");

  const { data, isLoading, isFetching } = useHomeInfo();
  return (
    <div className={styles.container}>
      <Seo title="Home" />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
          <span>{resolvedUrl}</span>
        </h1>
        <h2>Select: {todo.title} to update</h2>
        <Link href={"/demo"}>
          <h3>Navigate to: demo</h3>
        </Link>
        <Typography>URL: {url}</Typography>
        <Typography>date: {date}</Typography>
        <Typography>
          Call API get name:{" "}
          {isLoading || isFetching ? "loading..." : data?.data["name"]}
        </Typography>
      </main>

      <footer className={styles.footer}>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export const getServerSideProps = wrapper.getStaticProps(
  (store) =>
    async ({ resolvedUrl }: any) => {
      store.dispatch(_setTitle("name1"));
      return {
        props: {
          resolvedUrl,
        },
      };
    }
);

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <PublicLayout>
      <Seo title="Home" />
      {page}
    </PublicLayout>
  );
};
export default Home;
