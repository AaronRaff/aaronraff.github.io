import React from "react";

export default function CloudflareAnalytics({ token }) {
  return (
    <script
      defer
      src='https://static.cloudflareinsights.com/beacon.min.js'
      data-cf-beacon={`{"token": "${token}"}`}
    />
  );
}
