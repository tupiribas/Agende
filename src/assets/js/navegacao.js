function navegarEntreAsPaginas(url, seletorDestino, push = true) {
    if (!url || !seletorDestino) return // Devem ser preenchidos
    const elemento = document.querySelector(seletorDestino)
    fetch(url)
        .then(resp => resp.text())
        .then(html => {
            elemento.innerHTML = html
            // Adiciona o link do navegador ao histórico da página
            if (push) history.pushState({ seletorDestino }, null, url)
        })
}

document.querySelectorAll('[tg-link]').forEach(link => {
    const url = link.attributes['tg-link'].value
    const seletorDestino = link.attributes['tg-destino'].value

    link.onclick = e => {
        if (e.popstate) {
            navegarEntreAsPaginas(window.location.href, e.state.seletor)
        }
    }
})