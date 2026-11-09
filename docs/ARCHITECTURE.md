# Standalone Blogger architecture

- `blogger/template.xml`: Blogger XML layout, native post/Page fields and server-rendered metadata.
- `blogger/design.css` + `styles.css`: original compiled design plus maintained theme rules. CSS SHA-256 at extraction: `12d00fa503751db07954e13851fb16e41dc9e61e3233a8bc37ff841d9e575862`. Edit these files directly; unused classes are intentionally retained to preserve the baseline.
- `blogger/source/`: repository-owned presentation fragments and editor block renderers; no personal content. React is a **build-time static renderer** only. There is no React application or React runtime in the installed theme.
- `scripts/lib/`: configuration, XML validation, metadata, markup and local preview helpers.
- `blogger/output/`: generated deliverables and verification artifacts. These are committed intentionally. Review generated changes when rebuilding.
- `blogger/SKILL.md`: authoring workflow, publishing packet validation and companion skills.

No sibling checkout, original src directory, Vite, Supabase, MCP integration or application environment variables are required. Native Blogger posts and Pages are edited in Blogger and do not require a rebuild. The reusable preset deliberately has no source-export posts or personal Pages.

The private blog and public template each carry a complete engine. To share a fix, review and port changes to template.xml, design/styles/enhancements, generic script helpers and tests. Do not synchronize private content/configuration/evidence into the public repository.
