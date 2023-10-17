import puppeteer, { Browser, Page, PuppeteerLaunchOptions, ConnectOptions } from 'puppeteer-core';

interface LaunchBrowser extends Browser {
    createPage: (log?: boolean) => Promise<Page>;
}

export default class BrowserService {
    private _puppeteer = puppeteer;

    private browserInit(browser: Browser): LaunchBrowser {
        async function createPage() {
            const page = await browser.newPage();
            await page.evaluateOnNewDocument(() => {
                Object.defineProperty(navigator, 'languages', {
                    value: ['zh-CN', 'zh']
                });
                Object.defineProperty(navigator, 'language', {
                    value: 'zh-CN'
                });
            });
            return page;
        }

        (browser as any)['createPage'] = createPage;

        return browser as any;
    }

    public async launch(options?: PuppeteerLaunchOptions): Promise<LaunchBrowser> {
        const browser = await this._puppeteer.launch({
            defaultViewport: null,
            channel: 'chrome',
            args: [
                '--blink-settings=imagesEnabled=false',
                '–disable-gpu',
                '-–disable-dev-shm-usage',
                '-–disable-setuid-sandbox',
                '-–no-first-run',
                '--no-sandbox',
                '-–no-zygote',
                '-–single-process',
                '--disable-blink-features=AutomationControlled',
            ],
            dumpio: false,
            ...options
        });

        return this.browserInit(browser);
    }

    public get puppeteer() {
        return this._puppeteer;
    }

    public async connect(options: ConnectOptions) {
        const browser = await this._puppeteer.connect(options);
        return this.browserInit(browser);
    }
}