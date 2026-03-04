// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _client: any = null;

export async function getEasyPost() {
  if (!_client) {
    const { default: EasyPostClient } = await import("@easypost/api");
    _client = new EasyPostClient(process.env.EASYPOST_API_KEY!);
  }
  return _client;
}
