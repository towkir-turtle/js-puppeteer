const puppeteer = require("puppeteer");

const searchGoogle = async (searchQuery) => {
  /* by default puppeteer launch method have headless option true */
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://www.google.com/");
  await page.type('input[aria-label="Search"]', searchQuery);
  await page.keyboard.press("Enter");

  /** waitfor while loding the page, otherwise evaulate method will get failed. */
  await page.waitFor(5000);
  const list = await page.evaluate(() => {
    let data = [];
    /** this can be changed for other website.*/
    const list = document.querySelectorAll(".LC20lb");
    for (const a of list) {
      data.push({
        title: a
          .querySelector(".LC20lb")
          .innerText.trim()
          .replace(/(\r\n|\n|\r)/gm, " "),
        link: a.querySelector("a").href,
      });
    }
    return data;
  });

  await browser.close();
};

searchGoogle();