import Head from "next/head";
import { ReactNode } from "react";
import { Header, Layout } from "../components";
import shared from "../shared.json";
const { description, name } = shared;

const Index = () => {
  return (
    <>
      <Head>
        <title>{`${name} - ${description}`}</title>
        <meta name="name" content={name} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </>
  );
};

Index.getLayout = (page: ReactNode) => {
  return (
    <Layout page="Home" loggedIn={false}>
      {page}
    </Layout>
  );
};

export default Index;
