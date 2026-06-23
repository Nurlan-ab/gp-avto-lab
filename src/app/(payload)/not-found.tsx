import config from "@payload-config";
import { NotFoundPage, generatePageMetadata } from "@payloadcms/next/views";
import { importMap } from "../admin/importMap.js";

export const generateMetadata = ({ params }: { params: Promise<{ segments: string[] }> }) =>
  generatePageMetadata({ config, params, importMap });

export default function NotFound() {
  return <NotFoundPage config={config} importMap={importMap} />;
}
