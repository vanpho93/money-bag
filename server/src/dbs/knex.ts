import pg from 'pg'
import Knex from 'knex'
import {
  Env,
  EEnvKey,
  EEnviroment,
} from '../global'
import { wrapIdentifier, postProcessResponse } from './transform'

const PG_DECIMAL_OID = 1700
const PG_BIGINT_OID = 20

pg.types.setTypeParser(PG_DECIMAL_OID, parseFloat)
pg.types.setTypeParser(PG_BIGINT_OID, parseInt)

export const knex = Knex({
  client: 'postgresql',
  connection: `${Env.get(EEnvKey.DATABASE_URL)}?ssl=${process.env.PGSSLMODE === 'require'}`,
  pool: {
    min: 1,
    max: 20,
  },
  wrapIdentifier,
  postProcessResponse,
  debug: false,
})

knex.on('query', ({ sql, bindings }) => {
  if (Env.get(EEnvKey.NODE_ENV) !== EEnviroment.LOCAL) return
  const query = knex.raw(sql, bindings).toString()
  if (query.includes('select')) return
  console.log(query)
})
