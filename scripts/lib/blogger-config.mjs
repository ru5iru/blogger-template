import { escapeXml } from './blogger-markup.mjs';
import { seoDefaults, validateSeoConfig } from './blogger-seo.mjs';
import { validateResponsiveImages } from './blogger-images.mjs';

export const themeDefaults = {
  "contentMode": "native",
  "socialImageUrl": "",
  "seo": {
    "language": "en",
    "homeTitle": "",
    "homeKeywords": [],
    "emitLegacyKeywords": true,
    "noindexPaths": [
      "/p/privacy-policy.html",
      "/p/cookie-policy.html"
    ],
    "routes": []
  },
  "description": "Stories, ideas, and things I am learning.",
  "branding": {
    "prefix": "Your",
    "accent": "Blog",
    "twitterCreator": ""
  },
  "hero": {
    "eyebrow": "Welcome to my blog",
    "headingPrefix": "Your name's",
    "headingMain": "Stories and Ideas ",
    "headingAccent": "Blog.",
    "description": "A place to share my work, ideas, and the things I learn along the way.",
    "cardLines": [
      "Building ideas.",
      "Sharing knowledge."
    ],
    "portraitAlt": "Author portrait"
  },
  "profile": {
    "portraitUrl": "",
    "role": "Writer",
    "job": "About the author",
    "bio": "Welcome to my blog. This is where I share my work and the things I am learning.",
    "citationName": ""
  },
  "links": {
    "about": "/p/about.html",
    "contact": "/p/contact.html",
    "privacy": "/p/privacy-policy.html",
    "cookies": "/p/cookie-policy.html",
    "portfolio": "/p/about.html",
    "linkedin": "https://www.linkedin.com/",
    "facebook": "https://www.facebook.com/",
    "instagram": "https://www.instagram.com/",
    "github": "https://github.com/",
    "twitter": "https://x.com/"
  },
  "footer": {
    "description": "A personal blog about my work, ideas, and the things I learn.",
    "quickTitle": "Quick Links",
    "legalTitle": "Legal Stuff",
    "connectTitle": "Connect",
    "copyright": "All rights reserved."
  },
  "connect": {
    "title": "Let's connect",
    "description": "Find me on socials or get in touch."
  },
  "topics": [
    "Engineering",
    "Career",
    "Tutorials",
    "Side Projects",
    "Reading",
    "Personal"
  ],
  "blogUrl": "https://your-blog.blogspot.com",
  "assetBaseUrl": "https://your-blog.blogspot.com/assets/",
  "assetUrls": {},
  "title": "Your Blog",
  "author": "Your name"
};

// Merge only known object keys; arrays replace their defaults as a whole.
export function resolveThemeConfig(input) {
  const rootKeys = new Set([...Object.keys(themeDefaults), 'blogUrl', 'assetBaseUrl', 'assetUrls', 'responsiveImages', 'title', 'author']);
  function merge(defaults, custom, trail = '') {
    if (typeof custom !== 'object' || custom === null || Array.isArray(custom)) throw new Error(`${trail || 'config'} must be an object`);
    // Configs must never share nested defaults: one owner's changes must not
    // contaminate a later native/reusable build in the same process.
    const result = structuredClone(defaults);
    for (const [key, value] of Object.entries(custom)) {
      const name = trail ? trail + '.' + key : key;
      if (['__proto__', 'prototype', 'constructor'].includes(key)) throw new Error('Invalid configuration key: ' + name);
      if (defaults[key] && typeof defaults[key] === 'object' && !Array.isArray(defaults[key])) result[key] = merge(defaults[key], value, name);
      else {
        if (trail ? !Object.hasOwn(defaults, key) : !rootKeys.has(key)) throw new Error('Unknown theme setting: ' + name);
        result[key] = structuredClone(value);
      }
    }
    return result;
  }
  const config = merge(themeDefaults, input);
  config.responsiveImages = validateResponsiveImages(config.responsiveImages);
  if (!['project', 'native'].includes(config.contentMode)) throw new Error('contentMode must be project or native');
  const checkText = (value, name) => { if (typeof value !== 'string') throw new Error(name + ' must be text'); };
  for (const key of ['title', 'author', 'description']) checkText(config[key], key);
  for (const group of ['branding', 'hero', 'profile', 'footer', 'connect']) {
    for (const [key, value] of Object.entries(config[group])) {
      if (group === 'hero' && key === 'cardLines') continue;
      checkText(value, group + '.' + key);
    }
  }
  for (const key of ['blogUrl', 'assetBaseUrl', 'assetUrls']) if (!config[key]) throw new Error('Missing ' + key);
  if (typeof config.assetUrls !== 'object' || Array.isArray(config.assetUrls)) throw new Error('assetUrls must map filenames to HTTPS URLs');
  for (const [name, value] of Object.entries(config.assetUrls)) if (typeof value !== 'string' || new URL(value).protocol !== 'https:') throw new Error('assetUrls.' + name + ' must use HTTPS');
  if (new URL(config.blogUrl).protocol !== 'https:') throw new Error('blogUrl must use HTTPS');
  config.blogUrl = new URL(config.blogUrl).origin;
  if (new URL(config.assetBaseUrl).protocol !== 'https:') throw new Error('assetBaseUrl must use HTTPS');
  const checkUrl = (value, name, allowEmpty = false) => {
    checkText(value, name);
    if (allowEmpty && value === '') return;
    if (!value.startsWith('/') && !value.startsWith('https://')) throw new Error(name + ' must be a root-relative path or HTTPS URL');
    new URL(value, config.blogUrl);
    if (value.startsWith('//') || /[\r\n\\]/.test(value)) throw new Error('Invalid URL: ' + name);
  };
  for (const [key, value] of Object.entries(config.links)) checkUrl(value, 'links.' + key);
  checkUrl(config.profile.portraitUrl, 'profile.portraitUrl', true);
  if (config.profile.portraitUrl && !config.profile.portraitUrl.startsWith('https://')) throw new Error('profile.portraitUrl must be an absolute HTTPS URL');
  checkUrl(config.socialImageUrl, 'socialImageUrl', true);
  if (config.socialImageUrl && !config.socialImageUrl.startsWith('https://')) throw new Error('socialImageUrl must be an absolute HTTPS URL');
  if (!Array.isArray(config.hero.cardLines) || config.hero.cardLines.length !== 2 || config.hero.cardLines.some(line => typeof line !== 'string')) throw new Error('hero.cardLines must contain two text lines');
  if (!Array.isArray(config.topics) || !config.topics.length || config.topics.some(topic => typeof topic !== 'string' || !topic.trim()) || new Set(config.topics).size !== config.topics.length) throw new Error('topics must contain unique, nonempty names');
  validateSeoConfig(config.seo);
  return config;
}

export const topicExpression = config => '{' + config.topics.map(topic => JSON.stringify(topic)).join(', ') + '}';

export function editableRegion(sectionId, widgetId, title, html) {
  const content = html.replaceAll(']]>', ']]]]><![CDATA[>');
  return `<b:section id='${sectionId}' class='theme-region' maxwidgets='1' showaddelement='no'>
<b:widget id='${widgetId}' type='HTML' version='2' title='${escapeXml(title)}' locked='yes' mobile='yes'>
<b:widget-settings><b:widget-setting name='content'><![CDATA[${content}]]></b:widget-setting></b:widget-settings>
<b:includable id='main'><data:content/></b:includable>
</b:widget></b:section>`;
}
