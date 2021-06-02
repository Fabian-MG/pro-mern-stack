/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */
const { Kind } = require('graphql/language');
const { GraphQLScalarType } = require('graphql');

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A date type in GraphQL as a scalar',
  serialize: (value) => value.toISOString(),
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },
  parseValue: (value) => {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
});

module.exports = {
  GraphQLDate,
};
