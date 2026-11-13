import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('eRekTas has its own desktop app identity within the shared GitHub origin',()=>{
 const manifestURL=new URL('https://example.github.io/eRekodTasmikLTB/docs/manifest.webmanifest');
 const m=JSON.parse(fs.readFileSync(new URL('../docs/manifest.webmanifest',import.meta.url),'utf8'));
 const start=new URL(m.start_url,manifestURL), id=new URL(m.id,start.origin+'/');
 assert.equal(id.pathname,'/eRekodTasmikLTB/');
 assert.equal(new URL(m.scope,manifestURL).pathname,'/eRekodTasmikLTB/docs/');
 assert.notEqual(id.pathname,'/');
 assert.notEqual(id.pathname,'/NadiMarkah-App/');
 assert.notEqual(id.pathname,'/OneStopCenterLTB-App/');
});
