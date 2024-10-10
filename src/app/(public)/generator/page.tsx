import { promises as fs } from "fs"

import { GeneratorLayout } from "@/components/layouts/generator"

export default async function Page() {
  const file = await fs.readFile(process.cwd() + "/src/mock/stack.json", "utf8")
  const data = JSON.parse(file)

  return <GeneratorLayout file={data} />
}
