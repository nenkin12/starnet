// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _client: any = null;

export async function getEasyPost() {
  if (!_client) {
    const apiKey = process.env.EASYPOST_API_KEY;
    if (!apiKey) {
      throw new Error("EASYPOST_API_KEY is not configured");
    }
    const { default: EasyPostClient } = await import("@easypost/api");
    _client = new EasyPostClient(apiKey);
  }
  return _client;
}
