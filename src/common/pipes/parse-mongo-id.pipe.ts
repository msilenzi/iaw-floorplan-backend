import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { isValidObjectId, Types } from 'mongoose'

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string): Types.ObjectId {
    if (isValidObjectId(value)) return new Types.ObjectId(value)
    throw new BadRequestException('Invalid ID format')
  }
}
