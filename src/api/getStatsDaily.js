import { person1, person2 } from './getWinningPerson';

const labels = Array.from({length: 30}, (_, i) => i +1);
const { faker } = require('@faker-js/faker');

export const dailyStats = {
  labels,
  datasets: [
    {
      label: person1.name,
      data: labels.map(() => faker.datatype.number({ min: 0, max: 30 })),
      borderColor: person1.color,
      backgroundColor: person1.color,
    },
    {
      label: person2.name,
      data: labels.map(() => faker.datatype.number({ min: 0, max: 30 })),
      borderColor: person2.color,
      backgroundColor: person2.color,
    },
  ],
};