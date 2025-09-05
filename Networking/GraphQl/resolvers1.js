const data = {
    continents: [
      { id: "1", code: "AS", name: "Asia", countryIds: ["101", "102"] },
      { id: "2", code: "EU", name: "Europe", countryIds: ["103", "104"] },
      { id: "3", code: "AF", name: "Africa", countryIds: ["105"] }
    ],
    countries: [
      { id: "101", code: "IN", name: "India", continentId: "1", languageIds: ["201", "202"] },
      { id: "102", code: "JP", name: "Japan", continentId: "1", languageIds: ["203"] },
      { id: "103", code: "FR", name: "France", continentId: "2", languageIds: ["204"] },
      { id: "104", code: "DE", name: "Germany", continentId: "2", languageIds: ["205"] },
      { id: "105", code: "NG", name: "Nigeria", continentId: "3", languageIds: ["206", "207"] }
    ],
    languages: [
      { id: "201", code: "HI", name: "Hindi" },
      { id: "202", code: "EN", name: "English" },
      { id: "203", code: "JA", name: "Japanese" },
      { id: "204", code: "FR", name: "French" },
      { id: "205", code: "DE", name: "German" },
      { id: "206", code: "YO", name: "Yoruba" },
      { id: "207", code: "IG", name: "Igbo" }
    ]
  };

  
 export const resolvers = {
    country: {
        languages: (parent,args,context,info) =>{
            // parent.languageIds is an array like ["201", "202"]
            return data.languages.filter(lang => parent.languageIds.includes(lang.id));
        }
    },
    continent: {
        countries: (parent,args,context,info) => {
            return data.countries.filter(con => parent.countryIds.includes(con.id));
        }
    },
    language: {
        countries: (parent,args,context,info) => data.countries.filter(c => c.languageIds.includes(parent.id))
      },      
    Query: {
        continents: () => data.continents,
        countries: () => data.countries,
        languages: () => data.languages
    },
    Mutation: {
        addcontinent: (parent,args,context,info) => {
            const newcontinent = {...args, id:String(data.continents.length + 1)};
            data.continents.push(newcontinent);
            return newcontinent;
        },
        addCountry: (parent,args,context,info) => {
            const newcountries = {...args, id:String(data.countries.length + 1)};
            data.countries.push(newcountries);
            return newcountries;
        },
        addLanguage: (parent,args,context,info) => {
            const newlanguages = {...args, id:String(data.languages.length + 1)};
            data.languages.push(newlanguages);
            return newlanguages;
        },
        updateCountry: (parent, args) => {
            const index = data.countries.findIndex(c => c.id === args.id);
            if (index === -1) return null;
          
            data.countries[index] = { ...data.countries[index], ...args };
            return data.countries[index];
          },
        deleteContinent: (parent,{id}) => {
            const index = data.continents.findIndex(con => id === con.id);
            if (index === -1) return false;
            data.continents.splice(index, 1);
            return true;
        }
    }
  };

