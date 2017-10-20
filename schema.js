const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull,
} = require('graphql')

// Hardcoded data
const customers = [
	{id: '1', name: 'John Doe', email: 'joe1@gmail.com', age: 35},
	{id: '2', name: 'John Doe1', email: 'joe2@gmail.com', age: 36},
	{id: '3', name: 'John Doe3', email: 'joe3@gmail.com', age: 37},
	{id: '4', name: 'John Doe4', email: 'joe4@gmail.com', age: 38}
]

// Customer Type
const CustomerType = new GraphQLObjectType({
	name: 'Customer',
	fields: () => ({
		id: {type: GraphQLString},
		name: {type: GraphQLString},
		email: {type: GraphQLString},
		age: {type: GraphQLInt},
	})
})

// Root Query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		customer: {
			type: CustomerType,
			args: {
				id: {type: GraphQLString}
			},
			resolv(parentValue, args) {
				for (let i=0; i<customer.length; i++) {
					if (customer[i].id == args.id) {
						return customer[i]
					}
				}
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery
})