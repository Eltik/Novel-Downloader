import dotenv from "dotenv";
dotenv.config();

import { providers } from "./mapping";
import { fetchCorsProxies } from "./helper/proxies";
import { createPDFs } from "./lib/createPDF";

fetchCorsProxies().then(async () => {
    const id = "/series/a-childhood-friend-reunited-after-10-years-acts-deredere-with-me/";
    const info = await providers.novelupdates.info(id);
    console.log(info);

    const chapters = await providers.novelupdates.fetchChapters(id);
    if (!chapters || chapters.length === 0) {
        console.log("Failed to fetch chapters");
        return;
    }

    console.log("Fetched " + chapters.length + " chapters");

    await createPDFs("novelupdates", chapters, info!).then(console.log);
});
