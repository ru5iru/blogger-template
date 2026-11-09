# Repository split — 2026-11-09

Extracted from the Blogger work on ru5iru/iamrusiru, feature/blogger-theme. This checkout owns its source and builds independently. The original CSS and Blogger markup behavior are preserved. The public preset has generic author/branding values, no imported posts/Pages, no private media, no personal audit/research evidence and an MIT license.

The original repository .env, node_modules, Git history and browser/session caches were not copied. They are not Blogger source and can contain credentials. Each new repository starts with fresh history.

The live blog uses images at https://raw.githubusercontent.com/ru5iru/iamrusiru/main/src/assets/. These remain external public image hosting; private GitHub raw URLs cannot serve public blog images. Keep the existing public files available until replacement URLs are verified, activated, rebuilt and deployed. Repository migration does not itself change the live Blogger theme or publish content.

Use blogger/output/iamrusiru-blogger.xml after building. The historical output filename is retained for compatibility with scripts; it does not contain the original author profile.
