export async function mockDelay(delay?: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay || 2000);
  });
}
