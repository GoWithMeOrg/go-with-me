import dayjs from 'dayjs';

// Поле time приходит строкой "HH:mm", которую dayjs не разбирает
// без явной даты — подставляем фиктивную.
const TIME_ONLY = /^\d{2}:\d{2}(:\d{2})?$/;

export const formatDate = (date: Date | string | undefined, format: string): string => {
    if (!date) return '';

    const value = typeof date === 'string' && TIME_ONLY.test(date) ? `1970-01-01T${date}` : date;

    return dayjs(value).format(format);
};
