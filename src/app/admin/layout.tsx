import config from "@payload-config";
import { RootLayout } from "@payloadcms/next/layouts";
import "@payloadcms/next/css";

export { generatePageMetadata } from "@payloadcms/next/metadata";

export default function PayloadRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayout config={config}>{children}</RootLayout>;
}
