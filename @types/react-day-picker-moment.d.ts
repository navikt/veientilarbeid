// react-day-picker har ikke en typedef for sin addon MomentLocaleUtils. La til denne for å kunne importere fra addon.
declare module 'react-day-picker/moment' {
    export interface LocaleUtils {
        formatDay(day: Date, locale: string): string;
        formatMonthTitle(month: Date, locale: string): string;
        formatWeekdayLong(weekday: number, locale: string): string;
        formatWeekdayShort(weekday: number, locale: string): string;
        getFirstDayOfWeek(locale: string): number;
        getMonths(
            locale: string
        ): [
            string,
            string,
            string,
            string,
            string,
            string,
            string,
            string,
            string,
            string,
            string,
            string
        ];
    }
    const MomentLocaleUtils: LocaleUtils;
    export default MomentLocaleUtils;
}