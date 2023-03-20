import dayjs from 'dayjs';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      formatDate: (inputDate: string) => {
        return dayjs(inputDate.replace(/\s[-+]\d{4}$/, '')).format(
          'YYYY-MM-DD'
        );
      },
      formatDateTime: (inputDate: string) => {
        return dayjs(inputDate.replace(/\s[-+]\d{4}$/, '')).format('HH:mm:ss');
      },
      validDate: (inputDate: string) => {
        return dayjs(inputDate.replace(/\s[-+]\d{4}$/, ''));
      },
    },
  };
});
