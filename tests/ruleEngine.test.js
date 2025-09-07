const runRules = require('../src/rules');
describe('Rule engine', () => {
  test('blocks if course domain mismatches user', async () => {
    const ctx = {
      user: { id: 1, domain: 'school.edu', email: 'a@school.edu' },
      course: { id: 2, domain: 'example.com', is_public: true },
      repos: { enrollmentRepo: { count: async () => 0, findOne: async () => null } }
    };
    const res = await runRules(ctx);
    expect(res.ok).toBe(false);
    expect(res.message).toMatch(/domain/);
  });

  test('blocks private course for non-@example.com', async () => {
    const ctx = {
      user: { id: 1, email: 'a@school.edu', domain: 'school.edu' },
      course: { id: 2, domain: null, is_public: false },
      repos: { enrollmentRepo: { count: async () => 0, findOne: async () => null } }
    };
    const res = await runRules(ctx);
    expect(res.ok).toBe(false);
    expect(res.message).toMatch(/@example.com/);
  });

  test('blocks duplicate enrollment for same user and course', async () => {
    const ctx = {
      user: { id: 1, email: 'a@example.com', domain: 'example.com' },
      course: { id: 2, domain: 'example.com', is_public: true },
      repos: {
        enrollmentRepo: {
          count: async () => 0,
          findOne: async () => ({ id: 1, user: { id: 1 }, course: { id: 2 } }) // Simulate existing enrollment
        }
      }
    };
    const res = await runRules(ctx);
    expect(res.ok).toBe(false);
    expect(res.message).toMatch(/already enrolled/);
  });

  test('allows enrollment when user is not already enrolled', async () => {
    const ctx = {
      user: { id: 1, email: 'a@example.com', domain: 'example.com' },
      course: { id: 2, domain: 'example.com', is_public: true },
      repos: {
        enrollmentRepo: {
          count: async () => 0,
          findOne: async () => null // No existing enrollment
        }
      }
    };
    const res = await runRules(ctx);
    expect(res.ok).toBe(true);
  });
});