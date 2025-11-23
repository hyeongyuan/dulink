import { ImageResponse } from "@takumi-rs/image-response/wasm";
import module from "@takumi-rs/wasm/next";

const fonts = [
  {
    name: "Pretendard",
    data: await fetch("https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Regular.woff2").then((res) => res.arrayBuffer()),
    weight: 400
  },
  {
    name: "Pretendard",
    data: await fetch("https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Medium.woff2").then((res) => res.arrayBuffer()),
    weight: 500
  },
  {
    name: "Pretendard",
    data: await fetch("https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-SemiBold.woff2").then((res) => res.arrayBuffer()),
    weight: 600
  },
  {
    name: "Pretendard",
    data: await fetch("https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Bold.woff2").then((res) => res.arrayBuffer()),
    weight: 700
  }
];

export const revalidate = 86400; // 24 hours

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const link = searchParams.get('link') || '';

  if (!link) {
    return new Response('Bad Request', { status: 400 });
  }
  
  const url = new URL(decodeURIComponent(link));
  const hostname = url.hostname;
  const query: Record<string, string | number> = {};
  url.searchParams.forEach((value, key) => {
    query[key] = value;
  });

  return new ImageResponse(<OgImage hostname={hostname} query={query} />, {
    width: 1200,
    height: 630,
    fonts,
    module,
    format: "png",
  });
}

interface OgImageProps {
  hostname: string;
  query: Record<string, string | number>;
}

function OgImage({ hostname, query }: OgImageProps) {
  return (
    <div
      tw="text-white w-full h-full flex justify-center flex-col px-32"
      style={{
        backgroundImage: 'linear-gradient(135deg, #3a4ca8 0%, #5b6ffb 100%)',
      }}
    >
      <h1 tw="text-8xl font-bold">
        {hostname}
      </h1>
      <ul tw="block flex flex-col items-start gap-4">
        {Object.entries(query).map(([key, value], index) => (
          <li key={key} tw="text-4xl font-medium">
            <span>{index === 0 ? '?' : '&'} {key}=</span>{value}
          </li>
        ))}
      </ul>
      <div tw="absolute bottom-4 right-20">
        <p tw="text-5xl font-bold">Dulink</p>
      </div>
    </div>
  );
}
