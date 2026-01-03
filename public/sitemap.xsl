<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
>
  <xsl:output method="html" encoding="UTF-8" />
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Sitemap</title>
        <style>
          :root {
            color-scheme: light;
          }
          body {
            margin: 0;
            padding: 0;
            font-family: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
            background: #f7f9fc;
            color: #0f172a;
          }
          .page {
            max-width: 960px;
            margin: 0 auto;
            padding: 32px 20px 48px;
          }
          .pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 14px;
            border-radius: 999px;
            background: rgba(31, 111, 235, 0.1);
            color: #184f9e;
            font-weight: 600;
            font-size: 12px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }
          h1 {
            margin: 12px 0 8px;
            font-size: 32px;
            font-weight: 800;
            letter-spacing: -0.02em;
          }
          p.lead {
            margin: 0 0 20px;
            color: #334155;
            font-size: 16px;
            line-height: 1.6;
          }
          .card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            box-shadow: 0 18px 42px rgba(15, 23, 42, 0.06);
            overflow: hidden;
          }
          .table {
            width: 100%;
            border-collapse: collapse;
          }
          .table thead {
            background: linear-gradient(90deg, rgba(31, 111, 235, 0.08), rgba(13, 148, 136, 0.08));
          }
          .table th,
          .table td {
            padding: 14px 16px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
            font-size: 14px;
          }
          .table th {
            font-weight: 700;
            color: #0f172a;
            letter-spacing: 0.01em;
          }
          .table td {
            color: #334155;
          }
          .table tr:last-child td {
            border-bottom: none;
          }
          a {
            color: #1f6feb;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="pill">Sitemap</div>
          <h1>Website overzicht</h1>
          <p class="lead">Alle pagina's die in de sitemap staan, overzichtelijk geordend.</p>
          <div class="card">
            <table class="table">
              <thead>
                <tr>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc" /></a>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
