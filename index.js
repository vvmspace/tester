const url = 'https://www.youtube.com/watch?v=yUl4d5am5yY';

'use strict';

const puppeteer = require('puppeteer');
const axios = require('axios');
const cliProgress = require('cli-progress');
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
// start the progress bar with a total value of 200 and start value of 0

async function helloWorld() {

  const {data: {events:top}} = await axios.get('https://api.concert.moscow/api/v1/event/top').catch(e => e); 

  const browser = await puppeteer.launch({
        headless: true,
    });

    const ts = new Date().getTime();
    bar1.start(top.length);
  for (let i = 0; i < top.length; i++) {
      bar1.update(i);
      const page = await browser.newPage();
      await page.goto(`https://concert.moscow/${top[i].alias || top[i].uuid}`);
      await page.close();
  }
    await browser.close();
  bar1.stop();
  console.log((new Date() - ts/top.length));
}

helloWorld();
