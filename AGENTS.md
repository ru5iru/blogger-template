# Project rules

- This is a standalone Blogger repository. Do not depend on the separate React application.
- Preserve the existing styles unless a style change is requested.
- Emit route-specific social metadata in the Blogger XML at build time; social crawlers must not depend on client-side JavaScript.
- Use blogger/SKILL.md for post and Page authoring. Never publish or upload without authorization in the task.
- Preserve existing post permalinks and publication dates. Do not reimport feed.atom to update posts.
- Never commit credentials or account/browser sessions.
