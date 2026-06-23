import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    {
      slug: "users",
      auth: true,
      admin: {
        useAsTitle: "email",
      },
      fields: [
        {
          name: "role",
          type: "select",
          options: ["admin", "editor"],
          defaultValue: "editor",
          required: true,
        },
      ],
    },
    {
      slug: "news",
      admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "status", "createdAt"],
      },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "excerpt", type: "textarea", required: true },
        { name: "content", type: "richText", editor: lexicalEditor() },
        { name: "image", type: "upload", relationTo: "media" },
        {
          name: "status",
          type: "select",
          options: ["draft", "published"],
          defaultValue: "draft",
          required: true,
        },
      ],
    },
    {
      slug: "media",
      upload: {
        staticDir: path.resolve(dirname, "../../public/media"),
        mimeTypes: ["image/*", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
      },
      fields: [
        { name: "alt", type: "text" },
      ],
    },
    {
      slug: "documents",
      admin: { useAsTitle: "title" },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "category", type: "select", options: ["laws", "trts", "gost", "eek"], required: true },
        { name: "file", type: "upload", relationTo: "media" },
        { name: "description", type: "textarea" },
        { name: "publishedDate", type: "date", admin: { date: { pickerAppearance: "dayOnly" } } },
      ],
    },
    {
      slug: "laboratories",
      admin: { useAsTitle: "name" },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "address", type: "text", required: true },
        { name: "phone", type: "text" },
        { name: "hours", type: "text" },
        { name: "latitude", type: "number" },
        { name: "longitude", type: "number" },
      ],
    },
    {
      slug: "services",
      admin: { useAsTitle: "title" },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "richText", editor: lexicalEditor() },
        { name: "icon", type: "select", options: ["filecheck", "clipboard", "wrench", "messagecircle"] },
        { name: "price", type: "text" },
        { name: "order", type: "number", defaultValue: 0 },
      ],
    },
    {
      slug: "faq",
      admin: { useAsTitle: "question" },
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "richText", editor: lexicalEditor(), required: true },
        { name: "order", type: "number", defaultValue: 0 },
      ],
    },
    {
      slug: "feedback",
      admin: { useAsTitle: "name", defaultColumns: ["name", "email", "createdAt"] },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "email", type: "email", required: true },
        { name: "message", type: "textarea", required: true },
        { name: "phone", type: "text" },
        { name: "status", type: "select", options: ["new", "read", "replied"], defaultValue: "new" },
      ],
    },
  ],
  db: sqliteAdapter({
    client: {
      url: "file:./payload.db",
    },
  }),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
