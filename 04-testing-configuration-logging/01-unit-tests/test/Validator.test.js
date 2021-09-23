const expect = require('chai').expect;
const { validatorTestCase } = require('../helpers')

describe.only('testing-configuration-logging/unit-tests', () => {
  describe('Validator', () => {
    it('checks string field for min length', () => {
      const errors = validatorTestCase({ name: { type: 'string', min: 10, max: 20, }, }, { name: 'Lalala' })

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0]).to.have.property('error').and.to.be.equal('too short, expect 10, got 6');
    });

    it('checks string field for max length', () => {
      const errors = validatorTestCase({ name: { type: 'string', min: 5, max: 10, }, }, { name: 'Hello World!' })

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0]).to.have.property('error').and.to.be.equal('too long, expect 10, got 12');
    });

    it('checks string field to be of string type', () => {
      const errors = validatorTestCase({ name: { type: 'string', min: 5, max: 10, }, }, { name: 10 })

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0]).to.have.property('error').and.to.be.equal('expect string, got number');
    });

    it('checks the case with string field is valid', () => {
      const errors = validatorTestCase({ name: { type: 'string', min: 5, max: 10, }, }, { name: 'Hello!!' })
      expect(errors).to.have.length(0);
    });

    it('checks number field for min value', () => {
      const errors = validatorTestCase({ age: { type: 'number', min: 18, max: 27, }, }, { age: 10 })

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('age');
      expect(errors[0]).to.have.property('error').and.to.be.equal('too little, expect 18, got 10');
    });

    it('checks number field for max value', () => {
      const errors = validatorTestCase({ age: { type: 'number', min: 18, max: 27, }, }, { age: 30 })

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('age');
      expect(errors[0]).to.have.property('error').and.to.be.equal('too big, expect 27, got 30');
    });

    it('checks number field to be of number type', () => {
      const errors = validatorTestCase({ age: { type: 'number', min: 18, max: 27, }, }, { age: '30' })

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('age');
      expect(errors[0]).to.have.property('error').and.to.be.equal('expect number, got string');
    });

    it('checks the case with number field is valid', () => {
      const errors = validatorTestCase({ age: { type: 'number', min: 18, max: 27, }, }, { age: 22 })
      expect(errors).to.have.length(0);
    });

    it('checks several invalid fields', () => {
      const errors = validatorTestCase({ age: { type: 'number', min: 18, max: 27, }, name: { type: 'string', min: 5, max: 10, } }, { age: '30', name: 30 })
      expect(errors).to.have.length(2);
      expect(errors[0]).to.have.property('field').and.to.be.equal('age');
      expect(errors[0]).to.have.property('error').and.to.be.equal('expect number, got string');
      expect(errors[1]).to.have.property('field').and.to.be.equal('name');
      expect(errors[1]).to.have.property('error').and.to.be.equal('expect string, got number');
    });
  });
});