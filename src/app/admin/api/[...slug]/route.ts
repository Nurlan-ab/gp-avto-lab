import config from "@payload-config";
import { REST_DELETE, REST_GET, REST_PATCH, REST_POST } from "@payloadcms/next/routes";
import { importMap } from "../../importMap.js";

export const GET = REST_GET(config);
export const POST = REST_POST(config);
export const PATCH = REST_PATCH(config);
export const DELETE = REST_DELETE(config);
