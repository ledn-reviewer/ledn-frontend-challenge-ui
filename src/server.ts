// mirage/server.ts
import { createServer, Model } from 'miragejs';
import { find } from 'lodash';
import planets from './mockData/planets';
import users from './mockData/users';
import transactions from './mockData/transactions';

interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  id: string;
}

// interface User {
//   name: string;
//   height: string;
//   mass: string;
//   hair_color: string;
//   skin_color: string;
//   eye_color: string;
//   birth_year: string;
//   gender: string;
//   homeworld: string;
//   films: string[];
//   species: string[];
//   vehicles: string[];
//   starships: string[];
//   created: string;
//   edited: string;
//   id: string;
// }
//
// interface Transaction {
//   id: string;
//   user: number; // Assuming user reference by id
//   amount: number;
//   currency: string;
//   date: string;
//   status: string;
// }

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      planet: Model.extend<Planet[]>([]),
    },

    seeds(server) {
      planets.forEach((planet) => {
        const transactionsForPlanet: any[]  = [];
        const residents = planet.residents.map(id => {
          transactionsForPlanet.push(find(transactions, { user: id }))
          return find(users, { id });
        });

        server.create(
          'planet',
          {
            ...planet,
            residents,
            transactions: transactionsForPlanet
          }
        );
      });
    },

    routes() {
      this.namespace = 'api';

      // PLANETS
      this.get('/planets', (schema: any) => {
        const planetsData = schema.planets.all();
        return {
          planets: planetsData.models,
        };
      });

      this.get('/planets/:id', (schema: any, request) => {
        const id = request.params.id;
        const planet = schema.planets.find(id);

        if (planet) {
          return planet;
        } else {
          return {
            error: 'Planet not found',
          };
        }
      });
    },
  });

  return server;
}
