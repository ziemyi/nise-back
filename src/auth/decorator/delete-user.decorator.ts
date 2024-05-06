import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const DeletePaciente = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) =>{
        const request: Express.Request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);