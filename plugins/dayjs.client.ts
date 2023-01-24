import dayjs from 'dayjs';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      formatDate: (inputDate: Date) => {
        return dayjs(inputDate).format('YYYY-MM-DD');
      },
    },
  };
});
