const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false, defaultViewport: null});
    const page = await browser.newPage();
    await page.goto('http://192.168.1.149:3000')
    await page.type('#inputSuccess2i', 'security')
    await page.type('#inputWarning2i', '123456')
    await page.type('#inputWarning2i', String.fromCharCode(13));
    await page.waitForNavigation({ waitUntil: 'networkidle0' })
    let indexTr = true
    let indexErr = 1
    while (indexTr) {
        await page.type('#root > div > div.c-wrapper > div > main > div > div > div.row > div.col > div > div > div > div.tab-pane.active.fade.show > div > div > div > div:nth-child(1) > div > div.col-sm-6.form-inline.p-0 > input', 'null')
        await page.waitForTimeout(2000)
        let str = `#root > div > div.c-wrapper > div > main > div > div > div.row > div.col > div > div > div > div.tab-pane.active.fade.show > div > div > div > div.position-relative.table-responsive > table > tbody > tr:nth-child(${indexErr})`
        const tabelRow = await page.$eval(`#root > div > div.c-wrapper > div > main > div > div > div.row > div.col > div > div > div.tab-content > div.tab-pane.active.fade.show > div > div > div > div.position-relative.table-responsive > table > tbody`, element => element.childNodes.length)
        indexTr = false
        for (let i  = indexErr; i < tabelRow + 1; i++) {
            const find = await page.$eval(str, (element) => {
                let flag = false
                element.childNodes.forEach(el => {
                    el.innerHTML === 'Belum Masuk' ? flag = true : null
                })
                return flag
            })
            if (find) {
                indexTr = i
                break
            }
        }
        if (indexErr > tabelRow) {
            break
        }
        await page.click(`
        #root > div > div.c-wrapper > div > main > div > div > div.row > div.col > div > div > div.tab-content > div.tab-pane.active.fade.show > div > div > div > div.position-relative.table-responsive > table > tbody > tr:nth-child(${indexTr}) > td.py-2 > button
        `)
        // await page.waitForSelector('#root > div > div.c-wrapper > div > main > div > div > form > div:nth-child(2) > div > div > div > div.position-relative.table-responsive > table > tbody > tr:nth-child(1)')
        await page.waitForTimeout(2000)
        let locTable = `#root > div > div.c-wrapper > div > main > div > div > form > div:nth-child(2) > div > div > div > div.position-relative.table-responsive > table > tbody`
        const countTr = await page.$eval(locTable, element => element.childNodes.length)
        let notLoad = false
        for (let i = 1; i < countTr + 1; i++) {
            try {
                await page.click(`
                #root > div > div.c-wrapper > div > main > div > div > form > div:nth-child(2) > div > div > div > div.position-relative.table-responsive > table > tbody > tr:nth-child(${i}) > td:nth-child(3) > div > div > div:nth-child(1) > input`
                )
            } catch (err) {
                notLoad = true
                break
            }
        }
        if (notLoad) {
            indexErr++
            await page.click(`
            #root > div > div.c-wrapper > div > main > div > div > form > div:nth-child(2) > div > div > div > p > button.btn.btn-danger
            `)
            await page.waitForTimeout(2000)
            continue
        }
        console.log('MANTAP KAKAK');
        await page.click(`#root > div > div.c-wrapper > div > main > div > div > form > div:nth-child(2) > div > div > div > p > button.btn.btn-primary`)
        await page.waitForSelector(`#root > div > div.c-wrapper > div > main > div > div > div > div.modal.overflow-auto.fade.modal-primary.show.d-block > div > div > header > h5`)
        await page.click(`#root > div > div.c-wrapper > div > main > div > div > div > div.modal.overflow-auto.fade.modal-primary.show.d-block > div > div > footer > div > button.mr-2.btn.btn-primary`)
        await page.waitForSelector(`#root > div > div.c-wrapper > div > main > div > div > div.row > div.col > div > div > div > div.tab-pane.active.fade.show > div > div > div > div:nth-child(1) > div > div.col-sm-6.form-inline.p-0 > input`)
        if (tabelRow === 1) {
            break
        }
    }
})();