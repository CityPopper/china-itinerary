// Development only. Run with Docker Compose; production is static files.
import http from 'node:http';
import { readFile, stat, realpath } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=await realpath(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'));
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg'};
http.createServer(async(request,response)=>{
  try{
    const pathname=decodeURIComponent(new URL(request.url,'http://localhost').pathname);
    if(pathname.split('/').some(part=>part.startsWith('.')||['templates','content','scripts','tests'].includes(part)))throw new Error('Not public');
    let file=await realpath(path.join(root,pathname));
    if(file!==root&&!file.startsWith(root+path.sep))throw new Error('Outside site');
    if((await stat(file)).isDirectory())file=path.join(file,'index.html');
    if(!mime[path.extname(file)])throw new Error('Not public');
    response.setHeader('Content-Type',mime[path.extname(file)]);
    response.end(await readFile(file));
  }catch{response.writeHead(404);response.end('Not found');}
}).listen(4173,'0.0.0.0',()=>console.log('Local: http://localhost:4173'));
