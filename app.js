
const puppeteer = require("puppeteer");
const fs = require('fs');
const { title } = require("process");
const { oauth2, oauth2_v2 } = require("googleapis/build/src/apis/oauth2");
const { auth } = require("google-auth-library");
/*
(async () => {
    
    const browser = await puppeteer.launch({headless: false,product: 'firefox'});
    var page = await browser.newPage();
    await page.goto("https://musiclab.chromeexperiments.com/Song-Maker/song/4607865541623808");
    const width=924, height=720;
    await page.setViewport( { 'width' : width, 'height' : height } );
        
    //making the song
    await page.waitForSelector('#gamepad');
    await page.click('#gamepad');
    
    await page.waitForSelector('#gamepad-return-button');

    var ran = Math.floor(Math.random() * 5);

    for(let j = 0;j < 126; j++){
        //up
        for(let i = 0;i < ran; i++){
            await page.waitForSelector('#gamepad-up-button');
            await page.hover('#gamepad-up-button');
            await page.click('#gamepad-up-button');
        };
        ran = Math.floor(Math.random() *5)+1;

        await page.click('#gamepad-return-button');
        //right
        await page.click('#gamepad-right-button');
        
        //down
        for(let i = 0;i < ran; i++){
            await page.click('#gamepad-down-button');
        };
        await page.click('#gamepad-return-button');
        ran = Math.floor(Math.random()*5)+1;
    }
    
    for(i = 0;i < ran;i++){
        await page.hover('#instrument-toggle-button');
        await page.click('#instrument-toggle-button');
    }
    for(i = 0;i < ran;i++){
        await page.hover('#percussion-toggle-button');
        await page.click('#percussion-toggle-button');
    }
    await page.evaluate( () => document.querySelector(".input-number").value = Math.round(Math.random() * 240));


    await page.hover('#save-button');
    await page.click('#save-button');
    await page.waitForSelector('#download-wav');
    await page.waitForTimeout(1000);
    await page.click("#download-wav");

    const ih = await page.evaluate(() => document.querySelector('.short-url').value);
    const nums = await ih.replace("https://musiclab.chromeexperiments.com/Song-Maker/song/","");
    const oldPath = `C:/Users/miros/Downloads/${nums}.wav`;
    const newPath = `C:/Users/miros/Documents/lukas/JS/MOS/musicFiles/${nums}.wav`;

    //moving the file
    await setTimeout(() => {
        fs.rename(oldPath, newPath, (err) => {
            if (err) throw err;
            console.log('Successfully moved!');
        });
    },10000);


    //opening new page
    await page.waitForTimeout(15000);
    const page2 = await browser.newPage();
    await page2.goto("https://www.kapwing.com/studio/editor/upload-audio");
    await page2.waitForSelector('.Upload_screenReaderOnlyLabel__3DBRg');

    try {
        const elementHandle = await page2.$("input[type=file]");
        await elementHandle.uploadFile(newPath);
    } catch (error) {
        console.log(error);
    }

    //editng the video

    await page2.waitForSelector('#canvas-container');
    await page2.hover('#canvas-container');
    await page2.click('#canvas-container');

    await page2.waitForSelector('div[data-cy="169-small-control-button"]');
    await page2.hover('div[data-cy="169-small-control-button"]');
    await page2.click('div[data-cy="169-small-control-button"]');

    await page2.waitForSelector('.UploadStatusContainer_uploadStatusMessage__iUn4w', {hidden: true});
    await page2.waitForSelector('#canvas-container');
    await page2.hover('#canvas-container');
    await page2.click('#canvas-container');

    //setting the background color
    await page2.waitForSelector('div[data-cy="ffffff-small-control-button"]');
    await page2.hover('div[data-cy="ffffff-small-control-button"]');
    await page2.click('div[data-cy="ffffff-small-control-button"]');

    await page2.waitForSelector('div[data-cy="color-B0BEC5"]');
    await page2.hover('div[data-cy="color-B0BEC5"]');
    await page2.click('div[data-cy="color-B0BEC5"]');
    
    //making the text
    await page2.waitForSelector('div[data-cy="header-text-button"]');
    await page2.hover('div[data-cy="header-text-button"]');
    await page2.click('div[data-cy="header-text-button"]');

    await page2.waitForSelector('div[data-cy="controls-tab-timing"]');
    await page2.hover('div[data-cy="controls-tab-timing"]');
    await page2.click('div[data-cy="controls-tab-timing"]');

    await page2.waitForSelector('#set-to-current-time-end');
    await page2.hover('#set-to-current-time-end');
    await page2.click('#set-to-current-time-end');

    await page2.waitForSelector('div[data-cy="controls-tab-edit"]');
    await page2.hover('div[data-cy="controls-tab-edit"]');
    await page2.click('div[data-cy="controls-tab-edit"]');

    await page2.waitForSelector('div[data-cy="big-overlay-button-edit-text"]');
    await page2.hover('div[data-cy="big-overlay-button-edit-text"]');
    await page2.click('div[data-cy="big-overlay-button-edit-text"]');


    //writing the video title text in the video
    await page2.waitForSelector('div[role="textbox"]');

    for(i = 0;i < 11;i++){
        await page2.keyboard.press('Backspace');
    }
    let letters = 'abcdefghijklmnopqrstuvwxyz0123';
    let textFin = '';
    for (let i = 0; i < 7; i++){
        if(i == 0){
            textFin += letters[Math.floor(Math.random() * letters.length)].toUpperCase();
        }else{
            textFin += letters[Math.floor(Math.random() * letters.length)];
        }
        
    }
    await page2.type('div[role="textbox"]', textFin, {delay: 20});

    //subtitles
    await page2.waitForSelector('div[data-cy="header-subtitler-button"]');
    await page2.hover('div[data-cy="header-subtitler-button"]');
    await page2.click('div[data-cy="header-subtitler-button"]');
    
    await page2.type('textarea[data-cy="subtitle-text-area"]', "made by a luke's bot", {delay: 20});

    await page2.waitForSelector('div[data-cy="subtitles-done-button"]');
    await page2.hover('div[data-cy="subtitles-done-button"]');
    await page2.click('div[data-cy="subtitles-done-button"]');

    //download the video
    await page2.waitForSelector('div[data-cy="create-button"]');
    await page2.hover('div[data-cy="create-button"]');
    await page2.click('div[data-cy="create-button"]');

    await page.waitForTimeout(40000);
    await page2.waitForSelector('a[download="Studio_Project.mp4"]');
    await page2.hover('a[download="Studio_Project.mp4"]');
    await page2.click('a[download="Studio_Project.mp4"]');
    

    const fileName = await page2.$eval('meta[property="og:video"]', el => el.getAttribute('content'));
    const fn = fileName.replace('https://cdn.kapwing.com/','');
    const oldPath2 = `C:/Users/miros/Downloads/${fn}`;
    const newPath2 = `C:/Users/miros/Documents/lukas/JS/MOS/videoFiles/${fn}`;
    
    await setTimeout(() => {
        fs.rename(oldPath2, newPath2, (err) => {
            if (err) throw err;
            console.log('Successfully moved video!');
        });
    },10000);



})();*/
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const firefoxOptions = {
    product: 'firefox',
    extraPrefsFirefox: {
        // Enable additional Firefox logging from its protocol implementation
        // 'remote.log.level': 'Trace',
    },
    // Make browser logs visible
    dumpio: true,
    };
    
    (async () => {
    const browser = await puppeteer.launch(firefoxOptions);
    
    const page = await browser.newPage();
    console.log(await browser.version());
    
    await page.goto('https://news.ycombinator.com/');
    
    // Extract articles from the page.
    const resultsSelector = '.storylink';
    const links = await page.evaluate((resultsSelector) => {
        const anchors = Array.from(document.querySelectorAll(resultsSelector));
        return anchors.map((anchor) => {
        const title = anchor.textContent.trim();
        return `${title} - ${anchor.href}`;
        });
    }, resultsSelector);
    console.log(links.join('\n'));
    
    await browser.close();
    })();



