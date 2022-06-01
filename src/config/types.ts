//definition des types pour inserifyJS
const TYPES = {
    IUserDao: Symbol.for("IUserDao"),
    IDatabase : Symbol.for("IDatabase"),
    IJoinService : Symbol.for("IJoinService"),
};

const LOAD_TYPES = {
    message: "messages",
}

const DYNAMIC_LOAD = new Map<string, Map<string,symbol>>();

export { TYPES, LOAD_TYPES, DYNAMIC_LOAD};