import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { trpc } from "../utils/trpc";

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <Link href="/api/auth/signin">{session?.user?.email ? "S" : "test"}</Link>
    </>
  );
};

export default Home;
