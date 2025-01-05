const productions = [
    {title: "Acis and Galatea", subtitle: "by G. F. Handel", videoTitle: "Queens&#039; Chamber Choir: Acis and Galatea", src: "https://www.youtube.com/embed/RCE619zsfw8?feature=oembed"},
    {title: "The Fairy Queen", subtitle: "by Henry Purcell", videoTitle: "Queens&#039; Graduate Choir: The Fairy Queen", src: "https://www.youtube.com/embed/AewuFJHo8xQ?feature=oembed"},
    {title: "Orpheus and Euridice", subtitle: "by William Hayes", videoTitle: "Queens&#039; Graduate Choir: Orpheus and Euridice by William Hayes", src: "https://www.youtube.com/embed/m0zhR2cyEoU?feature=oembed"},
]
const productionsDiv = document.getElementById("productionsDiv");

productions.forEach((p, i) => {
    const input = document.createElement("input");
    input.type = "radio";
    input.id = `tab${i}`;
    input.name = "tabs";
    input.classList.add("tab-input");

    const label = document.createElement("label");
    label.for = `tab${i}`;
    label.classList.add("tab-label");
    label.innerHTML = p.title;

    label.addEventListener("click", () => {

        document.querySelectorAll('.tab-label').forEach(lbl => lbl.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        label.classList.add('active');
        document.querySelector(`.tab-content[data-index="${i}"]`).classList.add('active');
    });

    productionsDiv.appendChild(input);
    productionsDiv.appendChild(label);
});

const wrapperDivs = productions.map((p, i) => {
    const wrapperDiv = document.createElement("div");
    wrapperDiv.dataset.index = i;
    wrapperDiv.classList.add("tab-content");

    const heading = document.createElement("h3");
    heading.innerHTML = `<em>${p.title}</em>`;
    wrapperDiv.appendChild(heading);
    const subtitle = document.createElement("p");
    subtitle.innerText = p.subtitle;
    wrapperDiv.appendChild(subtitle);

    const playerIframe = document.createElement("iframe");
    playerIframe.title = p.title
    playerIframe.src = p.src;
    playerIframe.width = 500;
    playerIframe.height = 281;
    playerIframe.frameBorder = "0";
    playerIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    playerIframe.referrerpolicy = "strict-origin-when-cross-origin"
    playerIframe.allowfullscreen = true;

    const figure = document.createElement("figure");
    figure.appendChild(playerIframe);

    wrapperDiv.appendChild(figure);

    return wrapperDiv;
});

wrapperDivs.forEach(div => {productionsDiv.appendChild(div);});

document.querySelectorAll('.tab-label')[0].classList.add('active');
document.querySelectorAll('.tab-content')[0].classList.add('active');
