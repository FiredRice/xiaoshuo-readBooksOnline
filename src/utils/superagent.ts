const superagent = require("superagent");
require("superagent-charset")(superagent);
import BrowserService from '../browser';
import axios from "axios";
import bookConfig from './bookConfig';

const browserService = new BrowserService();

export default (url: string, encodedType: any) => {
  return new Promise<string>(async (resolve, reject) => {
    if (bookConfig.config?.ssr) {
      const browser = await browserService.launch();
      try {
        const page = await browser.createPage();
        await page.goto(url, {
          timeout: 0,
          waitUntil: 'networkidle0'
        });
        const data = await page.content();
        await browser.close();
        resolve(data);
      } catch (err) {
        await browser.close();
        reject(new Error(err + ""));
      }
    } else {
      if (encodedType === "gbk") {
        superagent
          .get(url)
          .buffer(true)
          .charset(encodedType)
          .end((err: any, html: any) => {
            return err ? reject(new Error(err)) : resolve(html.text);
          });
      } else {
        try {
          let { data } = await axios.get(url);
          resolve(data);
        } catch (err) {
          reject(new Error(err + ""));
        }
      }
    }
  });
};
