// Importa todo lo exportado desde 'authJwt.js' como un objeto llamado 'authJwt'
import * as authJwt from "./authJwt.js";
// Importa directamente las funciones 'checkDuplicateUsernameOrEmail' y 'checkRolesExisted' desde el archivo 'verifySignUp.js'
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from "./verifySignUp.js";

// Reexporta los middlewares importados para que puedan ser accedidos fácilmente desde otros archivos
export { authJwt, checkDuplicateUsernameOrEmail, checkRolesExisted };
