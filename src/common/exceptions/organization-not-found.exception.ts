import { HttpException, HttpStatus } from '@nestjs/common'
import { Types } from 'mongoose'

export class OrganizationNotFoundException extends HttpException {
  constructor(organizationId: Types.ObjectId) {
    super(
      `Organization with ID ${organizationId} not found`,
      HttpStatus.BAD_REQUEST
    )
  }
}
