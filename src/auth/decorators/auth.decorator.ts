import { applyDecorators, UseGuards } from "@nestjs/common";
import { ValidRoles } from "../interfaces/role.interface";
import { AuthGuard } from "@nestjs/passport";
import { RoleProtected } from "./role-protected/role-protected.decorator";
import { UserRoleGuard } from "../guards/user-role.guard";


export function Auth(...roles: ValidRoles[]) {

    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), UserRoleGuard )
    )


}