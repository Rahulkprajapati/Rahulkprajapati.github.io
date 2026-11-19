<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html lang="en-GB"><head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><meta name="robots" content="noindex"/>
<title>RSS feed · <xsl:value-of select="rss/channel/title"/></title>
<style>
:root{color-scheme:light;--bg:#f3efe6;--card:rgba(255,253,247,.8);--border:rgba(40,34,20,.14);--text:#16140f;--muted:#555045;--accent:#0e7a55;--code:#ece6d8}
@media (prefers-color-scheme:dark){:root{color-scheme:dark;--bg:#07090b;--card:rgba(13,17,19,.75);--border:rgba(206,230,219,.12);--text:#e8efeb;--muted:#9aa8a2;--accent:#7cf5c6;--code:#0c1012}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:16px/1.7 Inter,ui-sans-serif,system-ui,-apple-system,sans-serif}
.wrap{max-width:46rem;margin:0 auto;padding:56px 16px 72px}a{color:var(--accent)}
.micro{font:500 12px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
h1{font-size:2rem;line-height:1.15;letter-spacing:-.02em;margin:10px 0 6px}
.note{margin:24px 0 36px;padding:16px 18px;border:1px solid var(--border);border-radius:14px;background:var(--card);color:var(--muted)}
.note code{display:block;margin-top:8px;padding:8px 10px;border-radius:8px;background:var(--code);color:var(--text);font:14px ui-monospace,SFMono-Regular,Menlo,monospace;overflow-wrap:anywhere}
.item{display:block;padding:18px 0;border-top:1px solid var(--border);text-decoration:none;color:inherit}
.item h2{margin:4px 0;font-size:1.15rem;color:var(--text)}.item:hover h2{color:var(--accent)}.item p{margin:0;color:var(--muted)}
</style></head>
<body><div class="wrap">
<a class="micro" href="/blog/">← All posts</a>
<h1><xsl:value-of select="rss/channel/title"/>: blog feed</h1>
<p style="color:var(--muted);margin:0"><xsl:value-of select="rss/channel/description"/></p>
<div class="note"><strong style="color:var(--text)">This is an RSS feed.</strong> Paste this address into a feed reader such as Feedly, Inoreader or NetNewsWire to get new posts automatically:<code>https://rahul-prajapati.com/blog/feed.xml</code></div>
<xsl:for-each select="rss/channel/item">
<a class="item"><xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute>
<span class="micro"><xsl:value-of select="substring(pubDate,6,11)"/></span>
<h2><xsl:value-of select="title"/></h2><p><xsl:value-of select="description"/></p></a>
</xsl:for-each>
</div></body></html>
</xsl:template>
</xsl:stylesheet>
