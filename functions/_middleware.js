export async function onRequest(context) {
  const url = new URL(context.request.url);
  const host = url.hostname.toLowerCase();

  if (host === "donation.ritualdev.in" && !url.pathname.startsWith("/api/") && !url.pathname.startsWith("/_next/")) {
    const target =
      url.pathname === "/" || url.pathname === "/index.html"
        ? `https://ritualdev.in/donate/${url.search}`
        : `https://ritualdev.in${url.pathname}${url.search}`;
    return Response.redirect(target, 302);
  }

  if (host === "www.ritualdev.in") {
    return Response.redirect(`https://ritualdev.in${url.pathname}${url.search}`, 301);
  }

  return context.next();
}
