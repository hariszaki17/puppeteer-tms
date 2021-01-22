const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false, defaultViewport: null});
    const page = await browser.newPage();
    await page.goto('http://localhost:3000')
    await page.type('#inputSuccess2i', 'security')
    await page.type('#inputWarning2i', '123456')
    await page.type('#inputWarning2i', String.fromCharCode(13));
    await page.waitForNavigation({ waitUntil: 'networkidle0' })
    const tabelRow = await page.$eval(`#root > div > div.c-wrapper > div > main > div > div > div.row > div.col > div > div > div.tab-content > div.tab-pane.active.fade.show > div > div > div > div.position-relative.table-responsive > table > tbody`, element => element.childNodes.length)
    
    for (let i = 1; i < tabelRow + 1; i++) {
        let str = `#root > div > div.c-wrapper > div > main > div > div > div.row > div.col > div > div > div > div.tab-pane.active.fade.show > div > div > div > div.position-relative.table-responsive > table > tbody > tr:nth-child(${i})`
        const check = await page.$eval(str, (el) => {
            let checkText = el.childNodes[el.childNodes.length - 1].childNodes[0].innerHTML
            if (checkText === 'assign') {
                return true
            } else {
                return false
            }
        })

        if (check) {
            await page.click(`${str} > td.py-2 > button`)
            break
        }

    }

})()