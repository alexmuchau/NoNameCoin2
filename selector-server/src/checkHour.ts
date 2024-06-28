export async function checkHour() {
    const selectorHour = Date()
    const hour = await fetch("http://bank:3000/banco/hora").then(res => res.json()).then(res => res.date)
}