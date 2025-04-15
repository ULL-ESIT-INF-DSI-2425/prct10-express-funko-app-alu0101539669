// Clase que representa un Funko Pop con sus atributos y métodos

import { Tipo, Genero } from './type.js';

/**
 * Clase Funko
 */
export class Funko {
  // Atributos privados del Funko
  private ID: number; // Identificador único del Funko
  private nombre: string; // Nombre del Funko
  private descripcion: string; // Descripción del Funko
  private tipo: Tipo; // Tipo del Funko (Pop!, Vynil, etc.)
  private genero: Genero; // Género del Funko (Animación, Deportes, etc.)
  private franquicia: string; // Franquicia a la que pertenece el Funko
  private numero: number; // Número identificativo dentro de la franquicia
  private exclusivo: boolean; // Indica si el Funko es exclusivo
  private caracteristicasEspeciales: string; // Características especiales del Funko
  private valorMercado: number; // Valor de mercado del Funko

  /**
   * Constructor de la clase Funko
   * @param nombre_ nombre del funko
   * @param descripcion_ descripcion del funko
   * @param tipo_ tipo del funko
   * @param genero_ genero del funko
   * @param franquicia_ franquicia del funko
   * @param numero_ numero del funko
   * @param exclusivo_ es exclusivo o no
   * @param caracteristicasEspeciales_ características especiales del funko
   * @param valorMercado_ valor de mercado del funko
   * @param ID_ identificador del funko
   */
  constructor(
    nombre_: string,
    descripcion_: string,
    tipo_: Tipo,
    genero_: Genero,
    franquicia_: string,
    numero_: number,
    exclusivo_: boolean,
    caracteristicasEspeciales_: string,
    valorMercado_: number,
    ID_: number
  ) {
    this.nombre = nombre_;
    this.descripcion = descripcion_;
    this.tipo = tipo_;
    this.genero = genero_;
    this.franquicia = franquicia_;
    this.numero = numero_;
    this.exclusivo = exclusivo_;
    this.caracteristicasEspeciales = caracteristicasEspeciales_;
    this.valorMercado = valorMercado_;
    this.ID = ID_;
  }

  // Métodos getter y setter para acceder y modificar los atributos del Funko
  /**
   * getter id
   */
  get getID(): number {
    return this.ID;
  }

  /**
   * setter id
   */
  set setID(ID_: number) {
    this.ID = ID_;
  }

  /**
   * getter nombre
   */
  get getNombre(): string {
    return this.nombre;
  }

  /**
   * setter nombre
   */
  set setNombre(nombre_: string) {
    this.nombre = nombre_;
  }

  /**
   * getter descripcion
   */
  get getDescripcion(): string {
    return this.descripcion;
  }

  /**
   * setter descripcion
   */
  set setDescripcion(descripcion_: string) {
    this.descripcion = descripcion_;
  }

  /**
   * getter tipo
   */
  get getTipo(): Tipo {
    return this.tipo;
  }

  /**
   * setter tipo
   */
  set setTipo(tipo_: Tipo) {
    this.tipo = tipo_;
  }

  /**
   * getter genero
   */
  get getGenero(): Genero {
    return this.genero;
  }

  /**
   * setter genero
   */
  set setGenero(genero_: Genero) {
    this.genero = genero_;
  }

  /**
   * getter franquicia
   */
  get getFranquicia(): string {
    return this.franquicia;
  }

  /**
   * setter franquicia
   */
  set setFranquicia(franquicia_: string) {
    this.franquicia = franquicia_;
  }

  /**
   * getter numero
   */
  get getNumero(): number {
    return this.numero;
  }

  /**
   * setter numero
   */
  set setNumero(numero_: number) {
    this.numero = numero_;
  }

  /**
   * getter exclusivo
   */
  get getExclusivo(): boolean {
    return this.exclusivo;
  }

  /**
   * setter exclusivo
   */
  set setExclusivo(exclusivo_: boolean) {
    this.exclusivo = exclusivo_;
  }

  /**
   * getter caracteristicas especiales
   */
  get getCaracteristicasEspeciales(): string {
    return this.caracteristicasEspeciales;
  }

  /**
   * setter caracteristicas especiales
   */
  set setCaracteristicasEspeciales(caracteristicasEspeciales_: string) {
    this.caracteristicasEspeciales = caracteristicasEspeciales_;
  }

  /**
   * getter valor mercado
   */
  get getValorMercado(): number {
    return this.valorMercado;
  }

  /**
   * setter valor mercado
   */
  set setValorMercado(valorMercado_: number) {
    this.valorMercado = valorMercado_;
  }

}