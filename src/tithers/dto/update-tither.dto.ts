import { PartialType } from '@nestjs/mapped-types';
import { CreateTitherDto } from './create-tither.dto';

export class UpdateTitherDto extends PartialType(CreateTitherDto) {}
