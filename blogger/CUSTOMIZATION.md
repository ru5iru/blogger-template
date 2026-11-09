# Customize the standalone theme

Edit config.json from this directory, then run npm run build and npm test from the repository root. The default preset uses native Blogger posts and Pages; contentMode must stay native. To build for another destination, use:

```powershell
node scripts/build-blogger.mjs --config path/to/config.json --out blogger/output-other
```

## Settings

| Setting | Purpose |
| --- | --- |
| blogUrl | Your public HTTPS origin, with no post path. |
| title / author / description | Blog identity and default description. |
| branding | Prefix/accent text and optional Twitter/X handle. |
| hero | Eyebrow, heading parts, description, card lines and portrait alt text. |
| profile | Author role, job, biography, citation name and public HTTPS portrait URL. |
| socialImageUrl | Optional verified HTTPS fallback social image. |
| links | Actual navigation and social URLs. Create Pages before linking to them. |
| footer / connect | Footer column labels, text and social introduction. |
| topics | Unique native Blogger Labels used for topic navigation. |
| seo | Language, home metadata, route overrides and intended noindex paths. |
| responsiveImages | Optional verified source-asset variants; ordinary native Blogger images use Blogger's own responsive URLs. |

Install blogger/output/iamrusiru-blogger.xml through Theme after backing up your current theme. Layout exposes header, hero, topics, connect and footer HTML gadgets. Back up Layout edits before a later restore. The build output includes editable-regions/ copies.

Styles are self-contained: design.css holds the original compiled design and styles.css holds the maintained theme rules. Text and link configuration preserves styling. If you intentionally change CSS, edit these source files, rebuild and check light/dark and mobile/desktop layouts. This standalone project does not regenerate utility CSS from a separate application.

Set each post/Page title and Search description in Blogger. seo.routes is for explicit path-specific overrides; review overrides after content changes. Pages have no Labels. New native entries do not require a rebuild. See [writing](WRITING.md) and [SEO](SEO-GUIDE.md).
