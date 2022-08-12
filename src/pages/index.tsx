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
  const { data: session, status } = useSession()

  if (status === "authenticated") {
    return <p>Signed in as {session?.user?.email}</p>
  }

  return <Link href="/api/auth/signin">Sign in</Link>
};


export default Home;
