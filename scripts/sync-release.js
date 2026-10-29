const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),dist=path.join(root,'dist');
for(const rel of ['PWA','ios/Diary/Web']){const target=path.join(root,rel);fs.rmSync(target,{recursive:true,force:true});fs.cpSync(dist,target,{recursive:true});}
const hx=path.join(root,'HBuilderX-App');const manifestPath=path.join(hx,'manifest.json');let manifest=fs.existsSync(manifestPath)?JSON.parse(fs.readFileSync(manifestPath,'utf8')):{};
const cfg=JSON.parse(fs.readFileSync(path.join(root,'src/release-config.json'),'utf8'));
const icons=fs.existsSync(path.join(hx,'icons'))?fs.readdirSync(path.join(hx,'icons')).filter(n=>/^icon-(20|29|40|58|60|76|80|87|120|152|167)\.png$/.test(n)).map(n=>[n,fs.readFileSync(path.join(hx,'icons',n))]):[];
fs.rmSync(hx,{recursive:true,force:true});fs.cpSync(dist,hx,{recursive:true});for(const[n,data]of icons)fs.writeFileSync(path.join(hx,'icons',n),data);
manifest.name=cfg.appName;manifest.description='A private offline diary for thoughts, moods and everyday moments.';manifest.version={name:cfg.version,code:110};manifest.developer={name:cfg.publisher,email:cfg.supportEmail};fs.writeFileSync(manifestPath,JSON.stringify(manifest,null,2));
console.log('Synced: PWA, HBuilderX-App, native iOS resources');
