#!/usr/bin/env node

import * as yargs from "yargs"
import * as express from "express"
import * as http from "http"
import * as puppeteer from "puppeteer"

const app = express();

const argv = yargs
  .env('COULOIR_PDF')
  .usage("Usage: $0 [options]")
  .option("host", {
    default: "0.0.0.0",
    describe: "The host the pdf server will listen on."
  })
  .option("port", {
    default: 80,
    describe: "The port the pdf server will listen on."
  });

const { host, port } = yargs.argv;

app.get("/", async (req, res) => {
  try {
    if (!req.query.url) {
      throw new Error(`Missing url parameter`);
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(req.query.url);
    const pdf = await page.pdf();
    await browser.close();

    res.contentType("pdf").send(pdf);
  } catch (err) {
    console.error(err.toString());
    res.json({ success: false, error: err.toString() }).status(500);
  }
});

app.listen(port, host, () => {
  console.log(`Started pdf server on http://${host}:${port}`);
});
