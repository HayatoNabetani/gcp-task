const { setData } = require("./setData");
const playwright = require("playwright");

const getContents = async (url) => {
    const browser = await playwright.chromium.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const title = await page.innerText("title");
    await browser.close();
    return {
        url: url,
        title: title,
        now: Date.now(),
    };
};

exports.pageScraper = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { url } = JSON.parse(JSON.stringify(req.body));
            const dicData = await getContents(url);
            await setData(dicData);
            res.status(200).send("ok");
        } catch (e) {
            console.log(e);
            res.status(500).send(JSON.stringify({ e }));
        }
    }
};
