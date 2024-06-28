import { fullNews } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";

async function getData(slug: string) {
  const query = `
      *[_type == "news" && slug.current == '${slug}'] {
          "currentSlug": slug.current,
            title,
            content,
            titleImage
        }[0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function NewsArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullNews = await getData(params.slug);

  return (
    <div className="mt-8">
      <h1>
        <span className="block text-base text-center text-primary 
        font-semibold tracking-wide uppercase">
          Digital News - WORLDWIDE NEWS
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 
        font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>
      <Image
        src={urlFor(data.titleImage).url()}
        width={800}
        height={800}
        alt="title image"
        className="rounded-lg mt-8 border"
        priority
      />
      <div className="mt-16 prose prose-blue prose-lg dark:prose-invert 
      prose-headings:underline prose-headings:2xl">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
