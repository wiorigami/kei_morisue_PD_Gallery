const pics = await async_list()
const dic = new Map()

for (let i = 0; i < pics.length - 1; i++) {
    const l = pics[i].split("\\")
    const model = l[0]
    const pic_name = l[1]
    if (dic.has(model)) {
        dic.get(model).push(pic_name)
    } else {
        dic.set(model, [pic_name])
    }
}

const sel = document.getElementById("model")
const page = document.getElementById("page")
const max = document.getElementById("max")

for (var key of dic.keys()) {
    const op = document.createElement("option")
    op.innerHTML = key
    sel.appendChild(op)
    page.max = dic.get(key).length
    max.innerHTML = page.max
}


const img = document.getElementById("step")
const pre = "https://github.com/kei-morisue/PD-Gallery/blob/master/"
const mod = sel.value
page.max = dic.get(mod).length
max.innerHTML = page.max
page.value = 1
const names = dic.get(mod)

img.src = pre + mod + "/" + names[0] + "?raw=true"
page.onchange = (e) => {
    const model = sel.value
    const names = dic.get(model)
    img.src = pre + model + "/" + names[page.value - 1] + "?raw=true"
}

sel.onchange = (e) => {
    const m = sel.value
    page.max = dic.get(m).length
    max.innerHTML = page.max
    page.value = 1
    const names = dic.get(m)
    img.src = pre + m + "/" + names[0] + "?raw=true"
}

document.getElementById("top").onclick = () => {
    page.value = 1
    page.onchange()
}
document.getElementById("bottom").onclick = () => {
    page.value = page.max
    page.onchange()
}

document.getElementById("backk").onclick = () => {
    page.value = Math.max(1, page.value - 10)
    page.onchange()
}

document.getElementById("foww").onclick = () => {
    page.value = Math.min(page.max, 10 + Number.parseInt(page.value))
    page.onchange()


}
document.getElementById("back").onclick = () => {
    page.value = Math.max(1, page.value - 1)
    page.onchange()
}

document.getElementById("fow").onclick = () => {
    page.value = Math.min(page.max, 1 + Number.parseInt(page.value))
    page.onchange()
}

async function async_list() {
    return await fetch("pd_list.txt").then(
        responce => responce.text()
    ).then(
        d => {
            const names = d.replaceAll("\r", "").split("\n")
            names.pop()
            return names
        }
    )
}