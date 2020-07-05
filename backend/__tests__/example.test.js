function soma(a, b) {
  return a + b;
}

test('should return 10', () => {
  const res = soma(5, 5);

  expect(res).toBe(10);
});
