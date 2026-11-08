// ===== STATE & PENYIMPANAN (localStorage) =====
const KEY="e30",app=document.getElementById("app");
let st;try{st=JSON.parse(localStorage.getItem(KEY))}catch(e){}
st=st||{done:{},best:{},hist:[],started:{}};
const save=()=>localStorage.setItem(KEY,JSON.stringify(st));
const nDone=()=>Object.keys(st.done).length;
const cur=()=>{for(let d=1;d<=30;d++)if(!st.done[d])return d;return 30};
const total=()=>Object.values(st.best).reduce((a,b)=>a+b,0);
// Status hari: sequential unlock
const status=d=>st.done[d]?"completed":(d>1&&!st.done[d-1])?"locked":st.started[d]?"in-progress":"available";
const go=x=>location.hash=x,h=x=>app.innerHTML=x,esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");
const bar=p=>`<div class="bar"><i style="width:${p}%"></i></div>`;
const stat=(a,b)=>`<div class="card"><small>${a}</small><b class="big">${b}</b></div>`;
const norm=s=>s.toLowerCase().replace(/\s+/g," ").trim();

// ===== HALAMAN =====
function home(){h(`<section class="hero"><h1>Master English Grammar in 30 Days</h1><p>Learn English tenses step by step through simple lessons, interactive quizzes, and daily challenges.</p><button class="btn" onclick="go('#/day/'+cur())">Start Learning</button></section>
<section class="wrap"><h2>Program Introduction</h2><p>Satu hari satu pelajaran, lalu 15 soal latihan. Hari berikutnya terbuka setelah kamu menyelesaikan kuis hari ini. Kita mulai dari 12 tenses pertama, baru lanjut ke kelompok Past Future yang lebih jarang dipakai dalam percakapan sehari-hari.</p>
<h2>What You Will Learn</h2><div class="grid">${["16 English Tenses","Grammar Fundamentals","Sentence Structure","Practical Examples","Interactive Practice"].map(x=>`<div class="card"><b>${x}</b></div>`).join("")}</div>
<h2>Learning Journey</h2><div class="grid">${[["Days 1-7","Present Tenses"],["Days 8-13","Past Tenses"],["Days 14-19","Future Tenses"],["Days 20-25","Past Future Tenses"],["Days 26-30","Mixed Practice and Final Exam"]].map(x=>`<div class="card"><small>${x[0]}</small><b>${x[1]}</b></div>`).join("")}</div></section>`)}

function program(){const c=cur();h(`<section class="wrap"><h1>Welcome back</h1><p class="muted">Lanjutkan belajar dari Day ${c}.</p>
<div class="grid">${stat("Progress",(nDone()/30*100).toFixed(2)+"%")}${stat("Completed Days",nDone()+"/30")}${stat("Remaining Days",30-nDone())}${stat("Total Quiz Score",total())}${stat("Current Day",c)}</div>${bar(nDone()/30*100)}
<h2>30-Day Roadmap</h2><div class="grid">${D.map((x,i)=>{const d=i+1,s=status(d);return `<button class="card day ${s}" ${s=="locked"?"disabled":""} onclick="go('#/day/${d}')"><small>Day ${d} - ${s.replace("-"," ")}</small><b>${x[0]}</b>${st.best[d]!=null?`<em>Best score ${st.best[d]}</em>`:""}</button>`}).join("")}</div></section>`)}

// Halaman materi harian
function lesson(d){if(status(d)=="locked")return go("#/program");if(!st.started[d]){st.started[d]=1;save()}
const [title,ts]=D[d-1],L=ts.map(t=>TENSES[t]),big=ts.length>4;
const intro=d==1?"Tenses adalah bentuk kata kerja yang menunjukkan kapan suatu kejadian terjadi. Ada 4 waktu (Present, Past, Future, Past Future), masing-masing punya 4 bentuk: Simple, Continuous, Perfect, Perfect Continuous. Total ada 16 tenses.":ts.length==1?`${L[0][0]} dipakai untuk ${L[0][4]}`:"Hari ini kita membandingkan dan melatih: "+L.map(x=>x[0]).join(", ")+".";
const obj=big?["Membedakan tenses lewat rumus dan situasinya","Memilih tense yang tepat dalam kalimat"]:L.map(x=>`Memahami kapan ${x[0]} dipakai dan rumusnya`).concat(["Mengenali bentuk kalimatnya lewat contoh"]);
h(`<section class="wrap narrow"><small class="muted">Day ${d} of 30 - ${GAME[D[d-1][2]]}</small><h1>${title}</h1><p>${intro}</p>
<h3>Learning Objectives</h3><ul>${obj.map(x=>`<li>${x}</li>`).join("")}</ul>
<h3>Formula, Examples, and Situations</h3>${big?`<div class="tw"><table><tr><th>Tense</th><th>Rumus</th><th>Contoh</th></tr>${L.map(x=>`<tr><td>${x[0]}</td><td>${x[1]}</td><td>${x[2]}<br><small>${x[3]}</small></td></tr>`).join("")}</table></div>`:L.map(x=>`<div class="card"><b>${x[0]}</b><p>Rumus: <code>${x[1]}</code></p><p><i>${x[2]}</i><br>${x[3]}</p><p>Dipakai untuk ${x[4]}</p></div>`).join("")}
<h3>Learning Tips</h3><ul><li>Simple: kebiasaan, fakta, atau kejadian tunggal</li><li>Continuous: sedang berlangsung (-ing)</li><li>Perfect: sudah selesai (V3)</li><li>Perfect Continuous: sudah berlangsung selama... (been + -ing)</li>${ts.some(t=>t>11)?"<li>Tenses ke-13 sampai 16 jarang muncul dalam percakapan sehari-hari, jadi fokuslah dulu pada 12 tenses pertama.</li>":""}</ul>
<h3>Summary</h3><ul>${L.map(x=>`<li>${x[0]}: ${x[1]}</li>`).join("")}</ul>
<button class="btn" onclick="go('#/quiz/${d}')">Start Quiz</button><button class="btn alt" onclick="go('#/program')">Back to Roadmap</button></section>`)}

// ===== KUIS =====
let Z=null;
function quiz(d){if(status(d)=="locked")return go("#/program");st.started[d]=1;save();
Z={d,i:0,res:[],sub:false,pick:"",used:[],Q:Array.from({length:15},(_,q)=>makeQ(d,q))};drawQ()}
function drawQ(){const q=Z.Q[Z.i],last=Z.i==14,r=Z.res[Z.i];let ui="";
if(q.type=="order")ui=`<div class="slot">${Z.used.map((k,p)=>`<button class="chip on" ${Z.sub?"disabled":""} onclick="rm(${p})">${q.words[k]}</button>`).join("")||"<span class='muted'>Tap the words below</span>"}</div>${q.words.map((w,k)=>`<button class="chip" ${Z.sub||Z.used.includes(k)?"disabled":""} onclick="add(${k})">${w}</button>`).join("")}${Z.sub?"":`<br><button class="btn alt" onclick="Z.used=[];drawQ()">Clear</button>`}`;
else if(q.type=="fill")ui=`<input class="inp" ${Z.sub?"disabled":""} value="${esc(Z.pick)}" oninput="Z.pick=this.value" placeholder="Type your answer">`;
else ui=q.opts.map((o,k)=>`<button class="opt ${Z.sub?(o==q.ans?"ok":o==Z.pick?"bad":""):(o==Z.pick?"sel":"")}" onclick="pk(${k})">${o}</button>`).join("");
h(`<section class="wrap narrow"><small class="muted">Day ${Z.d} - ${GAME[D[Z.d-1][2]]}</small><h2>Question ${Z.i+1}/15</h2>${bar((Z.i+(Z.sub?1:0))/15*100)}<p class="qtext">${esc(q.text)}</p>${ui}
${Z.sub?`<div class="fb ${r.ok?"ok":"bad"}"><b>${r.ok?"Correct!":"Incorrect."}</b> Correct answer: ${q.ans}<br>${q.exp}</div><button class="btn" onclick="nextQ()">${last?"Finish":"Next"}</button>`:`<button class="btn" onclick="submitA()">Check Answer</button>`}</section>`)}
const pk=k=>{if(!Z.sub){Z.pick=Z.Q[Z.i].opts[k];drawQ()}};
const add=k=>{if(!Z.sub){Z.used.push(k);drawQ()}},rm=p=>{if(!Z.sub){Z.used.splice(p,1);drawQ()}};
// Cek jawaban (hanya sekali per soal)
function submitA(){if(Z.sub)return;const q=Z.Q[Z.i],a=q.type=="order"?Z.used.map(k=>q.words[k]).join(" "):Z.pick;
if(!a.trim()){alert("Pilih atau isi jawabanmu dulu.");return}
Z.sub=true;Z.res.push({q,a,ok:norm(a)==norm(q.ans)});drawQ()}
function nextQ(){if(!Z.sub)return;Z.i++;Z.sub=false;Z.pick="";Z.used=[];Z.i==15?finish():drawQ()}
// Selesai: hitung skor, simpan, buka hari berikutnya
function finish(){const ok=Z.res.filter(x=>x.ok).length,score=Math.round(ok/15*100);Z.ok=ok;Z.score=score;
st.hist.push({d:Z.d,score});st.best[Z.d]=Math.max(st.best[Z.d]||0,score);st.done[Z.d]=true;save();result()}
function result(){const d=Z.d;h(`<section class="wrap narrow"><h1>Quiz Completed</h1><div class="grid">${stat("Correct",Z.ok)}${stat("Incorrect",15-Z.ok)}${stat("Score",Z.score+"/100")}</div>
<p>${d==30?"Selamat, kamu menyelesaikan seluruh program 30 hari!":"Kerja bagus! Day "+(d+1)+" sekarang terbuka."}</p>
<button class="btn alt" onclick="review()">Review Answers</button><button class="btn alt" onclick="quiz(${d})">Retry Quiz</button><button class="btn" onclick="go('${d<30?"#/day/"+(d+1):"#/progress"}')">${d<30?"Continue to Next Day":"See My Progress"}</button></section>`)}
function review(){h(`<section class="wrap narrow"><h1>Review Answers</h1>${Z.res.map((r,i)=>`<div class="card"><small>Question ${i+1}</small><p class="qtext">${esc(r.q.text)}</p><div class="fb ${r.ok?"ok":"bad"}">Your answer: ${esc(r.a)}<br>Correct answer: ${r.q.ans}<br>${r.q.exp}</div></div>`).join("")}<button class="btn" onclick="result()">Back to Result</button></section>`)}

// ===== PROGRESS, ACHIEVEMENT, RESET =====
function progress(){const H=st.hist,avg=H.length?Math.round(H.reduce((a,x)=>a+x.score,0)/H.length):0,best=H.length?Math.max(...H.map(x=>x.score)):0;
h(`<section class="wrap"><h1>My Progress</h1><div class="grid">${stat("Overall Progress",(nDone()/30*100).toFixed(2)+"%")}${stat("Completed Days",nDone()+"/30")}${stat("Current Day",cur())}${stat("Total Attempts",H.length)}${stat("Average Score",avg)}${stat("Best Score",best)}</div>${bar(nDone()/30*100)}
<h2>Score History</h2><div class="tw"><table><tr><th>Day</th><th>Lesson</th><th>Best</th><th>Attempts</th></tr>${D.map((x,i)=>`<tr><td>${i+1}</td><td>${x[0]}</td><td>${st.best[i+1]??"-"}</td><td>${H.filter(y=>y.d==i+1).length}</td></tr>`).join("")}</table></div>
<p><button class="btn danger" onclick="resetAll()">Reset Progress</button></p></section>`)}
function resetAll(){if(confirm("Yakin mau menghapus semua progres? Tindakan ini tidak bisa dibatalkan.")){st={done:{},best:{},hist:[],started:{}};save();progress()}}
const ACH=[["First Lesson Completed","Selesaikan 1 hari",()=>nDone()>=1],["First Quiz Completed","Selesaikan 1 kuis",()=>st.hist.length>=1],["7-Day Learner","Selesaikan 7 hari",()=>nDone()>=7],["15-Day Learner","Selesaikan 15 hari",()=>nDone()>=15],["30-Day English Master","Selesaikan 30 hari",()=>nDone()>=30]];
function ach(){h(`<section class="wrap narrow"><h1>Achievements</h1>${ACH.map(a=>{const g=a[2]();return `<div class="card ach ${g?"got":""}"><b>${a[0]}</b><small>${a[1]} - ${g?"Unlocked":"Locked"}</small></div>`}).join("")}</section>`)}

// ===== ROUTER =====
const ok=d=>d>=1&&d<=30;
function route(){const [,p,n]=(location.hash||"#/home").split("/"),d=+n;
document.querySelectorAll("nav a").forEach(a=>a.classList.toggle("act",a.getAttribute("href")=="#/"+p));scrollTo(0,0);
({home,program,progress,ach,day:()=>ok(d)?lesson(d):go("#/program"),quiz:()=>ok(d)?quiz(d):go("#/program")}[p]||home)()}
addEventListener("hashchange",route);route();
