const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false, defaultViewport: null});
    const page = await browser.newPage();
    await page.goto('http://192.168.1.149:3000')
    await page.type('#inputSuccess2i', 'security')
    await page.type('#inputWarning2i', '123456')
    await page.type('#inputWarning2i', String.fromCharCode(13));
    await page.waitForNavigation({ waitUntil: 'networkidle0' })
    page.on('dialog', async dialog => {
        console.log('here');
        await dialog.accept();
      });
    
    let loopAll = true
    while (loopAll) {
    let doesExist = true
        while (doesExist) {
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
                console.log(check, 'INI CHECK');
                if (check) {
                    await page.click(`${str} > td.py-2 > button`)
                    doesExist = false
                    break
                }
        
            }
            console.log(doesExist, 'INI DOES EXISTS');
            if (doesExist) {
                const isDisabled = await page.$eval('#root > div > div.c-wrapper > div > main > div > div > div.row > div.col > div > div > div.tab-content > div.tab-pane.active.fade.show > div > div > div > nav > ul > li:nth-child(8) > a', (button) => {
                    return button.getAttribute('aria-disabled');
                  });
                  console.log(isDisabled, 'HEHEHE');
                  if (isDisabled === 'false') {
                    await page.click(`#root > div > div.c-wrapper > div > main > div > div > div.row > div.col > div > div > div.tab-content > div.tab-pane.active.fade.show > div > div > div > nav > ul > li:nth-child(8) > a`)
                    await page.waitForTimeout(500)
                } else {
                    loopAll = false
                    break
                }
            }
        }
        if (!loopAll) {
            continue
        }
        await page.waitForSelector(`#root > div > div.c-wrapper > div > main > div > div > div.row > div:nth-child(2) > div.modal.overflow-auto.fade.show.d-block > div`)
        await page.waitForSelector(`#supir > option:nth-child(2)`)
        const value = await page.$eval(`#supir > option:nth-child(2)`, (el) => {
            return el.value
        })
        await page.select(`#supir`, value)
        await page.click(`#root > div > div.c-wrapper > div > main > div > div > div.row > div:nth-child(2) > div.modal.overflow-auto.fade.show.d-block > div > div > form > footer > button`)
        await page.click(`#root > div > div.c-wrapper > div > main > div > div > div.row > div:nth-child(2) > div.modal.overflow-auto.fade.show.d-block > div > div > form > footer > button`)
        await page.waitForTimeout(2000)
    }    
})()