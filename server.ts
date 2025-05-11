import { Application, Context } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use(async (ctx: Context) => {
  const username = ctx.request.url.searchParams.get("username");

  if (username) {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (res.ok) {
      const data = await res.json();
      ctx.response.body = data;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { error: "User not found" };
    }
  } else {
    ctx.response.status = 400;
    ctx.response.body = { error: "Please provide a GitHub username" };
  }
});

console.log("🚀 Server running at http://localhost:8000");
await app.listen({ port: 8000 });
