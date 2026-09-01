export default {
  async fetch(request: Request): Promise<Response> {
    return new Response("telegram-calendar-bot: ok", { status: 200 });
  },
};
