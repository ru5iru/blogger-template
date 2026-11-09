# Blogger SEO, AEO and GEO

The XML emits canonical URLs, title/description/social fields, native post/Page metadata, author identity and structured data before client JavaScript. Useful editorial content remains the author's responsibility. These features do not guarantee ranking, rich results or generative-engine citations.

## Configure the destination

- Enable Visible to search engines and HTTPS in Blogger Settings.
- Enter the site's description and enable Search descriptions under Settings → Meta tags.
- Set the real origin, author, language, social links and verified public social image in config.json. Rebuild and restore after configuration changes.
- Review seo.noindexPaths for your own policies. Avoid accidentally noindexing public articles.
- Review the live /robots.txt, /sitemap.xml and /sitemap-pages.xml. If using custom robots.txt, adapt output/robots-txt.example.txt. Submit actual sitemap URLs to Search Console; availability does not prove indexing.

## Publish posts and Pages

Choose one primary question/search intent. Use a clear complete title, unique readable Search description and a direct opening. Use primary/supporting phrases naturally in headings and prose; never force a repeated keyword list. Add a suitable configured topic and relevant consistent post Labels. Pages have no Labels.

Native posts derive structured keywords from Labels. The optional editor-templates/snippets/seo-keywords.html supplies body microdata for justified additional phrases or Pages. A legacy keywords meta tag is optional and is not a Google ranking directive. Do not insert head tags or JSON-LD into the body.

Use H2/H3 headings, real lists, semantic tables, escaped code, specific examples and accurate source citations. Link to real relevant entries. Identify the author honestly. Dates and credentials must reflect actual facts; preserve original publication dates during updates.

FAQs should answer useful reader follow-ups already supported by the content. Copy the visible FAQ microdata snippet, keep questions/answers visible and consistent, and avoid a second FAQ graph. FAQ markup does not guarantee a Google FAQ rich result.

For images, use actual public HTTPS image URLs, meaningful alt text and real dimensions. The first body image may supply Blogger's featured/social image. Do not leave placeholders in published content. See [image publishing](IMAGE-PUBLISHING.md).

## Verify the deployed blog

Check home, representative posts, Pages, Label/search/archive and missing routes. Inspect rendered HTML for one clear H1, unique readable title/description, canonical URL, consistent Open Graph/Twitter data, correct author/article dates, structured data, crawl policy, valid links and image accessibility. Confirm the blog and its public posts return expected HTTP statuses without restrictive headers. Use Search Console URL Inspection and appropriate structured-data validators for hosted checks.

npm run verify:blogger:live checks the build's route inventory. Native mode contains no source-export posts/Pages; configured seo.routes can add checks, but the script does not automatically discover all native entries. Inspect native content separately. Local preview/automated tests are not Blogger's compiler and do not certify indexing or AI inclusion.

Use [the authoring skill](SKILL.md) and its SEO-review companion for a local publishing packet and editorial review. See [writing](WRITING.md) for body snippets and Blogger editor steps.
