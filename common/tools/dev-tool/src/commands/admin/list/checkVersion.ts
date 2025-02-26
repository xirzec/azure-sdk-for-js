// import * as path from "node:path";
// import { resolveProject } from "../../../util/resolveProject";
import { run } from "../../../util/run";

/**
 * The shape of a rush.json `projects` entry.
 */
export interface RushJsonProject {
  /**
   * The name of the package.
   */
  packageName: string;
  /**
   * The path to the project, relative to the monorepo root.
   */
  projectFolder: string;

  /**
   * The version policy name.
   */
  versionPolicyName: string;
}

interface NpmInfo {
  name: string;
  "dist-tags": {
    [tag: string]: string;
  };
  versions: string[];
  time: {
    created: string;
    modified: string;
    [version: string]: string;
  };
  version: string;
  tag: string;
  deprecated?: string;
}

export default async function IdentifyPackage(
  project: RushJsonProject,
  _paths: boolean,
  _cwd: string,
  root: string,
) {
  const { projectFolder, packageName } = project;
  //const fullProjectPath = path.join(root, projectFolder);
  //const { packageJson } = await resolveProject(fullProjectPath);

  // const version = packageJson.version;
  // if (version.includes("beta")) {
  //console.log(`${packageName} has version ${version}`);
  const { output, exitCode } = await run(["npm", "info", packageName, "--json"], {
    captureOutput: true,
    captureExitCode: true,
  });

  if (exitCode === 0) {
    const parsedOutput: NpmInfo = JSON.parse(output);

    // if (parsedOutput.tag === "latest" && parsedOutput.version.includes("beta")) {
    //   const lastUpdated = new Date(parsedOutput.time[parsedOutput.version]);
    //   console.log(`${packageName} has beta version published at ${lastUpdated}`);
    // }
    if (parsedOutput.deprecated) {
      console.log(`${packageName} is deprecated`);
    }
  }
}
