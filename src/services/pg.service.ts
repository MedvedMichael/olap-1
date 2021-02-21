import { Pool, QueryResult } from 'pg'

export class PgService {
    private pool: Pool = new Pool()

    async useQuery(request: string, values?: any): Promise<QueryResult> {
        return this.pool.query(request, values)
    }

    async stop() {
        await this.pool.end()
    }

}


export default async function useDatabaseQuery(request: string, values?: any) {
    const pgService = new PgService()
    await pgService.useQuery(request, values)
    await pgService.stop()
}

export async function useManyDatabaseQuery(requests: string[]) {
    const pgService = new PgService()
    await Promise.all(requests.map(request => pgService.useQuery(request)))
    await pgService.stop()
}