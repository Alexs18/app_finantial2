import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { MOVEMENT_DTO } from 'src/models/movemnt.dto';
import { MovementService } from 'src/services/movement/movement.service';

@Controller('movement')
@UseGuards(AuthGuard)
export class MovementController {

    constructor(private readonly _movementService:MovementService){}
    @Post('/insertmovement')
    createmovemente(
        @Body() body:MOVEMENT_DTO
    ){
        return this._movementService.createmovement(body)
    }



}
