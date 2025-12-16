const music = document.getElementById("music");
const nameEl = document.getElementById("name");
const modeBtn = document.getElementById("modeBtn");
const musicBtn = document.getElementById("musicBtn");

/* =========================
   TEXTO HOLOGRÁFICO + CLICK
========================= */
nameEl.addEventListener("click", ()=>{
    gsap.fromTo(nameEl,
        {rotationX:0, rotationY:0},
        {rotationX:20, rotationY:-20, yoyo:true, repeat:1, duration:0.4}
    );
});

/* =========================
   MODO ROMÁNTICO / FIESTA
========================= */
modeBtn.onclick=()=>{
    document.body.classList.toggle("fiesta");
};

/* =========================
   MÚSICA + BEAT SYNC
========================= */
let ctx, analyser, data;
musicBtn.onclick=()=>{
    if(music.paused){
        music.play();
        ctx=new AudioContext();
        const src=ctx.createMediaElementSource(music);
        analyser=ctx.createAnalyser();
        src.connect(analyser);
        analyser.connect(ctx.destination);
        data=new Uint8Array(analyser.frequencyBinCount);
        animateBeat();
    }else music.pause();
};

function animateBeat(){
    analyser.getByteFrequencyData(data);
    const avg=data.reduce((a,b)=>a+b)/data.length;
    gsap.to(nameEl,{scale:1+avg/400, duration:0.1});
    requestAnimationFrame(animateBeat);
}

/* =========================
   AURORA BOREAL CANVAS
========================= */
const c=document.getElementById("aurora");
const ctx2=c.getContext("2d");
resize();
window.onresize=resize;

function resize(){
    c.width=innerWidth;
    c.height=innerHeight;
}

let t=0;
function aurora(){
    ctx2.clearRect(0,0,c.width,c.height);
    const g=ctx2.createLinearGradient(0,0,c.width,c.height);
    g.addColorStop(0,`hsla(${t%360},100%,60%,0.3)`);
    g.addColorStop(1,`hsla(${(t+120)%360},100%,60%,0.3)`);
    ctx2.fillStyle=g;
    ctx2.fillRect(0,0,c.width,c.height);
    t+=0.5;
    requestAnimationFrame(aurora);
}
aurora();

/* =========================
   LUCES SIGUEN EL MOUSE
========================= */
document.addEventListener("mousemove",e=>{
    gsap.to(nameEl,{
        x:(e.clientX-innerWidth/2)/30,
        y:(e.clientY-innerHeight/2)/30,
        duration:0.3
    });
});
particlesJS("particles", {
    particles: {
      number: { value: 120 },
      color: { value: ["#ffffff", "#ff66cc", "#66ffff"] },
      shape: { type: "circle" },
      opacity: { value: 0.7 },
      size: { value: 2 },
      move: {
        enable: true,
        speed: 0.3,
        direction: "none",
        out_mode: "out"
      }
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: "repulse" }
      }
    },
    retina_detect: true
  });
  
   document.querySelectorAll('.balloon').forEach(balloon => {

    balloon.addEventListener('click', () => {
  
      const rect = balloon.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
  
      // CONFETI
      confetti({
        particleCount: 120,
        spread: 90,
        startVelocity: 40,
        origin: { x, y },
        colors: ['#ff4fd8', '#4fffff', '#ffe066', '#a66bff', '#ffffff']
      });
  
      // EFECTO EXPLOSIÓN
      balloon.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
      balloon.style.transform = 'scale(1.6)';
      balloon.style.opacity = '0';
  
      // OPCIONAL: eliminar globo
      setTimeout(() => {
        balloon.remove();
      }, 300);
  
    });
  
  });
  