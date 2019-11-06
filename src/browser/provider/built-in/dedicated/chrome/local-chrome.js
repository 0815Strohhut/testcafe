import browserTools from 'testcafe-browser-tools';
import { killBrowserProcess } from '../../../../../utils/process';
import BrowserStarter from '../../../utils/browser-starter';
import { buildChromeArgs } from './build-chrome-args';

const browserStarter = new BrowserStarter();

export async function start (pageUrl, { browserName, config, cdpPort, tempProfileDir, inDocker }) {
    const chromeInfo           = await browserTools.getBrowserInfo(config.path || browserName);

    console.log(JSON.stringify(chromeInfo));

    const chromeOpenParameters = Object.assign({}, chromeInfo);

    chromeOpenParameters.cmd = buildChromeArgs({ config, cdpPort, platformArgs: chromeOpenParameters.cmd, tempProfileDir, inDocker });

    console.log(chromeOpenParameters.cmd);

    await browserStarter.startBrowser(chromeOpenParameters, pageUrl);
}

export async function stop ({ browserId }) {
    // NOTE: Chrome on Linux closes only after the second SIGTERM signall
    if (!await killBrowserProcess(browserId))
        await killBrowserProcess(browserId);
}
