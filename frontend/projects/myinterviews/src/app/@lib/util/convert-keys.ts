import * as _ from 'lodash';

type KeyConverter = (key: string) => string;

/**
 * @description walk tree
 * @param obj - Object to be converted
 * @param KeyConverter keyConverter - callback to convert the key
 */
function walk<T>(obj: T, keyConverter: KeyConverter): any {
  const x = Array.isArray(obj) ? [] : {};

  _.forOwn(obj, (value, key) => {
    if (_.isPlainObject(value) || Array.isArray(value)) value = walk(value, keyConverter);

    x[keyConverter(key)] = value;
  });

  return x;
}

/**
 * Converts all keys to camel case
 * @param obj - Object to be converted
 */
export function toCamelCase<T>(obj: object): T {
  return walk(obj, (key: string) => _.camelCase(key));
}

/**
 * Converts all keys to snake case
 * @param obj - Object to be converted
 */
export function toSnakeCase(obj: object): any {
  return walk(obj, (key: string) => _.snakeCase(key));
}
