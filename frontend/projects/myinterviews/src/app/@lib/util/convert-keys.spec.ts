import { toCamelCase, toSnakeCase } from './convert-keys';

describe('convert-keys', () => {
  describe('toCamelCase', () => {
    it('should not convert array content', () => {
      const snakeCaseArray = ['first_name', 'street_1', 'street_2'];

      const converted = toCamelCase(snakeCaseArray);

      expect(converted).toEqual(snakeCaseArray);
    });

    it('should convert object keys', () => {
      const snakeCaseObj = {
        first_name: 'First name',
        address: {
          street_1: 'Stree test 1',
          street_2: '',
        },
      };

      const converted = toCamelCase(snakeCaseObj);

      expect(converted).toEqual(
        jasmine.objectContaining({
          firstName: 'First name',
          address: {
            street1: 'Stree test 1',
            street2: '',
          },
        })
      );
    });

    it('should convert array of objects', () => {
      const listOfObjects = [{ first_name: 'First name 1' }, { first_name: 'First name 2' }];
      const expectedConvertion = [{ firstName: 'First name 1' }, { firstName: 'First name 2' }];

      const converted = toCamelCase(listOfObjects);

      expect(converted).toEqual(expectedConvertion);
    });
  });

  describe('toSnakeCase', () => {
    it('should covert object keys', () => {
      const snakeCaseObj = {
        firstName: 'First name',
        address: {
          streetName1: 'Street test 1',
          streetName2: '',
        },
      };

      const converted = toSnakeCase(snakeCaseObj);

      expect(converted).toEqual(
        jasmine.objectContaining({
          first_name: 'First name',
          address: {
            street_name_1: 'Street test 1',
            street_name_2: '',
          },
        })
      );
    });

    it('should convert array of objects', () => {
      const listOfObjects = [{ firstName: 'First name 1' }, { firstName: 'First name 2' }];
      const expectedConvertion = [{ first_name: 'First name 1' }, { first_name: 'First name 2' }];

      const converted = toSnakeCase(listOfObjects);

      expect(converted).toEqual(expectedConvertion);
    });

    it('should not convert array content', () => {
      const snakeCaseArray = ['firstName', 'street1', 'street2'];

      const converted = toSnakeCase(snakeCaseArray);

      expect(converted).toEqual(snakeCaseArray);
    });
  });
});
