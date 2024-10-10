import { GeneratorLayout } from "@/components/layouts/generator"

import { promises as fs } from "fs"

export default async function Page() {
  const file = await fs.readFile(process.cwd() + "/src/mock/db.json", "utf8")
  const data = JSON.parse(file)

  return <GeneratorLayout file={data} />
}
