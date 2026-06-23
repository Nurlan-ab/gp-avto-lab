import { generateImportMap } from "@payloadcms/next/utilities";
import config from "@payload-config";

const importMap = generateImportMap(config);
export { importMap };
