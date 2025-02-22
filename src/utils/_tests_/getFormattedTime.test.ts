import { describe, it, expect } from 'vitest';
import { getFormattedTime } from '../getFormattedTime';

describe('getFormattedTime', () => {
   it('should format 0 seconds correctly', () => {
      const result = getFormattedTime(0);
      expect(result).toEqual({ mins: 0, secs: 0, time: '00:00' });
   });

   it('should format 59 seconds correctly', () => {
      const result = getFormattedTime(59);
      expect(result).toEqual({ mins: 0, secs: 59, time: '00:59' });
   });

   it('should format 60 seconds correctly', () => {
      const result = getFormattedTime(60);
      expect(result).toEqual({ mins: 1, secs: 0, time: '01:00' });
   });

   it('should format 61 seconds correctly', () => {
      const result = getFormattedTime(61);
      expect(result).toEqual({ mins: 1, secs: 1, time: '01:01' });
   });

   it('should format 3600 seconds correctly', () => {
      const result = getFormattedTime(3600);
      expect(result).toEqual({ mins: 60, secs: 0, time: '60:00' });
   });

   it('should format 3661 seconds correctly', () => {
      const result = getFormattedTime(3661);
      expect(result).toEqual({ mins: 61, secs: 1, time: '61:01' });
   });
});