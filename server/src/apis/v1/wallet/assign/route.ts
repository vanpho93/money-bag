import { body } from 'express-validator'
import { EMethod, createService, OnlyPartnerRoute } from '../../../shared'
import { ApiExcutor } from './api-excutor'
import { InputGetter } from './input-getter'
import { InputValidator } from './input-validator'

export class Route extends OnlyPartnerRoute {
  path = '/api/v1/wallets/assign'
  method = EMethod.POST
  Service = createService(InputGetter, InputValidator, ApiExcutor)
  getMidlewares() {
    return super.getMidlewares().concat([
      body('quantity').isInt().exists(),
      body('partnerId').isInt().exists(),
    ])
  }
}
