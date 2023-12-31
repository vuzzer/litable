import fs from "fs"

export default (filename) => fs.readFileSync(`src/tests/fixtures/${filename}.json`)