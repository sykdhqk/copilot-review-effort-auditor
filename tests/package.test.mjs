import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=dirname(dirname(fileURLToPath(import.meta.url)));

test('manifest is a safe declarative Skill package',()=>{
  const manifest=JSON.parse(readFileSync(join(root,'ipollowork.plugin.json')));
  assert.equal(manifest.schemaVersion,2);
  assert.equal(manifest.source.trusted,false);
  assert.equal(manifest.package.publisher.id,'sykdhqk');
  assert.equal(manifest.package.updateId,'sykdhqk/copilot-review-effort-auditor');
  for(const field of ['permissions','authorization','engines','commands','agents','mcpServers']) assert.equal(field in manifest,false);
  assert.deepEqual(manifest.resources.map(resource=>[resource.type,resource.path]),[
    ['skill','skills/copilot-review-effort-auditor']
  ]);
});

test('Skill resolves effort precedence without inventing missing rules',()=>{
  const skill=readFileSync(join(root,'skills/copilot-review-effort-auditor/SKILL.md'),'utf8');
  for(const token of ['explicitly chosen','previously used','requestor effort','repository effort','organization effort','built-in default']) assert.match(skill,new RegExp(token,'i'));
  for(const state of ['Lite','Balanced','Default','none','unknown']) assert.match(skill,new RegExp(`\\b${state}\\b`));
  assert.match(skill,/never treat them as the same state/i);
  assert.match(skill,/unknown.*blocking uncertainty/i);
  assert.match(skill,/Do not extend that rule to requestor settings without evidence/i);
});

test('Skill bounds cost claims and changes',()=>{
  const skill=readFileSync(join(root,'skills/copilot-review-effort-auditor/SKILL.md'),'utf8');
  assert.match(skill,/Report known Lite and known Balanced populations separately/i);
  assert.match(skill,/Exclude unresolved cases from the confirmed range/i);
  assert.match(skill,/Do not present a midpoint, forecast, savings claim/i);
  assert.match(skill,/This audit is advisory\. It has not changed GitHub settings, budgets, or review behavior\./);
});

test('reference defines a complete auditable report',()=>{
  const reference=readFileSync(join(root,'skills/copilot-review-effort-auditor/references/audit-format.md'),'utf8');
  for(const heading of ['Verdict','Resolution table','Portfolio ranges','Cutover map','Action plan','Verification query','Rollback signals','Boundary']) assert.match(reference,new RegExp(`^## ${heading}$`,'m'));
  assert.match(reference,/ignored lower settings/i);
  assert.match(reference,/Do not call a case protected when an unknown earlier step could override/i);
});

test('archives contain complete Skill resources and bilingual documentation',()=>{
  execFileSync('node',['package.mjs'],{cwd:root});
  const plugin=execFileSync('unzip',['-Z','-1','dist/copilot-review-effort-auditor-1.0.0.ipollowork-plugin'],{cwd:root,encoding:'utf8'});
  assert.deepEqual(plugin.trim().split('\n').sort(),[
    'ipollowork.plugin.json',
    'skills/copilot-review-effort-auditor/SKILL.md',
    'skills/copilot-review-effort-auditor/references/audit-format.md'
  ].sort());
  const skill=execFileSync('unzip',['-Z','-1','dist/copilot-review-effort-auditor-1.0.0-skill.zip'],{cwd:root,encoding:'utf8'});
  assert.match(skill,/^SKILL\.md$/m);
  assert.match(skill,/^references\/audit-format\.md$/m);
  const source=execFileSync('unzip',['-Z','-1','dist/copilot-review-effort-auditor-1.0.0-source.zip'],{cwd:root,encoding:'utf8'});
  assert.match(source,/README\.md/);
  assert.match(source,/README\.zh-CN\.md/);
  assert.match(source,/examples\/expected-audit\.md/);
});

test('topics contain exact iPolloWork and product labels',()=>{
  const topics=JSON.parse(readFileSync(join(root,'topics.json')));
  for(const topic of ['ipollowork','ipollowork-plugin','github-copilot','copilot-code-review','review-effort','ai-credits']) assert.ok(topics.includes(topic));
  assert.equal(topics.includes('ipollo-plugin'),false);
});

test('public documentation stays product-focused',()=>{
  const docs=['README.md','README.zh-CN.md'].map(file=>readFileSync(join(root,file),'utf8')).join('\n');
  for(const heading of ['Why this exists','热点背景','热点与边界','Topic and limits']) assert.doesNotMatch(docs,new RegExp(`^#+\\s+${heading}$`,'mi'));
});
