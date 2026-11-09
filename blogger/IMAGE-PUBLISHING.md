# Publish images

## Ordinary native Blogger posts

Upload the image in Blogger's post editor, or use public HTTPS hosting you control. In HTML view, keep the actual image URL, meaningful alt text and real width/height. Blogger may generate its own responsive variants. The theme uses native featured-image data for listings and social fields. Use the generated image snippet when you need its existing figure/caption styles, replacing every placeholder before publication.

## Profile and social images

Set profile.portraitUrl and optional socialImageUrl in config.json to verified public HTTPS image URLs. Rebuild and restore the XML. Without a portrait URL the theme uses a neutral embedded placeholder. Empty social fallback fields are omitted; posts can use their featured images.

## GitHub hosting

Images must live in a public repository or another public host. A private repository's raw links do not work for anonymous blog visitors. Do not publish tokens or account preview links. Use an actual raw.githubusercontent.com URL to a file on a public branch; GitHub's blob page is HTML and is not an image URL. Keep the branch/path stable and verify an anonymous request returns image bytes and an image content type.

## Optional responsive source-image activation

scripts/activate-blogger-images.mjs validates existing generated image-plan files and real hosted variants; it is not an uploader. The clean native preset exports no private source images. For a separately configured source-image workflow, upload the exact generated variants, preserve dimensions and MIME types, and provide the actual mapping URLs before activation/rebuild. Do not activate nonexistent image plans or fabricate URLs.

Keep uploaded media available for the lifetime of the post. When replacing hosting, verify new URLs first, update references, rebuild/restore only where needed and check both body and social images after publication. Authoring a new native post does not require a theme rebuild.
