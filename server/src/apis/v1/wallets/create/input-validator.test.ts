import td from 'testdouble'
import {
  TestUtils,
  Value,
  WalletService,
} from '../../../../global'
import { EErrorCode } from './metadata'
import { strictEqual } from 'assert'
import { InputValidator } from './input-validator'

const TEST_TITLE = TestUtils.getTestTitle(__filename)

describe(TEST_TITLE, () => {
  it('run when #WalletService free', async () => {
    await new InputValidator().validate(Value.NO_MATTER, Value.NO_MATTER)
  })

  it('does not run when #WalletService busy', async () => {
    td.replace(WalletService, 'isCreatingWallet', true)
    const error = await new InputValidator()
      .validate(Value.NO_MATTER, Value.NO_MATTER)
      .catch(error => error)

    strictEqual(error.code, EErrorCode.WALLET_CREATOR_BUSY)
  })
})
