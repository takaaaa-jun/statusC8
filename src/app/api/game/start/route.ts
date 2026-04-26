export async function GET() {
    return Response.json({ message: "GET start ok" });
}

export async function POST(request: Request) {
    return Response.json({ message: "POST start ok" });
}