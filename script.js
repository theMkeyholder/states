/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
let modelData
function getData() {
  var output
  fetch("data.json").then(res => res.json()).then(json => {
    modelData = json
  })
}
getData()
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
c.width = window.innerWidth; //document.width is obsolete
c.height = window.innerHeight; //document.height is obsolete
let currentModel = "solidmodel1"
let pointer = 0
let phaseChanges = [
  {
    name: "Freezing (Liquid to Solid)",
    description: `
      When a substance's temperature is lowered to its freezing point (for water it would be 32 F or 0 C), there is not enough energy for all of the hydrogen bonds to break and reform and break and reform in order to change shape.<br>This makes a solid that stays in one shape. The density actually is lowered, since there is empty space in between the molecules as they are in a hexagonal shape. The temperature does not change DURING any phase change.
    `
  },
  {
    name: "Melting (Solid to Liquid)",
    description: `
      When the energy INCREASES while a substance is frozen, the energy, rather than making the temperature increase, makes the bonds able to break and reform and break and reform again. This increases the density for the reason I mentioned above.
    `
  },
  {
    name: "Vaporization (Liquid to Gas)",
    description: `
      When a substance is vaporized, it either evaporates or is boiled.<br>
      When a substance evaporates, the substance becomes a gas but does not make bubbles.<br>
      When a substance boils, the substance becomes a gas as well but it does make bubbles because the external pressure is less than the pressure of the molecules.<br>
      When a substance is vaporized in general, density decreases because the molecules can just float around in the container. However, the temperature does not increase (as mentioned in Freezing)
    `
  }
]
function update() {
ctx.clearRect(0, 0, c.width, c.height);

for(let i in modelData) {
  if(i != currentModel) continue
  let model = modelData[i]
  for(let j in model.objects) {
    let object = model.objects[j]
    ctx.beginPath();
    ctx.arc(object.pos[0], object.pos[1], 25, 0, 2 * Math.PI);
    ctx.fillStyle = "red"
    ctx.fill();
    ctx.beginPath();
    ctx.arc(object.pos[0]+20, object.pos[1]-25, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "white"
    ctx.fill();
    ctx.beginPath();
    ctx.arc(object.pos[0]-20, object.pos[1]-25, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "white"
    ctx.fill();
  }
  document.getElementById("text").innerHTML = `<h3>${phaseChanges[pointer].name}</h3>${phaseChanges[pointer].description}`
}
//  modelData.model1.objects[0].pos[0]++
}
window.onload = () => setInterval(update,50)

