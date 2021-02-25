import parse from 'csv-parse';
import fs from 'fs'

export default async function parseCSVByLines(path: string, callback: (data: any) => Promise<void>): Promise<void> {
    const parser = fs.createReadStream(path).pipe(
        parse()
    )
    let first = true
    let keys: any[]
    for await (const record of parser) {
        if(first) {
            first = false
            keys = record
            continue;
        }
        const response: any = {}
        keys.forEach((key, index) => {
            response[key] = record[index]
        })
        await callback(response)
    }
    parser.destroy()
}