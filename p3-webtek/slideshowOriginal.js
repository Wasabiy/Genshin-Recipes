rB = document.getElementById("rightBtn");
lB = document.getElementById("leftBtn");
fE = document.getElementById("fadeElement")

console.log("t2")
console.log(w, h, l, div)


function show(o) {
    d = document.getElementById(div);
    d.innerHTML = ""
    img = document.createElement("img");
    img.src = o.photo;
    img.setAttribute("width", w)
    img.setAttribute("height", h)
    img.alt="Artist";
    img.id="slideImg"
    d.style.opacity = "100%"

    fade()

    d.appendChild(img)
    if (o.title != ""){
        h = document.createElement("h3");
        h.innerHTML = o.title;
        h.id="slideH"
        p = document.createElement("p");
        p.innerHTML = o.body;
        p.id ="slideP"
        d.appendChild(h)
        d.appendChild(p)   
    }
    
    //animation out part


}

function slideShow() {
    show(l[0])
}

function turnRight() {
    t=true;
    index = findIndex();
    show(l[(index + 1)%(l.length)])
}

function turnLeft() {
    t=true;
    index = findIndex();
    show(l[(index + (l.length-1))%(l.length)])
}

function findIndex() {
    for (i=0; i<l.length; i++) {
        console.log(document.getElementById(div).outerHTML.split('"'))
        if (l[i].photo == document.getElementById(div).outerHTML.split('"')[5]) {
            return (i)
        }
    }
}

function fade() {
    fE.style.animation = "fade1 1s"
    fE.style.animation = "fade2 1s"
    setTimeout(fadeEmpty, 1500)
}

function fadeEmpty() {
    fE.style.animation = ""
}

fade()