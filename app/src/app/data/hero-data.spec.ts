import { HEROES } from './hero-data';

describe('Hero Data', () => {
  it('should have heroes defined', () => {
    expect(HEROES).toBeDefined();
    expect(HEROES.length).toBeGreaterThan(0);
  });

  it('should have all heroes with required fields', () => {
    HEROES.forEach(hero => {
      expect(hero.id).toBeDefined();
      expect(hero.name).toBeDefined();
      expect(hero.tier).toBeDefined();
      expect(hero.winRate).toBeDefined();
    });
  });

  it('should have valid tier values', () => {
    const validTiers = ['T0', 'T1', 'T2', 'T3'];
    HEROES.forEach(hero => {
      expect(validTiers).toContain(hero.tier);
    });
  });

  it('should have winRate between 0 and 100', () => {
    HEROES.forEach(hero => {
      expect(hero.winRate).toBeGreaterThanOrEqual(0);
      expect(hero.winRate).toBeLessThanOrEqual(100);
    });
  });

  it('should have T0 heroes', () => {
    const t0Heroes = HEROES.filter(h => h.tier === 'T0');
    expect(t0Heroes.length).toBeGreaterThan(0);
  });
});
