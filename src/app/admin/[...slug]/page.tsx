import config from "@payload-config";
import { generatePageMetadata, RootPage } from "@payloadcms/next/views";
import { importMap } from "../importMap.js";

export const generateMetadata = ({ params }: { params: Promise<{ segments: string[] }> }) =>
  generatePageMetadata({ config, params, importMap });

export default function AdminPage() {
  return <RootPage config={config} importMap={importMap} />;
}
