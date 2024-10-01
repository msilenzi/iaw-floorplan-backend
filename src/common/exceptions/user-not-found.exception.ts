import { HttpException, HttpStatus } from '@nestjs/common'
import { Types } from 'mongoose'

export class UserNotFoundException extends HttpException {
  constructor(userId: Types.ObjectId) {
    super(`User with ID ${userId} not found`, HttpStatus.BAD_REQUEST)
  }
}
