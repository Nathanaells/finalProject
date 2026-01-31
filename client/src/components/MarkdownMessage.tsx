import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

interface MarkdownMessageProps {
  content: string;
  className?: string;
}

export default function MarkdownMessage({
  content,
  className = "",
}: MarkdownMessageProps) {
  const components: Components = {
    // Headings
    h1: ({ children }) => (
      <h1 className="text-2xl font-bold mb-3 mt-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-bold mb-2 mt-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-bold mb-2 mt-2">{children}</h3>
    ),

    // Paragraphs
    p: ({ children }) => <p className="mb-3 leading-relaxed">{children}</p>,

    // Strong (bold)
    strong: ({ children }) => (
      <strong className="font-bold text-blue-600">{children}</strong>
    ),

    // Lists
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-3 space-y-1 ml-4">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-3 space-y-1 ml-4">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed">
        <span className="ml-2">{children}</span>
      </li>
    ),

    // Code
    code: ({ children, className }) => {
      const isInline = !className;
      return isInline ? (
        <code className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      ) : (
        <code className="block bg-gray-800 text-green-400 p-3 rounded-lg overflow-x-auto text-sm font-mono my-2">
          {children}
        </code>
      );
    },

    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-3 text-gray-600">
        {children}
      </blockquote>
    ),

    // Links
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        {children}
      </a>
    ),
  };

  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
}
