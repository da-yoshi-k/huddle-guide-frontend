import dayjs from 'dayjs';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      formatDate: (inputDate: string) => {
        return dayjs(inputDate.replace(/\s\+\d{4}$/, '')).format('YYYY-MM-DD');
      },
      validDate: (inputDate: string) => {
        return dayjs(inputDate.replace(/\s\+\d{4}$/, ''));
      },
    },
  };
});
