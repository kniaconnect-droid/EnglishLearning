// ===== DATA: materi dari 16-tenses-bahasa-inggris.md =====
// [nama, rumus, contoh, terjemahan, situasi]
const TENSES=[
["Simple Present","S + V1 (+s/es untuk he/she/it)","I drink coffee every morning.","Saya minum kopi setiap pagi.","kebiasaan atau fakta umum, misalnya menceritakan rutinitas harian."],
["Present Continuous","S + am/is/are + V-ing","She is cooking in the kitchen now.","Dia sedang memasak di dapur sekarang.","sesuatu yang sedang berlangsung saat kamu berbicara."],
["Present Perfect","S + have/has + V3","I have finished my homework.","Saya sudah menyelesaikan PR.","kejadian lampau yang hasilnya masih terasa sekarang."],
["Present Perfect Continuous","S + have/has + been + V-ing","He has been studying for two hours.","Dia sudah belajar selama dua jam.","kegiatan yang dimulai di masa lalu dan masih berlanjut, dengan penekanan pada durasi."],
["Simple Past","S + V2","I watched a movie yesterday.","Kemarin saya menonton film.","kejadian yang sudah selesai pada waktu tertentu di masa lalu."],
["Past Continuous","S + was/were + V-ing","I was sleeping when you called.","Saya sedang tidur ketika kamu menelepon.","kegiatan yang sedang berlangsung di masa lalu lalu terpotong oleh kejadian lain."],
["Past Perfect","S + had + V3","When I arrived, the movie had started.","Ketika saya tiba, filmnya sudah mulai.","dua kejadian di masa lalu; kamu menekankan mana yang terjadi lebih dulu."],
["Past Perfect Continuous","S + had been + V-ing","She had been waiting for an hour before the bus came.","Dia sudah menunggu selama satu jam sebelum busnya datang.","kegiatan yang berlangsung beberapa waktu sebelum kejadian lain di masa lalu."],
["Simple Future","S + will + V1","I will call you tonight.","Saya akan menelepon kamu malam ini.","keputusan spontan, janji, atau prediksi."],
["Future Continuous","S + will be + V-ing","At 8 tonight, I will be studying.","Jam 8 malam nanti, saya sedang belajar.","kegiatan yang sedang berlangsung pada waktu tertentu di masa depan."],
["Future Perfect","S + will have + V3","By December, I will have graduated.","Pada Desember, saya sudah lulus.","sesuatu yang sudah selesai sebelum batas waktu tertentu di masa depan."],
["Future Perfect Continuous","S + will have been + V-ing","Next month, I will have been working here for five years.","Bulan depan, saya sudah bekerja di sini selama lima tahun.","menekankan durasi kegiatan sampai titik waktu tertentu di masa depan."],
["Simple Past Future","S + would + V1","He said he would come to the party.","Dia bilang dia akan datang ke pesta.","menceritakan janji atau rencana seseorang di masa lalu."],
["Past Future Continuous","S + would be + V-ing","She said she would be waiting at the station.","Dia bilang dia akan sedang menunggu di stasiun.","kegiatan yang direncanakan berlangsung pada waktu tertentu setelah momen lampau itu."],
["Past Future Perfect","S + would have + V3","I thought she would have left by then.","Saya kira dia sudah pergi saat itu.","dugaan di masa lalu bahwa sesuatu akan sudah selesai pada waktu tertentu."],
["Past Future Perfect Continuous","S + would have been + V-ing","He said that by June he would have been living there for ten years.","Dia bilang bahwa pada Juni dia sudah tinggal di sana selama sepuluh tahun.","menceritakan ulang prediksi durasi kegiatan sampai titik waktu tertentu."]];
const ALL=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
// [judul, tenses yang dibahas, jenis game]
const D=[
["Introduction to English Tenses",[0,1,4,8],"mc"],["Simple Present",[0],"fill"],["Present Continuous",[1],"order"],["Present Perfect",[2],"tf"],["Present Perfect Continuous",[3],"mistake"],["Present Tenses Review",[0,1,2,3],"match"],["Present Tenses Challenge",[0,1,2,3],"mixed"],
["Simple Past",[4],"fill"],["Past Continuous",[5],"mc"],["Past Perfect",[6],"order"],["Past Perfect Continuous",[7],"tf"],["Past Tenses Review",[4,5,6,7],"mistake"],["Past Tenses Challenge",[4,5,6,7],"mixed"],
["Simple Future",[8],"mc"],["Future Continuous",[9],"fill"],["Future Perfect",[10],"order"],["Future Perfect Continuous",[11],"tf"],["Future Tenses Review",[8,9,10,11],"match"],["Future Tenses Challenge",[8,9,10,11],"mixed"],
["Simple Past Future",[12],"mc"],["Past Future Continuous",[13],"fill"],["Past Future Perfect",[14],"order"],["Past Future Perfect Continuous",[15],"mistake"],["Past Future Review",[12,13,14,15],"match"],["Past Future Challenge",[12,13,14,15],"mixed"],
["Understanding All 16 Tenses",ALL,"mc"],["Mixed Tenses Practice",ALL,"fill"],["Grammar Challenge",ALL,"mistake"],["Comprehensive Practice",ALL,"mixed"],["Final Exam",ALL,"mixed"]];
const GAME={mc:"Multiple Choice",fill:"Fill in the Blanks",order:"Arrange the Words",tf:"True or False",mistake:"Find the Mistake",match:"Sentence Matching",mixed:"Mixed Challenge"};

// ===== GENERATOR SOAL: 15 soal per hari, semua kalimat dibentuk dengan rumus yang benar =====
// [V1, V1+s, V2, V3, V-ing, objek]
const V=[["eat","eats","ate","eaten","eating","rice"],["write","writes","wrote","written","writing","a letter"],["open","opens","opened","opened","opening","the door"],["play","plays","played","played","playing","football"],["drink","drinks","drank","drunk","drinking","tea"],["cook","cooks","cooked","cooked","cooking","dinner"],["make","makes","made","made","making","a cake"],["buy","buys","bought","bought","buying","a bag"]];
const SUBJ=["I","she","they","he","we","you"];
const MARK=["every day","right now","already","for two hours","yesterday","when you called","before the bell rang","for an hour before lunch","tomorrow","at 8 tomorrow night","by next December","for five years by next month","the next day","at 8 the next night","by then","for ten years by that June"];
// Frasa kata kerja untuk tense ke-t
function ph(t,s,v){const p=V[v],s3=s=="she"||s=="he",be=s=="I"?"am":s3?"is":"are",was=(s=="I"||s3)?"was":"were",hv=s3?"has":"have";
return [s3?p[1]:p[0],be+" "+p[4],hv+" "+p[3],hv+" been "+p[4],p[2],was+" "+p[4],"had "+p[3],"had been "+p[4],"will "+p[0],"will be "+p[4],"will have "+p[3],"will have been "+p[4],"would "+p[0],"would be "+p[4],"would have "+p[3],"would have been "+p[4]][t]}
function sen(t,s,v,x){const r=s+" "+x+" "+V[v][5]+" "+MARK[t]+".";return t>11?"He said that "+r:r[0].toUpperCase()+r.slice(1)}
// Acak beneran (Fisher-Yates). Parameter ke-2 (seed) diabaikan, biar pemanggil lama tetap jalan.
const sh=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
// Membuat soal ke-q (0-14) untuk hari d
function makeQ(d,q,off=0){const [,ts,game]=D[d-1],seed=d*15+q+off,t=ts[(q+d+off)%ts.length],v=seed%8,s=SUBJ[Math.floor(seed/8)%6];
const type=game=="mixed"?["mc","fill","order","tf","mistake","match"][q%6]:game,c=ph(t,s,v),full=sen(t,s,v,c),g=4*(t>>2);
const ds=[g,g+1,g+2,g+3,(t+4)%16,(t+8)%16].filter(x=>x!=t).map(x=>[x,ph(x,s,v)]).filter((x,i,a)=>x[1]!=c&&a.findIndex(y=>y[1]==x[1])==i).slice(0,3);
const exp="Jawaban: "+c+". "+TENSES[t][0]+" memakai rumus "+TENSES[t][1]+".";
const o={type,exp,ans:c};
if(type=="mc"){o.text="Choose the correct verb phrase:\n"+sen(t,s,v,"____");o.opts=sh([c,...ds.map(x=>x[1])],seed)}
else if(type=="fill"){o.text="Complete the sentence (verb: "+V[v][0]+"):\n"+sen(t,s,v,"____")}
else if(type=="order"){o.text="Arrange the words into a correct sentence.";o.ans=full.replace(".","");o.words=sh(o.ans.split(" "),seed);o.exp="Kalimat yang benar: "+full+" ("+TENSES[t][0]+")"}
else if(type=="tf"){const ok=seed%2==0;o.text='"'+full+'"\nThis sentence uses '+TENSES[ok?t:(t+4)%16][0]+".";o.opts=["True","False"];o.ans=ok?"True":"False";o.exp="Kalimat tersebut memakai "+TENSES[t][0]+" dengan rumus "+TENSES[t][1]+"."}
else if(type=="mistake"){o.text="Find the mistake:\n"+sen(t,s,v,ds[0][1])+"\nWhich verb phrase fixes the sentence?";o.opts=sh([c,...ds.map(x=>x[1])],seed)}
else{o.text="Which tense is used in this sentence?\n"+full;o.ans=TENSES[t][0];o.opts=sh([TENSES[t][0],...ds.map(x=>TENSES[x[0]][0])],seed);o.exp=full+" memakai "+TENSES[t][0]+" ("+TENSES[t][1]+")."}
return o}

// ===== RAKIT KUIS: soal diacak + posisi jawaban benar dibuat merata (A-D) =====
const LASTOFF={};
function buildQuiz(d){
 // geseran acak: tiap attempt dapat kalimat/kata kerja/subjek berbeda, dan dijauhkan dari attempt sebelumnya
 let off=Math.floor(Math.random()*5000);
 if(LASTOFF[d]!=null){const gap=15+Math.floor(Math.random()*19);off=LASTOFF[d]+gap+48*Math.floor(Math.random()*100)}
 LASTOFF[d]=off;
 const Q=sh(Array.from({length:15},(_,q)=>makeQ(d,q,off)));
 // soal "order": pastikan susunan kata tidak kebetulan sudah benar
 Q.forEach(o=>{if(o.type=="order"&&o.words.length>1){let t=0;while(o.words.join(" ")==o.ans&&t++<20)o.words=sh(o.words)}});
 // soal pilihan ganda (selain True/False): bagi posisi jawaban benar secara merata
 const mc=Q.filter(o=>o.opts&&o.type!="tf"),n=mc.length;let deck=[];
 for(let i=0;i<Math.floor(n/4);i++)deck.push(0,1,2,3);
 deck.push(...sh([0,1,2,3]).slice(0,n%4));
 deck=sh(deck);
 mc.forEach((o,i)=>{const others=sh(o.opts.filter(x=>x!==o.ans)),p=Math.min(deck[i],others.length);
  o.opts=[...others.slice(0,p),o.ans,...others.slice(p)]});
 return Q}
