document.addEventListener("DOMContentLoaded", setTimeout.bind(this, () => document.body.classList.remove("hidden"), 50));

document.querySelectorAll("h2").forEach(el => el.addEventListener("click", () => {
    window.location.hash = el.id;
    goToSection();
})
);

let pastTop = false;
function updateNav() {
    const below = (document.documentElement.scrollTop > window.innerHeight);
    const topNav = document.querySelector("nav");
    if (below) {
        if (pastTop) return;
        topNav.classList.remove("up")
        pastTop = true;
    }
    else {
        if (!pastTop) return;
        topNav.classList.add("up");
        pastTop = false;
    }
}

function goToSection() {
    if (window.location.hash == "") return;
    console.log(window.location.hash);
    const el = document.querySelector(window.location.hash);
    if (!el) return;
    el.scrollIntoView({ block: "center" });
}

document.addEventListener("scroll", updateNav);

let menuShown = false;
const menu = document.querySelector("#menu");

const hideMenu = () => {
    document.querySelector("nav").classList.remove("big");
    document.body.classList.remove("noscroll");
    menu.classList.add("fa-bars");
    menu.classList.remove("fa-xmark");
}

const showMenu = () => {
    document.querySelector("nav").classList.add("big");
    document.body.classList.add("noscroll");
    menu.classList.add("fa-xmark");
    menu.classList.remove("fa-bars");
}

menu.addEventListener("click", () => {
    if (menuShown) hideMenu();
    else showMenu();
    menuShown = !menuShown;
});

setTimeout(updateNav, 1000);

document.querySelectorAll("#menu-content a").forEach(el => el.addEventListener("click", hideMenu));

addEventListener("DOMContentLoaded", setTimeout.bind(this, goToSection, 400));
addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("a").forEach(el => {
        if (el.href.includes("#")) el.addEventListener("click", setTimeout.bind(this, goToSection, 0)); // i hate this
    });
})

const members = ["emma", "maiya", "william", "jonathan", "alex", "mateo", "jay", "yoav", "oscar", "daniel", "om"];
const names = ["Emma Li", "Maiya Qiu", "William Liu", "Jonathan Ji", "Alex Sheng", "Mateo Brody", "Jay Wang", "Yoav Hazan", "Oscar Huang", "Daniel Haiduc", "Om Mehta"];
let currentMember = 0;

function showMember() {
    document.querySelectorAll('.member-info').forEach(el => { el.classList.remove('active'); });
    document.querySelector(".member-name").innerText = names[currentMember];
    document.querySelector(`.member-info[name="${members[currentMember]}"]`).classList.add('active');
}
function decr() {
    currentMember = (currentMember - 1 + members.length) % members.length;
    showMember();
};
function incr() {
    currentMember = (currentMember + 1) % members.length;
    showMember();
}
document.getElementById('prev-member').addEventListener('click', decr);
document.getElementById('prev-member').addEventListener('keydown', e => { if (e.key == "Enter" || e.key == " ") decr(); });

document.getElementById('next-member').addEventListener('click', incr);
document.getElementById('next-member').addEventListener('keydown', e => { if (e.key == "Enter" || e.key == " ") incr(); });

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        currentMember = (currentMember - 1 + members.length) % members.length;
        showMember();
    } else if (e.key === 'ArrowRight') {
        currentMember = (currentMember + 1) % members.length;
        showMember();
    }
});

let inverseMembers = new Map();
members.forEach((name, i) => { inverseMembers.set(name, i); })

function changeMember(name) {
    currentMember = inverseMembers.get(name);
    showMember(currentMember);
    document.querySelector("#member-container h3").scrollIntoView({ "block": "center" });
}

document.querySelectorAll(".pfp-img").forEach(el => {
    const name = el.getAttribute("name");
    el.addEventListener("click", changeMember.bind(this, name));
    el.addEventListener('keydown', e => { if (e.key == "Enter" || e.key == " ") changeMember(name); });
});

function resizePfps() {
    const container = document.querySelector("#all-members");
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const width = container.clientWidth;

    // cols * tgt + (cols-1) * rem > width
    // cols * (tgt+rem) > width + rem
    // cols > width+rem
    const tgt = parseFloat(document.querySelector("#all-members").computedStyleMap().get("--tgt"));
    const cols = Math.trunc((width + rem) / ((tgt + 1) * rem));
    const leftOver = width - (cols - 1) * rem;
    container.style.setProperty("--size", `${leftOver / cols}px`);
}

window.addEventListener("resize", () => {
    resizePfps();
    setTimeout(resizePfps,500);
});
resizePfps();