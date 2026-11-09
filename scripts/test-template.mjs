import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { JSDOM } from 'jsdom';
import { renderPreview } from './lib/blogger-preview.mjs';
import { validateBloggerExpressions, validateBloggerWidgetSettings } from './lib/blogger-markup.mjs';
import { resolveThemeConfig } from './lib/blogger-config.mjs';

const root=path.resolve(import.meta.dirname,'..');
const out=path.join(root,'blogger/output');
const xml=await fs.readFile(path.join(out,'iamrusiru-blogger.xml'),'utf8');
const data=JSON.parse(await fs.readFile(path.join(out,'content.json'),'utf8'));
const parsed=new JSDOM(xml,{contentType:'text/xml'}).window.document;
const html=options=>new JSDOM(renderPreview(xml,{...data,media:new Map(),localAssets:false,...options}).replace(/<style>[\s\S]*?<\/style>/g,'')).window.document;

test('native theme validates without imported content or application dependencies',async()=>{
  validateBloggerExpressions(parsed);
  validateBloggerWidgetSettings(parsed);
  assert.deepEqual(data.posts,[]);
  assert.deepEqual(data.pages,[]);
  assert.doesNotMatch(xml,/@@[A-Z_]+@@|@tailwind|@apply|ru5iru|Rusiru|Omobio|react-dom|supabase|mcp-js|proper-project-planning/);
  assert.equal(parsed.getElementsByTagNameNS('http://www.google.com/2005/gml/b','skin').length,1);
  const manifest=JSON.parse(await fs.readFile(path.join(out,'media-manifest.json'),'utf8'));
  assert.deepEqual(manifest,{});
  const home=html({});
  assert.equal(home.querySelectorAll('h1').length,1);
  assert.equal(home.querySelector('meta[property="og:title"]').content,data.config.title);
});

test('native posts and Pages render their own titles, descriptions, content and metadata',()=>{
  const post={slug:'sample',path:'/2026/11/sample.html',title:'Sample native article',body:'<h2>A useful answer</h2><p>Readable original content.</p>',labels:['Engineering','Testing'],published:'2026-11-09T00:00:00.000Z',updated:'2026-11-09T00:00:00.000Z',date:'November 9, 2026',imageUrl:'https://example.com/cover.jpg'};
  for(const kind of ['post','page']){
    const item={...post,...(kind==='page'?{path:'/p/sample.html',title:'Sample native Page',labels:[]}:{} )};
    const doc=html({kind,post:item,posts:[item],searchDescription:'A unique description from the Blogger editor.'});
    assert.equal(doc.querySelectorAll('h1').length,1);
    assert.equal(doc.querySelector('h1').textContent,item.title);
    assert.equal(doc.querySelector('meta[name="description"]').content,'A unique description from the Blogger editor.');
    assert.equal(doc.querySelector('meta[property="og:description"]').content,'A unique description from the Blogger editor.');
    assert.equal(doc.querySelector('link[rel="canonical"]').href,data.config.blogUrl+item.path);
    assert.match(doc.body.textContent,/Readable original content/);
    assert.equal(doc.querySelectorAll('main .post-content').length,1);
    if(kind==='post') assert.ok(doc.querySelector('[itemtype="https://schema.org/BlogPosting"]'));
  }
});

test('editor snippets preserve code, semantic tables and visible FAQ microdata',async()=>{
  const read=async name=>JSDOM.fragment(await fs.readFile(path.join(out,'editor-templates/snippets',name+'.html'),'utf8'));
  const code=await read('code');assert.equal(code.querySelector('code').textContent,'const message = "Hello, world!";\nconsole.log(message);');assert.ok(code.querySelector('[data-copy-code]'));
  assert.ok((await read('table')).querySelector('thead th[scope="col"]'));
  assert.equal((await read('faq')).querySelectorAll('[itemprop="mainEntity"]').length,2);
});

test('a second owner build updates branding, topics, links and metadata while preserving CSS',async()=>{
  const config=structuredClone(data.config);
  config.title='Second Blog';config.author='Second Author';config.blogUrl='https://second-blog.blogspot.com';
  config.branding={prefix:'Second',accent:'Blog',twitterCreator:'@second'};
  config.hero.headingPrefix="Second Author's";config.hero.description='Second owner introduction.';
  config.footer.description='Second owner footer.';config.connect.description='Second owner contact.';
  config.links.github='https://github.com/second-owner';config.links.about='/p/second-about.html';config.links.portfolio='https://example.com/work';config.topics=['Research','Travel'];
  const fixtures=path.join(root,'blogger/test-output');await fs.mkdir(fixtures,{recursive:true});
  await fs.writeFile(path.join(fixtures,'config.json'),JSON.stringify(config));
  execFileSync(process.execPath,['scripts/build-blogger.mjs','--config',path.join(fixtures,'config.json'),'--out',path.join(fixtures,'site')],{cwd:root,stdio:'pipe'});
  const rebuilt=await fs.readFile(path.join(fixtures,'site/iamrusiru-blogger.xml'),'utf8');
  assert.match(rebuilt,/Second owner introduction/);assert.match(rebuilt,/Second owner footer/);assert.match(rebuilt,/Second owner contact/);assert.match(rebuilt,/github.com\/second-owner/);
  assert.match(rebuilt,/search\/label\/Research/);assert.doesNotMatch(rebuilt,/your-blog.blogspot.com|Your name's|Author portrait only/);
  const skin=s=>s.match(/<b:skin><!\[CDATA\[([\s\S]*?)\]\]><\/b:skin>/)[1];
  assert.equal(skin(rebuilt),skin(xml));
  const page=new JSDOM(renderPreview(rebuilt,{config,posts:[],media:new Map()}).replace(/<style>[\s\S]*?<\/style>/g,'')).window.document;
  const links=[...page.querySelectorAll('footer a')];
  assert.equal(links.find(a=>a.textContent.trim()==='About me').getAttribute('href'),config.links.about);
  assert.equal(links.find(a=>a.textContent.trim()==='Portfolio').getAttribute('href'),config.links.portfolio);
  assert.equal(resolveThemeConfig({ ...config,hero:{...config.hero} }).author,'Second Author');
});
