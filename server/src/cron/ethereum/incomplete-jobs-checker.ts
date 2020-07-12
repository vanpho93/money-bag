import {
  BlockchainJob,
  IBlockchainJob,
} from '../../global'
import {
  TransferAllEthereumProcessor,
  IJobProcessor,
  EJobAction,
} from '../job-processor'

export class IncompleteJobsChecker {
  async checkAll() {
    const jobs = await BlockchainJob.findAll({})
    for (const job of jobs) {
      const { checker, retrier, finisher, excutor } = await this.getJobProcessor(job)
      const action = await checker.check(job)
      if (action === EJobAction.WAIT) continue
      if (action === EJobAction.RETRY) {
        await retrier.retry(job)
        continue
      }
      if (action === EJobAction.FINISH) {
        await finisher.finish(job)
        continue
      }
      if (action === EJobAction.EXCUTE) {
        await excutor.excute(job)
        continue
      }
    }
  }

  private async getJobProcessor(job: IBlockchainJob): Promise<IJobProcessor> {
    // TODO: implement
    return new TransferAllEthereumProcessor()
  }
}