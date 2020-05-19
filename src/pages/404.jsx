import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";

export default function DNE() {
  return (
    <Layout>
      <p>Welp, it looks like this page doesn&apos;t exist.</p>
      <Link to="/" className="font-bold underline mt-4 block">
        Go Home
      </Link>
    </Layout>
  );
}
