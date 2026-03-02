/**
 * @summary Each DTO should implement from this Base
 */
export interface BaseDTO<T> {
  /**
   * @summary Maps json into DTO
   * @param json
   */
  parseJson(json: string): T;
}
