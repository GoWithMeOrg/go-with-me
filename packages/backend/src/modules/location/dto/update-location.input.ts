import { CreateLocationInput } from '@/modules/location/dto/create-location.input.js';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLocationInput extends PartialType(CreateLocationInput) {}
