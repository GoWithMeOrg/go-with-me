import { InputType, PartialType } from '@nestjs/graphql';
import { CreateLocationInput } from '@/modules/location/dto/create-location.input.js';

@InputType()
export class UpdateLocationInput extends PartialType(CreateLocationInput) {}
