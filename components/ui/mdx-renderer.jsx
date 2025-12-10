"use client";

import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

// Komponen untuk block code
const PreBlock = ({ children }) => {
  const child = children;
  const codeString =
    typeof child.props.children === "string" ? child.props.children.trim() : "";
  let lang = "text";
  if (child.props.className) {
    const match = child.props.className.match(/language-(\w+)/);
    if (match && match[1]) {
      lang = match[1].toLowerCase();
    }
  }
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return (
    <div className="my-4 border border-default-200 rounded-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-background2 px-3 py-2 text-xs font-mono ">
        <span className="text-sm">{lang}</span>
        <button
          size="sm"
          variant="bordered"
          className="border"
          onPress={handleCopy}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      {/* Code Block */}
      <SyntaxHighlighter
        language={lang}
        style={tomorrow}
        // showLineNumbers
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "0.75rem",
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

// Komponen untuk inline code
const InlineCode = ({ children }) => (
  <code className="bg-gray-100 text-red-500 px-1 rounded">{children}</code>
);

const CustomImage = ({ src, alt, width = 800, height = 600 }) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    priority
    placeholder="blur"
    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA..."
    style={{ objectFit: "contain" }}
  />
);

// Helper buat generate ID dari teks heading
const generateId = (children) => {
  if (!children) return "";
  if (Array.isArray(children)) {
    return children
      .map((c) => (typeof c === "string" ? c : c?.props?.children || ""))
      .join(" ")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }
  return children
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

const MDXRenderer = ({ mdxContent }) => {
  const [mdxSource, setMdxSource] = useState(null);

  useEffect(() => {
    async function serializeContent() {
      const serialized = await serialize(mdxContent, {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      });
      setMdxSource(serialized);
    }
    serializeContent();
  }, [mdxContent]);

  if (!mdxSource) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 text-default-700">
      <MDXRemote
        {...mdxSource}
        components={{
          img: CustomImage,
          button: (props) => (
            <Button
              onPress={props.onPress}
              size="sm"
              variant="bordered"
              {...props}
            />
          ),
          pre: PreBlock,
          code: InlineCode,
          table: (props) => (
            <table
              className="min-w-full border border-gray-300 my-4 rounded-md"
              {...props}
            />
          ),
          thead: (props) => (
            <thead className="bg-gray-100 text-left" {...props} />
          ),
          tbody: (props) => <tbody {...props} />,
          tr: (props) => <tr className="border-b border-gray-200" {...props} />,
          th: (props) => (
            <th
              className="py-2 px-4 font-semibold text-sm text-gray-700 border-b"
              {...props}
            />
          ),
          td: (props) => (
            <td className="py-2 px-4 text-sm  border-b" {...props} />
          ),
          a: (props) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            />
          ),
          blockquote: (props) => (
            <blockquote
              className="border-l-4 border-gray-400 pl-4 italic my-4"
              {...props}
            />
          ),
          h1: (props) => {
            const id = generateId(props.children);
            return (
              <h1
                id={id}
                className="text-4xl font-extrabold mb-6 scroll-mt-24"
                {...props}
              />
            );
          },
          h2: (props) => {
            const id = generateId(props.children);
            return (
              <h2
                id={id}
                className="text-3xl font-bold my-5 scroll-mt-24"
                {...props}
              />
            );
          },
          h3: (props) => {
            const id = generateId(props.children);
            return (
              <h3
                id={id}
                className="text-2xl font-semibold my-4 scroll-mt-24"
                {...props}
              />
            );
          },
          h4: (props) => {
            const id = generateId(props.children);
            return (
              <h4
                id={id}
                className="text-xl font-medium my-3 scroll-mt-24"
                {...props}
              />
            );
          },
          h5: (props) => {
            const id = generateId(props.children);
            return (
              <h5
                id={id}
                className="text-lg font-medium my-3 scroll-mt-24"
                {...props}
              />
            );
          },
          h6: (props) => {
            const id = generateId(props.children);
            return (
              <h6
                id={id}
                className="text-base font-medium my-2 scroll-mt-24"
                {...props}
              />
            );
          },
          ul: (props) => (
            <ul className="list-disc pl-5 space-y-2 " {...props} />
          ),
          li: (props) => <li className="text-sm " {...props} />,
          Chart: (props) => (
            <div className="w-full h-96">kosong (Chart placeholder)</div>
          ),
          Gallery: (props) => (
            <div className="w-full h-96">kosong (Gallery placeholder)</div>
          ),
        }}
      />
    </div>
  );
};

export default MDXRenderer;
