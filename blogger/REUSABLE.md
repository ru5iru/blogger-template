# Install the reusable theme

From a source checkout, follow the root [README](../README.md) to configure, build and test. The generic preset uses native Blogger posts and Pages, with no imported personal content.

In a generated package, back up your Blogger theme and restore iamrusiru-blogger.xml. Set the actual blog identity in Blogger Settings, create the Pages linked by your navigation, and review Layout gadgets. Use editor-templates/ for styled body markup and set titles, Search descriptions and Labels in Blogger's editor. Do not import feed.atom to update an existing blog.

For customization use config.json in the source checkout and rebuild. See CUSTOMIZATION.md, WRITING.md, SEO-GUIDE.md, IMAGE-PUBLISHING.md and COMPATIBILITY.md. The output directory is generated; edit source files and rebuild instead of treating generated XML as the source of truth.
