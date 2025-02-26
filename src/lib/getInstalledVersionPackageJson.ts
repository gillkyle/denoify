
import * as st from "scripting-tools";
import { addCache } from "../tools/addCache";
import * as path from "path";
import * as fs from "fs";

export function getInstalledVersionPackageJsonFactory(
    params: {
        projectPath: string;
    }
) {

    const { projectPath } = params;

    const getTargetModulePath = (params: { nodeModuleName: string; }) => {
        const { nodeModuleName } = params;
        return st.find_module_path(
            nodeModuleName,
            projectPath
        );
    };

    /** Throw if not installed locally */
    const getInstalledVersionPackageJson = addCache(
        async (params: { nodeModuleName: string; }): Promise<{
            version: string;
            repository?: { url: string; }
        }> => {

            const { nodeModuleName } = params;

            //NOTE: Can throw
            // node_modules/js-yaml
            const targetModulePath = getTargetModulePath({ nodeModuleName });

            return JSON.parse(
                await new Promise<string>((resolve, reject) =>
                    fs.readFile(
                        path.join(
                            targetModulePath,
                            "package.json"
                        ),
                        (err, buff) => {

                            if (err) {
                                reject(err);
                                return;
                            }

                            resolve(buff.toString("utf8"));

                        })
                )
            );

        });

    return { getInstalledVersionPackageJson };
}
