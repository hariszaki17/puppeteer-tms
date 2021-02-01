const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false, defaultViewport: null});
    const page = await browser.newPage();
    await page.goto('http://192.168.1.7:3000')
    await page.type('#inputSuccess2i', 'checker')
    await page.type('#inputWarning2i', '123456')
    await page.type('#inputWarning2i', String.fromCharCode(13));
    await page.waitForNavigation({ waitUntil: 'networkidle0' })

    let loopAll = true
    while (loopAll) {
        try {
            await page.click(`#root > div > div.c-wrapper > div > main > div > div > div.row > div > div > div.card-body > div > div > div > div > div > div.position-relative.table-responsive > table > tbody > tr:nth-child(1) > td.py-2 > button`, 2000)
        } catch (err) {
            loopAll = false
            continue
        }
        await page.waitForSelector(`#root > div > div.c-wrapper > div > main > div > div > form > div:nth-child(2) > div > div > div > div.position-relative.table-responsive > table > tbody > tr:nth-child(2)`)
        const tabelRow = await page.$eval(`#root > div > div.c-wrapper > div > main > div > div > form > div:nth-child(2) > div > div > div > div.position-relative.table-responsive > table > tbody`, (el) => {
            return el.childNodes.length
        })
        for (let i = 1; i <= tabelRow; i ++) {
            await page.click(`#root > div > div.c-wrapper > div > main > div > div > form > div:nth-child(2) > div > div > div > div.position-relative.table-responsive > table > tbody > tr:nth-child(${i}) > td:nth-child(3) > div > div > div:nth-child(1) > input`)
        }

        await page.click(`#root > div > div.c-wrapper > div > main > div > div > form > div:nth-child(2) > div > div > div > p > button.btn.btn-primary`)
        await page.waitForSelector(`#root > div > div.c-wrapper > div > main > div > div > div > div.modal.overflow-auto.fade.modal-primary.show.d-block > div > div > div > div.d-flex.flex-row.justify-content-center > p.text-success > b`)
        await page.click(`#root > div > div.c-wrapper > div > main > div > div > div > div.modal.overflow-auto.fade.modal-primary.show.d-block > div > div > footer > div > button.mr-2.btn.btn-primary`)    
        await page.waitForTimeout(3000)
    }
    
})()
