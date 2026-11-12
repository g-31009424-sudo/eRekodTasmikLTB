const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const transport=fs.readFileSync(path.join(root,'docs/transport.js'),'utf8');
let total=0;
async function check(name,fn){await fn();total++;console.log('PASS '+name)}
function client(fetch){const c={fetch,window:{tasmikPagesConfig:{apiUrl:'https://script.google.com/macros/s/test/exec'}}};vm.createContext(c);vm.runInContext(transport,c);return c;}
(async()=>{
 await check('Frontend scripts parse and have no Apps Script template dependency',()=>{
  for(const file of ['docs/index.html','docs/sambungan.html']){
   const html=fs.readFileSync(path.join(root,file),'utf8');assert.ok(!html.includes('<?'));assert.ok(!html.includes('google.script'));
   for(const m of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))if(m[1].trim())new vm.Script(m[1]);
  }
  new vm.Script(transport);new vm.Script(fs.readFileSync(path.join(root,'docs/config.js'),'utf8'));
 });
 await check('POST omits Google cookies and sends PIN only in request body',async()=>{
  let request;const c=client(async(url,options)=>{request={url,options};return{ok:true,text:async()=>'{"ok":true,"data":{"success":true}}'}});
  await c.window.tasmikCallHttp('logMasukTasmik',['test-only-value']);
  assert.equal(request.options.credentials,'omit');assert.equal(request.options.method,'POST');assert.equal(request.options.redirect,'follow');
  assert.match(request.options.headers['Content-Type'],/^text\/plain/);assert.ok(!request.url.includes('test-only-value'));
  assert.equal(JSON.parse(request.options.body).args[0],'test-only-value');
 });
 await check('Unrecognised API host is rejected before sending data',async()=>{
  let calls=0;const c=client(async()=>{calls++});c.window.tasmikPagesConfig.apiUrl='https://example.invalid/exec';
  await assert.rejects(()=>c.window.tasmikCallHttp('getSyncData',['token']),/belum dikonfigurasi/);assert.equal(calls,0);
 });
 await check('Unexpected HTML response provides deployment guidance',async()=>{
  const c=client(async()=>({ok:true,text:async()=>'<html></html>'}));
  await assert.rejects(()=>c.window.tasmikCallHttp('getDashboardAwam',[]),/Api.gs telah diterbitkan/);
 });
 await check('Writes are not retried when network fails',async()=>{
  let calls=0;const c=client(async()=>{calls++;throw Error('offline')});
  await assert.rejects(()=>c.window.tasmikCallHttp('simpanRekod',['test',{}]),/tidak diulang automatik/);assert.equal(calls,1);
 });
 await check('Session expiry remains available to login recovery',async()=>{
  const c=client(async()=>({ok:true,text:async()=>'{"ok":false,"error":{"message":"Sesi tamat atau tidak sah."}}'}));
  await assert.rejects(()=>c.window.tasmikCallHttp('getSyncData',['test']),/Sesi tamat atau tidak sah/);
 });
 await check('Root page opens the full application',()=>{
  assert.ok(fs.readFileSync(path.join(root,'index.html'),'utf8').includes('url=./docs/'));
 });
 console.log(`${total} checks passed.`);
})().catch(e=>{console.error(e);process.exitCode=1});
