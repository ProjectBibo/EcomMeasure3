import React from "react";
import { Helmet } from "react-helmet-async";

export default function GoogleTag() {
  return (
    <Helmet>
      {/* Google tag (gtag.js) */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-3DQBW03013" />
      <script>
        {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-3DQBW03013');
`}
      </script>
    </Helmet>
  );
}
