/**
 * Sulfur backend
 * El login exitoso de AuthService devuelve un Usuario con un campo \"token\". Dicho token se debe incluir como header de las llamadas del resto de las operaciones de cada servicio.
 *
 * OpenAPI spec version: 1.0-SNAPSHOT
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as models from './models';

export interface Registro {
    id?: number;

    minutos: number;

    fecha: string;

    borrado?: number;

    usuario?: models.Usuario;

    tarea: models.Tarea;

    rubro?: models.Rubro;

}
