export enum Action {
    READ = "READ",
    CREATE = "CREATE",
    EDIT = "EDIT",
    DELETE = "DELETE",
    BAN_USER = "BAN_USER",
}

export enum Resource {
    EVENT = "EVENT",
    TRIP = "TRIP",
    COMMENT = "COMMENT",
    USER = "USER",
    ROLE = "ROLE",
}
export type Permission = {
    actions: Action[];
    resource: Resource;
};
