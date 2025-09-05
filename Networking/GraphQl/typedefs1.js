export const typeDefs = `#graphql
  
  type continent {
    id: ID!
    code: String!
    name: String!
    countryIds: [ID!]!
    countries: [country]
  }

  type country {
   id: ID!
   code: String!
   name: String!
   continentId: ID!
  languageIds: [ID!]!
  languages: [language] 
  }

  type language {
   id: ID!
   code: String!
   name: String!
   countries: [country]
  }
 
  type Query {
    continents: [continent]
    countries: [country]
    languages: [language]
  }

  type Mutation {
  addcontinent(
  code: String!
    name: String!
    countryIds: [ID!]!
    ): continent!

    addCountry(code: String!
   name: String!
   continentId: ID!
  languageIds: [ID!]!): country!

  addLanguage( code: String!
   name: String!):language!

   updateCountry(
   id: ID!
   code: String
   name: String
   continentId: ID
  languageIds: [ID]):country

  deleteContinent(id: ID!): Boolean

  }

  

`;
