import { Role } from "./Role";
import { Permission } from "./Permission";

const rolePremissions = {
    [Role.ADMIN]: [
        Permission.CREATE_EVENT,
        Permission.EDIT_EVENT,
        Permission.DELETE_EVENT,

        Permission.CREATE_TRIP,
        Permission.EDIT_TRIP,
        Permission.DELETE_TRIP,

        Permission.CREATE_COMMENT,
        Permission.EDIT_COMMENT,
        Permission.DELETE_COMMENT,

        Permission.BAN_USER,
        Permission.DELETE_USER,
    ],

    [Role.MODERATOR]: [
        Permission.CREATE_EVENT,
        Permission.EDIT_EVENT,
        Permission.DELETE_EVENT,
        Permission.CREATE_TRIP,
        Permission.EDIT_TRIP,
        Permission.DELETE_TRIP,
    ],

    [Role.USER]: [
        Permission.CREATE_EVENT,
        Permission.EDIT_EVENT,
        Permission.DELETE_EVENT,

        Permission.CREATE_TRIP,
        Permission.EDIT_TRIP,
        Permission.DELETE_TRIP,

        Permission.CREATE_COMMENT,
        Permission.EDIT_COMMENT,
        Permission.DELETE_COMMENT,
    ],
};
