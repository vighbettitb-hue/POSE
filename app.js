const $=id=>document.getElementById(id);
const NS="http://www.w3.org/2000/svg";
let categories=["Összes"];
const poses=[
 {id:"neutral",name:"Alapállás",cat:"Álló",desc:"Egyenes, szemből álló testtartás.",j:[[50,10],[50,23],[50,43],[50,60],[34,31],[24,48],[17,64],[66,31],[76,48],[83,64],[42,60],[39,82],[37,98],[58,60],[61,82],[63,98]]},
 {id:"handsup",name:"Kéz a magasban",cat:"Álló",desc:"Mindkét kar a fej fölé emelve.",j:[[50,10],[50,23],[50,44],[50,60],[37,25],[29,10],[25,3],[63,25],[71,10],[75,3],[42,60],[40,81],[38,98],[58,60],[60,81],[62,98]]},
 {id:"hip",name:"Kéz csípőn",cat:"Álló",desc:"Enyhén széles terpesz, kéz a csípőn.",j:[[50,10],[50,23],[50,44],[50,60],[36,30],[29,42],[42,46],[64,30],[71,42],[58,46],[42,60],[36,81],[31,98],[58,60],[64,81],[69,98]]},
 {id:"armswide",name:"Kitárt karok",cat:"Álló",desc:"Nyitott, szimmetrikus testtartás.",j:[[50,10],[50,23],[50,44],[50,60],[36,30],[22,32],[8,33],[64,30],[78,32],[92,33],[42,60],[39,81],[37,98],[58,60],[61,81],[63,98]]},
 {id:"sit",name:"Ülés széken",cat:"Ülő",desc:"Ülő póz, előrenyújtott lábszárral.",j:[[50,10],[50,23],[50,43],[50,55],[36,30],[30,44],[26,54],[64,30],[70,44],[74,54],[50,55],[67,62],[82,63],[94,64],[50,55],[39,75],[27,78]]},
 {id:"crossleg",name:"Keresztbe tett láb",cat:"Ülő",desc:"Laza ülő póz, keresztezett lábakkal.",j:[[50,10],[50,23],[50,43],[50,55],[36,30],[30,43],[27,54],[64,30],[70,43],[73,54],[50,55],[67,67],[53,77],[34,77],[50,55],[36,67],[50,77]]},
 {id:"kneel",name:"Fél térdelés",cat:"Térdelő",desc:"Egyik térd lent, másik láb előre.",j:[[50,10],[50,23],[50,43],[50,55],[36,30],[30,43],[25,55],[64,30],[70,43],[75,55],[50,55],[38,72],[25,76],[20,76],[50,55],[64,69],[78,70]]},
 {id:"lunge",name:"Kitörés",cat:"Mozgás",desc:"Dinamikus, előrelépő kitörés.",j:[[50,10],[50,23],[50,43],[50,58],[36,30],[28,43],[21,55],[64,30],[72,43],[79,55],[43,58],[31,76],[20,92],[57,58],[70,73],[84,90]]},
 {id:"walk",name:"Séta",cat:"Mozgás",desc:"Természetes lépő mozdulat.",j:[[50,10],[50,23],[50,43],[50,58],[36,30],[28,43],[23,55],[64,30],[72,43],[77,55],[43,58],[35,76],[24,91],[57,58],[69,75],[81,88]]},
 {id:"balance",name:"Egyensúly",cat:"Mozgás",desc:"Egy lábon álló, nyújtózó póz.",j:[[50,10],[50,23],[50,43],[50,60],[36,30],[26,22],[17,16],[64,30],[74,22],[83,16],[42,60],[39,81],[37,98],[58,60],[68,73],[80,80]]},
 {id:"lean",name:"Oldalra dőlés",cat:"Álló",desc:"Oldalra nyújtózó, íves testtartás.",j:[[52,10],[53,23],[55,43],[56,60],[39,30],[30,18],[24,9],[68,30],[76,42],[82,53],[47,60],[43,81],[40,98],[65,60],[68,81],[70,98]]},
 {id:"star",name:"Csillagpóz",cat:"Álló",desc:"Széles kar- és lábtartás.",j:[[50,10],[50,23],[50,43],[50,60],[36,29],[22,18],[8,9],[64,29],[78,18],[92,9],[42,60],[32,78],[22,94],[58,60],[68,78],[78,94]]}
];

// Extra modern pose library: 20 themes × 10 pose variations = 200 additional poses.
const sceneSets = [
 {cat:"Medencepart",names:["Medence szélén ülve","Láb a vízben","Napozóágyon hátradőlve","Napkalap igazítása","Váll fölött visszanézve","Törölközővel a vállon","Koktél a kézben","Lépcsőn állva","Víz felé sétálva","Naplementés oldalnézet"]},
 {cat:"Vacsora",names:["Étlapot olvasva","Poharat felemelve","Asztalnál oldalra fordulva","Állal kézre támaszkodva","Gyertyafényben ülve","Nevetés közben","Váll fölött a kamerára nézve","Szék mellett állva","Kabátot levéve","Elegáns keresztbe tett lábbal"]},
 {cat:"Tengerpart",names:["Hullámok felé sétálva","Homokban ülve","Tengerre nézve","Kalapot fogva a szélben","Kéz a hajban","Parton nyújtózva","Lábnyomokat nézve","Naplementében sziluett","Könnyed fordulat","Kagylót felemelve"]},
 {cat:"Kávézó",names:["Kávéscsészével","Ablak mellett ülve","Laptop fölé hajolva","Könyvet olvasva","Kávéval sétálva","Pultnak támaszkodva","Szívószállal kortyolva","Keresztbe tett lábbal","Baráti beszélgetés közben","Kabátban az ajtónál"]},
 {cat:"Városi",names:["Utcán átkelve","Falnak támaszkodva","Kirakatot nézve","Lépcsőn lefelé","Járdaszegélyen ülve","Telefonra pillantva","Vállon át visszanézve","Kezek zsebben","Esernyővel sétálva","Épület előtt pózolva"]},
 {cat:"Rooftop",names:["Tetőteraszon állva","Korlátnak dőlve","Város fölé nézve","Koktélos esti póz","Szélben hajmozdulattal","Magas széken ülve","Naplemente felé fordulva","Két kézzel a korláton","Oldalprofil a fényekkel","Laza táncmozdulat"]},
 {cat:"Divat",names:["Runway lépés","Kéz a derékon","Kabát vállra dobva","Szemüveg igazítása","Dinamikus fordulat","Laza oversized póz","Láb keresztben állva","Táska a vállon","Közelről arcot keretezve","Magazin címlap póz"]},
 {cat:"Tükörszelfi",names:["Telefon arc mellett","Teljes alakos tükörkép","Oldalprofilos szelfi","Laza csípőbillentés","Telefon két kézzel","Ülő tükörszelfi","Edzőtermi tükörpóz","Kabátos tükörkép","Mosolygós váll fölötti","Tükör előtt nyújtózva"]},
 {cat:"Sport",names:["Futás előtti bemelegítés","Nyújtózás magasra","Kitörés póz","Egyensúly egy lábon","Ugrás előtti lendület","Győzelmi kéztartás","Jógás faállás","Guggolás tartás","Karok oldalra nyújtva","Levezető nyújtás"]},
 {cat:"Jóga",names:["Faállás","Harcos póz","Oldalsó nyújtózás","Ülő meditáció","Térdelő nyújtás","Hátrahajló nyújtás","Előrehajlás","Egyensúlyozó póz","Karok magasban","Pihenő ülés"]},
 {cat:"Tánc",names:["Forgás közben","Karok a magasban","Oldalra lépés","Dinamikus kitartás","Láblendítés","Ritmusra hajolva","Páros tánclépés","Laza vállmozdulat","Ugrás közben","Záró táncpóz"]},
 {cat:"Esküvő",names:["Virágcsokorral","Ruha vagy öltöny igazítása","Elegáns oldalállás","Gyűrű megmutatása","Lassú séta","Váll fölötti mosoly","Ülő portrépóz","Csokor a mellkas előtt","Kéz a partner kezében","Ünnepi forgás"]},
 {cat:"Páros",names:["Egymás felé fordulva","Kézen fogva séta","Homlok összeérintve","Háttal egymásnak","Ölelés oldalról","Egymásra nevetve","Közös ülő póz","Egyik fél hátulról ölel","Táncos fordulat","Váll a vállnak"]},
 {cat:"Utazás",names:["Bőrönddel állva","Térképet nézve","Hátizsákkal sétálva","Kilátás felé mutatva","Vasútállomási várakozás","Repülőtéri indulás","Városnéző póz","Képeslapot tartva","Lépcsőn pihenve","Út menti megálló"]},
 {cat:"Természet",names:["Fák között sétálva","Virágot szemlélve","Sziklán ülve","Mezőn kitárt karokkal","Kilátásnak háttal","Padon pihenve","Levéllel a kézben","Erdőben visszanézve","Patak mellett guggolva","Szélben állva"]},
 {cat:"Fesztivál",names:["Kezek a magasban","Napszemüveges fesztiválpóz","Táncoló tömegben","Karkötőt mutatva","Oldalra ringatózva","Koncertre mutatva","Barátokkal összehajolva","Laza ülő pihenő","Fények felé fordulva","Ugrás örömben"]},
 {cat:"Otthon",names:["Kanapén lazítva","Konyhapultnak dőlve","Bögrével az ablaknál","Könyvvel fotelben","Szőnyegen ülve","Polcnál állva","Pulóver ujját igazítva","Nyújtózás ébredés után","Fotelben keresztbe tett lábbal","Tánc a nappaliban"]},
 {cat:"Iroda",names:["Asztal mellett állva","Laptopon dolgozva","Jegyzetfüzettel","Tárgyalóban ülve","Ablak mellett telefonálva","Kávészünetben","Prezentációra mutatva","Szék támlájára támaszkodva","Kabátban induláskor","Laza üzleti portré"]},
 {cat:"Autó",names:["Autó mellett állva","Ajtónak támaszkodva","Vezetőülésben ülve","Napszemüvegben az autónál","Csomagtartónál","Utazásra készen","Oldalról az autó mellett","Kezek zsebben a járműnél","Háttal a kamerának","Autóhoz sétálva"]},
 {cat:"Éjszakai",names:["Utcai fények alatt","Neonfény felé fordulva","Kabátban esti séta","Bárpultnál ülve","Kirakatfényben állva","Eső utáni utcán","Váll fölötti éjszakai portré","Laza esti táncpóz","Lépcsőn ülve fényekkel","Sziluett a városi háttér előtt"]}
];
function varyPose(joints, n) {
  const mirrored = n % 2 === 1;
  const dx = ((n % 5) - 2) * 1.15;
  const dy = ((n % 3) - 1) * 0.65;
  return joints.map((pt, idx) => {
    let x = mirrored ? 100 - pt[0] : pt[0];
    let y = pt[1];
    if (idx >= 4 && idx <= 9) x += dx * (idx % 2 ? 1 : -1);
    if (idx >= 10) x += dx * (idx % 2 ? -0.6 : 0.6);
    if (idx === 0 || idx === 1) y += dy;
    return [Math.max(4, Math.min(96, x)), Math.max(2, Math.min(101, y))];
  });
}
let extraId = 0;
sceneSets.forEach((scene, sceneIndex) => {
  for (let i = 0; i < scene.names.length; i++) {
    const source = poses[(sceneIndex * 3 + i) % 12];
    poses.push({
      id: `modern-${extraId++}`,
      name: scene.names[i],
      cat: scene.cat,
      desc: `${scene.cat} hangulatú fotópóz. Igazítsd a sziluettet a kamera képén látható testhelyzetedhez.`,
      j: varyPose(source.j, i + sceneIndex)
    });
  }
});
categories = ["Összes", ...sceneSets.map(s => s.cat), "Álló", "Ülő", "Térdelő", "Mozgás"];

let activeCategory="Összes",activePose=poses[0],stream=null,facing="environment",opacity=55,scale=100,flipped=false,installPrompt=null;
function svgFor(pose,small=false){
 const j=pose.j, svg=document.createElementNS(NS,"svg");svg.setAttribute("viewBox","0 0 100 105");svg.setAttribute("role","img");
 const g=document.createElementNS(NS,"g");g.setAttribute("fill","none");g.setAttribute("stroke","white");g.setAttribute("stroke-linecap","round");g.setAttribute("stroke-linejoin","round");
 const add=(a,b,w)=>{const l=document.createElementNS(NS,"path");l.setAttribute("d",`M${j[a][0]} ${j[a][1]} L${j[b][0]} ${j[b][1]}`);l.setAttribute("stroke-width",w);g.appendChild(l)};
 // Limbs: tapered visual mass built from rounded, connected strokes.
 add(1,2,19); add(2,3,20);
 add(1,4,13);add(4,5,10);add(5,6,8);
 add(1,7,13);add(7,8,10);add(8,9,8);
 add(3,10,14);add(10,11,12);add(11,12,9);
 add(3,13,14);add(13,14,12);add(14,15,9);
 svg.appendChild(g);
 const head=document.createElementNS(NS,"circle");head.setAttribute("cx",j[0][0]);head.setAttribute("cy",j[0][1]-2);head.setAttribute("r","7.5");head.setAttribute("fill","white");svg.appendChild(head);
 // Soft torso silhouette.
 const torso=document.createElementNS(NS,"path");torso.setAttribute("d",`M${j[1][0]-7} ${j[1][1]} Q${j[1][0]} ${j[1][1]-3} ${j[1][0]+7} ${j[1][1]} L${j[2][0]+10} ${j[2][1]-2} Q${j[2][0]+8} ${j[3][1]} ${j[3][0]} ${j[3][1]} Q${j[2][0]-8} ${j[3][1]} ${j[2][0]-10} ${j[2][1]-2} Z`);torso.setAttribute("fill","white");svg.appendChild(torso);
 return svg;
}
function render(){
 $("categories").innerHTML="";categories.forEach(c=>{const b=document.createElement("button");b.textContent=c;b.className=c===activeCategory?"active":"";b.onclick=()=>{activeCategory=c;render()};$("categories").appendChild(b)});
 const list=poses.filter(p=>activeCategory==="Összes"||p.cat===activeCategory);$("poses").innerHTML="";
 list.forEach(p=>{const b=document.createElement("button");b.className="pose-card"+(p.id===activePose.id?" active":"");const thumb=document.createElement("div");thumb.className="pose-thumb";thumb.appendChild(svgFor(p,true));const title=document.createElement("strong");title.textContent=p.name;const sub=document.createElement("small");sub.textContent=p.cat;b.append(thumb,title,sub);b.onclick=()=>selectPose(p);$("poses").appendChild(b)});
 $("poseCount").textContent=`${list.length} póz`; $("poseDescription").textContent=activePose.desc;
}
function selectPose(p){activePose=p;$("silhouetteLayer").replaceChildren(svgFor(p));render();applyAdjustments()}
function applyAdjustments(){const svg=$("silhouetteLayer").querySelector("svg");if(svg){svg.style.opacity=opacity/100;svg.style.setProperty("--scale",scale/100);svg.style.setProperty("--flip",flipped?-1:1)}$("opacityValue").textContent=opacity+"%";$("scaleValue").textContent=scale+"%"}
function toast(t){$("toast").textContent=t;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2500)}
async function startCamera(){try{if(!navigator.mediaDevices?.getUserMedia)throw Error("A böngésző nem támogatja a kamerát. HTTPS-kapcsolat szükséges.");if(stream)stream.getTracks().forEach(t=>t.stop());stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:facing},audio:false});$("camera").srcObject=stream;$("camera").style.display="block";$("cameraPlaceholder").classList.add("hidden");$("cameraBtn").textContent="Kamera leállítása";$("switchBtn").disabled=false;$("captureBtn").disabled=false}catch(e){toast(e.message||"Nem sikerült elindítani a kamerát.")}}
$("cameraBtn").onclick=()=>{if(stream){stream.getTracks().forEach(t=>t.stop());stream=null;$("camera").style.display="none";$("cameraPlaceholder").classList.remove("hidden");$("cameraBtn").textContent="Kamera indítása";$("switchBtn").disabled=true;$("captureBtn").disabled=true}else startCamera()};
$("switchBtn").onclick=()=>{facing=facing==="environment"?"user":"environment";startCamera()};
$("opacity").oninput=e=>{opacity=+e.target.value;applyAdjustments()};$("scale").oninput=e=>{scale=+e.target.value;applyAdjustments()};
$("flipBtn").onclick=()=>{flipped=!flipped;applyAdjustments()};$("resetBtn").onclick=()=>{opacity=55;scale=100;flipped=false;$("opacity").value=55;$("scale").value=100;applyAdjustments()};
$("captureBtn").onclick=()=>{const video=$("camera");if(!video.videoWidth){toast("A kamera még nem áll készen.");return}const c=$("captureCanvas"),ctx=c.getContext("2d");c.width=video.videoWidth;c.height=video.videoHeight;ctx.drawImage(video,0,0,c.width,c.height);const svg=$("silhouetteLayer").querySelector("svg");if(svg){const xml=new XMLSerializer().serializeToString(svg);const blob=new Blob([xml],{type:"image/svg+xml"});const url=URL.createObjectURL(blob);const img=new Image();img.onload=()=>{const w=c.width*.78,h=c.height*.88;ctx.globalAlpha=opacity/100;ctx.translate((c.width-w)/2,(c.height-h)/2);ctx.scale(flipped?-1:1,1);ctx.drawImage(img,0,0,w*scale/100,h*scale/100);ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;URL.revokeObjectURL(url);downloadCapture(c)};img.src=url}else downloadCapture(c)};
function downloadCapture(c){c.toBlob(blob=>{const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="poztukor-foto.png";a.click();URL.revokeObjectURL(a.href);toast("A fotó elmentése elindult.")})}
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();installPrompt=e;$("installBtn").classList.remove("hidden")});
$("installBtn").onclick=async()=>{if(installPrompt){installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;$("installBtn").classList.add("hidden")}else toast("Chrome menü → Alkalmazás telepítése vagy Hozzáadás a kezdőképernyőhöz.")};
if("serviceWorker"in navigator&&location.protocol.startsWith("http"))navigator.serviceWorker.register("./sw.js").catch(()=>{});
selectPose(activePose);render();
