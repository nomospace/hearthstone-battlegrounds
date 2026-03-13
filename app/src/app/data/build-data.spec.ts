import { BUILD_GUIDES } from './build-data';

describe('Build Data', () => {
  it('should have builds defined', () => {
    expect(BUILD_GUIDES).toBeDefined();
    expect(BUILD_GUIDES.length).toBeGreaterThan(0);
  });

  it('should have all builds with required fields', () => {
    BUILD_GUIDES.forEach(build => {
      expect(build.id).toBeDefined();
      expect(build.name).toBeDefined();
      expect(build.tier).toBeDefined();
      expect(build.description).toBeDefined();
    });
  });

  it('should have valid tier values', () => {
    const validTiers = ['T0', 'T1', 'T2', 'T3'];
    BUILD_GUIDES.forEach(build => {
      expect(validTiers).toContain(build.tier);
    });
  });

  it('should have core cards for each build', () => {
    BUILD_GUIDES.forEach(build => {
      expect(build.coreCards).toBeDefined();
      expect(build.coreCards.length).toBeGreaterThan(0);
    });
  });

  it('should have game plan for each build', () => {
    BUILD_GUIDES.forEach(build => {
      expect(build.gamePlan).toBeDefined();
      expect(build.gamePlan.early).toBeDefined();
      expect(build.gamePlan.mid).toBeDefined();
      expect(build.gamePlan.late).toBeDefined();
    });
  });

  it('should have T0 builds', () => {
    const t0Builds = BUILD_GUIDES.filter(b => b.tier === 'T0');
    expect(t0Builds.length).toBeGreaterThan(0);
  });
});
