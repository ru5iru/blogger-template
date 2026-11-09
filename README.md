# Blogger Template

A reusable Blogger XML theme with the established typography, responsive layout, dark mode, post reading tools and native Blogger editing. Includes build-time social metadata, structured data, semantic content starters, publishing documentation and authoring skills. Licensed under [MIT](LICENSE).

This repository contains generic defaults and **no imported personal posts, Pages or photographs**. Blogger renders your posts and Pages. React is used only to render some static snippets during the build; no React application or React runtime is installed on your blog.

## Quick start

1. Choose **Use this template → Create a new repository** on GitHub, or clone this repository.
2. Install Node.js 22 or later and run:

```powershell
npm ci
```

3. Edit `blogger/config.json`: set your HTTPS `blogUrl`, blog `title`, `author`, description, branding, hero, profile, social links and topics. Set portrait/social image URLs to real public HTTPS images or keep the portrait placeholder. Keep `contentMode: "native"`. `assetBaseUrl` is not an uploader; it is only a base used for explicit source assets.
4. Build, test and preview:

```powershell
npm run build
npm test
npm run preview
```

5. Open http://127.0.0.1:4175. This is a local emulation, not Blogger's compiler.
6. In Blogger → Theme, back up your existing theme. Restore `blogger/output/iamrusiru-blogger.xml`. If Restore hides a validation error, paste that XML into Edit HTML and Save to see the exact message. Use a test blog first.
7. In Layout, edit the header, hero, topics, connect and footer HTML gadgets if needed. A later theme restore may replace gadget content; keep a backup of Layout edits.
8. Create your own About, Contact, Privacy and Cookie Pages and update navigation to their actual URLs. The template supplies no legal-policy text; document your actual services and data use.

Building does not publish, import posts or change settings. The legacy XML filename is retained for script compatibility; its contents use your configuration. Do not import feed.atom into an existing blog.

## Publish a post

1. Blogger → Posts → New post. Enter a clear, complete title.
2. Use HTML view and paste a starter from `blogger/output/editor-templates/`, replacing all sample content. The theme supplies H1, author/date and page layout; the body starts with paragraphs and H2/H3 sections.
3. Use normal semantic paragraphs, lists and tables. Copy the existing code, callout, image, summary and FAQ snippets for matching styles. Avoid new class names that are absent from the compiled CSS.
4. Add one useful configured topic and relevant Labels. Choose a primary search phrase and natural supporting phrases in the title, opening, headings and prose. Labels supply native structured keywords. A keyword meta tag is optional and does not promise ranking gains.
5. Enter a unique **Search description** in the post settings. If unavailable, enable the site's Search description under Settings → Meta tags. Write a readable summary, not a list of keywords.
6. Set the desired permalink before first publication. Upload images to Blogger or another public HTTPS host; supply meaningful alt text and real dimensions. The first body image can supply Blogger's featured image.
7. Include FAQs only for useful follow-up questions answered by the article. Use the visible FAQ microdata snippet; do not add duplicate FAQ JSON-LD. Keep answers visible and consistent.
8. Preview, check mobile layout, headings, links, code and metadata, then publish. Native posts require no theme rebuild. Update existing posts in place, preserving URLs and original publication dates.

For a Page, use Pages → New page, the same body styles and Search description; Pages do not have Labels. Optional route-specific metadata is configurable under `seo.routes` and requires a rebuild. Review stale overrides when rewriting a configured URL.

## SEO, AEO and GEO

The XML supplies canonical/social fields, native title and Search description fallbacks, author/article identity and structured data. Content templates support direct answers, headings, source citations, FAQs and contextual links. These are implementation features, not guarantees of indexing, rich results or AI citations.

Enable **Visible to search engines** in Blogger Settings. Review privacy/noindex routes in config.json, HTTPS settings and actual robots output. If using custom robots.txt, adapt `blogger/output/robots-txt.example.txt` to your domain. Submit Blogger's actual sitemap URLs in Search Console and verify deployed pages with public tools. Never publish placeholder image URLs or claim that a local test certifies the live blog.

`npm run verify:blogger:live` uses the generated source inventory. In native mode that inventory has no post/Page records, so it is **not a complete audit of your native entries**. Inspect representative live posts and Pages separately.

## Authoring skills

Ask your coding assistant to use [blogger/SKILL.md](blogger/SKILL.md) with supplied content. It creates a local publishing packet with body.html, publishing.json and publish.md: title, Search description, slug guidance, topic/Labels, keyword plan, image guidance, sources and FAQs when useful.

```powershell
node blogger/scripts/validate-draft.mjs blogger/drafts/your-slug
```

Companion skills cover [SEO review](blogger/skills/blogger-seo-review/SKILL.md), [images](blogger/skills/blogger-images/SKILL.md) and [publishing](blogger/skills/blogger-publishing/SKILL.md). Repository skills are not automatically installed in a global assistant catalog.

## Customize and maintain

- Text, author, links, topics and route metadata: `blogger/config.json`.
- Blogger structure and gadgets: `blogger/template.xml`, `blogger/fragments/`.
- Original compiled design: `blogger/design.css`; maintained theme rules: `blogger/styles.css`; interactions: `blogger/enhancements.js`.
- Static generic presentation: `blogger/source/fragments.json`; editor block renderers: `blogger/source/components/blog/`.
- Generated deliverables: `blogger/output/`, committed for review and direct download. Edit source, rebuild, review the diff and retest before installing.
- Alternate destination: `node scripts/build-blogger.mjs --config path/to/config.json --out blogger/output-other`.

See [customization](blogger/CUSTOMIZATION.md), [writing](blogger/WRITING.md), [SEO](blogger/SEO-GUIDE.md), [images](blogger/IMAGE-PUBLISHING.md), [architecture](docs/ARCHITECTURE.md), [migration](docs/MIGRATION.md) and [compatibility](blogger/COMPATIBILITY.md).

## License and attribution

Theme source is MIT licensed; retain the license notice. Dependency licenses remain applicable; see [third-party notices](THIRD-PARTY-NOTICES.md). Your own content and uploaded media have their own licenses. Generated XML embeds Lucide SVG icons under the ISC license; preserve the accompanying notices when redistributing the theme.
