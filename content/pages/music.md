Title: Music
Slug: music

My main instruments are singing (bass-baritone) and the alto recorder,
and I dabble in keyboards and percussion.

I run the [Cambridge University Recorder
Ensemble](https://cure.soc.srcf.net/).

I used to direct the [Queens’ Graduate
Choir](https://www.facebook.com/QueensGradChoir) in Cambridge, with
which I still sing; and also the now-defunct Queens’ Chamber Choir, a
small group dedicated to early music. With these two groups I directed a
number of major works, some of which have been recorded. You can watch
the performances below.

I regularly perform with several other groups around Cambridge, and
elsewhere.

## Interests and research

A general early music enthusiast, I am particularly interested in
English music of the late Baroque and Regency eras. This period has
traditionally been overlooked as a lacuna in musical history,
overshadowed by Handel (1685–1759) who came before, the great Victorian
composers who came after, and the contemporaneous flourishing of music
on the Continent in the Classical and Romantic era.  Nonetheless,
composers like Thomas Arne (composer of _Rule, Britannia!_) and William
Hayes were instrumental in creating a national musical culture that
reached the common people, and it is during this period that many of the
hymns of the Anglican canon were written.

I produced the first edition of William Hayes’ *Orpheus and Euridice* in
modern notation, which saw the first modern live performance of the work
in Queens’ Chapel in 2022 (see below).

## Productions

<div id="productionsDiv" class="tabs-container"></div>

<script>
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
    label.innerText = p.title;

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
</script>

<style>
.tabs-container {
  width: 300px;
  margin: auto;
  font-family: Arial, sans-serif;
}

/* Hide radio buttons */
.tab-input {
  display: none;
}

/* Style tab labels (buttons) */
.tab-label {
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid #333;
  border-bottom: none;
  text-align: center;
  font-size: 16px;
  transition: background-color 0.3s;
}

.tab-label:hover {
  background-color: #e1e1e1;
}

/* Active tab label */
.tab-label.active {
  background-color: #666;
  border-bottom: 2px solid #007bff;
  font-weight: bold;
}
/* Tab content */
.tab-content {
  display: none;
  padding: 20px;
}

.tab-content.active {
  display: block;
}

</style>

## Compositions and arrangements

Some of my compositions will eventually become available here.

* I am working on *England Embellished*, a collection of
  traditional English melodies arranged for various vocal or
  instrumental ensembles.
* During my time as director of Queens’ Graduate Choir I wrote a number
  of arrangements of sacred music, which will become a volume *Cantica
  Reginensis*.

### Vocal works

_**Domine, quis habitabit?**_ An arrangement of Psalm 15 in the Renaissance polyphonic style for SAB trio. ([MuseScore](https://musescore.com/user/26871315/scores/6559549)) ([PDF](https://jmft.dev/wp-content/uploads/2024/01/Domine_quis_habitabit_-_J._M._F._Tsang.pdf))

### Instrumental works

**Variations on Saint Clement** Variations for piano quintet ([MuseScore](https://musescore.com/user/26871315/scores/5543990))
