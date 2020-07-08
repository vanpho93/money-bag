import { TestUtils } from '../../../../global'
import { deepEqual } from 'assert'
import { InputGetter } from './input-getter'

const TEST_TITLE = TestUtils.getTestTitle(__filename)

describe(TEST_TITLE, () => {
  it(`${TEST_TITLE} InputGetter works`, async () => {
    deepEqual(
      new InputGetter().getInput({
        query: {
          page: '1',
          limit: ' 2',
          fromTransactionId: '3 ',
        },
      }),
      { page: 1, limit: 2, fromTransactionId: 3 }
    )

    deepEqual(
      new InputGetter().getInput({ query: {} }),
      { page: 1, limit: 10, fromTransactionId: 1 }
    )

    deepEqual(
      new InputGetter().getInput({ query: { limit: 999999 } }),
      { page: 1, limit: 100, fromTransactionId: 1 }
    )
  })
})
