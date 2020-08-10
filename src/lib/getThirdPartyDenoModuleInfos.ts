
import fetch from "node-fetch";
import { addCache } from "../tools/addCache";

// https://api.deno.land/modules
// https://cdn.deno.land/evt/meta/versions.json
// https://cdn.deno.land/evt/versions/v1.6.8/meta/meta.json

/*
import * as path from "path";
import { getProjectRoot } from "../tools/getProjectRoot";

const limit= 100;

const listThirdPartyDenoModulesByPage = addCache(async (params: { page: number; }) => {

    const { page } = params;

    type Data = {
        total_count: number;
        results: { name: string; }[];
    };

    const data = await fetch(`https://api.deno.land/modules?limit=${limit}&page=${page}`)
        .then(async res => JSON.parse(await res.text())["data"] as Data)

    const { total_count, results } = data;

    return {
        total_count,
        "names": results.map(({ name }) => name)
    };

}, {
    "filePathForPersistanceAcrossRun": path.join(
        getProjectRoot(), "res", "cache", "listThirdPartyDenoModulesByPage.json"
    )
});

export async function* thirdPartyDenoModuleNames(): AsyncGenerator<string> {

    let total_count: undefined | number = undefined;

    const getLastPage = (params: { total_count: number; }) => Math.floor(params.total_count / limit) + 1;

    let page = 1;

    while (total_count === undefined || page <= getLastPage({ total_count })) {

        const result = await listThirdPartyDenoModulesByPage({ page });

        if (total_count === undefined) {
            total_count = result.total_count;
        }

        for (const name of result.names) {
            yield name;
        }

        page++;

    }

    return undefined;

}
*/

export const getThirdPartyDenoModuleInfos = addCache(
    async (params: { denoModuleName: string; }): Promise<{
        owner: string;
        repo: string;
        latestVersion: string;
        subdir: string;
    } | undefined> => {

        const { denoModuleName } = params;

        const latestVersion =
            await fetch(`https://cdn.deno.land/${denoModuleName}/meta/versions.json`)
                .then(async res =>
                    !/^2[0-9]{2}$/.test(`${res.status}`) ?
                        undefined :
                        JSON.parse(await res.text())["latest"] as string
                );

        if (latestVersion === undefined) {
            return undefined;
        }

        const infos =
            await fetch(`https://cdn.deno.land/${denoModuleName}/versions/${latestVersion}/meta/meta.json`)
                .then(async res =>
                    !/^2[0-9]{2}$/.test(`${res.status}`) ?
                        undefined :
                        JSON.parse(await res.text())["upload_options"] as { type: string; repository: string; subdir?: string; }
                );

        if (infos?.type !== "github") {
            return undefined;
        }

        if (infos.repository === undefined) {
            return undefined;
        }

        const [owner, repo] = infos.repository.split("/");

        return {
            owner,
            repo,
            latestVersion,
            "subdir": infos.subdir ?? "/"
        };

    },
    /*
    {
        "filePathForPersistanceAcrossRun": path.join(
            getProjectRoot(), "res", "cache", "getThirdPartyDenoModuleInfos.json"
        )
    }
    */
);

