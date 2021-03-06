/**
 * Sulfur backend
 * El login exitoso de AuthService devuelve un Usuario con un campo \"token\". Dicho token se debe incluir como header de las llamadas del resto de las operaciones de cada servicio.
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { TipoMaterial } from './TipoMaterial';

export class TipoMaterialImp implements TipoMaterial {
    id?: number;

    familia: string;

    grupo: string;

    subgrupo: string;

    descripcion: string;

    public constructor(tm: TipoMaterial) {
        this.id = tm.id;
        this.familia = tm.familia;
        this.grupo = tm.grupo;
        this.subgrupo = tm.subgrupo;
        this.descripcion = tm.descripcion;
    }
}
