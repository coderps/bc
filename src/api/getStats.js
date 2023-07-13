import { person1, person2 } from "./getWinningPerson";

export const stats = {
  labels: ['Irene', 'Prax'],
  datasets: [
    {
      label: 'points',
      data: [12, 19],
      backgroundColor: [person1.color, person2.color],
      borderColor: [person1.color, person2.color],
      borderWidth: 1,
    },
  ],
};