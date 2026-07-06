export interface BlogPostData {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  content: string; // HTML formatted string
}

export const blogPosts: BlogPostData[] = [
  {
    slug: "optimising-lcp-web-performance",
    title: "Optimising Largest Contentful Paint (LCP) in Modern Web Apps",
    description: "Practical performance tips to diagnose, resolve, and maintain Core Web Vitals to improve search engine rankings and user retention.",
    date: "July 04, 2026",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
    tags: ["Performance", "SEO", "Vite", "Web Vitals"],
    content: `
      <p>Largest Contentful Paint (LCP) is one of Google's Core Web Vitals that measures when the main content of a page has likely loaded. For developers and site owners, LCP is a critical metric for both search engine rankings (SEO) and user experience.</p>
      
      <h2>Why LCP Matters for SEO</h2>
      <p>Google explicitly uses Core Web Vitals as a ranking factor. A slow LCP indicates that users are staring at a blank screen or a loading skeleton, which correlates directly with higher bounce rates and poor index indexing performance. Optimizing LCP guarantees that search engine crawler bots register your pages as speedy and high-quality.</p>

      <h2>Common Causes of Poor LCP</h2>
      <ul>
        <li><strong>Slow server response times:</strong> Databases taking too long to return requests, or unoptimized server-side rendering pipelines.</li>
        <li><strong>Render-blocking JavaScript and CSS:</strong> Heavy scripts loading in the head block before the browser can print page content.</li>
        <li><strong>Slow resource load times:</strong> Uncompressed images, large file payloads, or images missing preload headers.</li>
      </ul>

      <h2>Actionable Performance Tips</h2>
      
      <h3>1. Preload LCP Hero Images</h3>
      <p>If your hero image is the Largest Contentful Paint candidate, tell the browser to fetch it immediately. Add a preload link tag in your document head:</p>
      <pre><code>&lt;link rel="preload" fetchpriority="high" as="image" href="/images/hero.png" /&gt;</code></pre>
      
      <h3>2. Optimise Image Assets</h3>
      <p>Never serve raw PNGs or JPEGs to production clients. Always convert hero assets to next-generation formats like <strong>WebP</strong> or <strong>AVIF</strong>, compress the size, and serve responsive widths using standard <code>srcset</code> attributes.</p>

      <h3>3. Eliminate Render-blocking assets</h3>
      <p>Ensure your build bundler splits styles and scripts into smaller chunks. Use <code>async</code> or <code>defer</code> attributes on non-critical script tags to ensure they do not delay paint stages.</p>
      
      <p>By measuring your LCP via Chrome DevTools and applying these simple optimizations, you can significantly boost your web app's speed, core vitals score, and Google SEO ranking.</p>
    `
  },
  {
    slug: "typescript-advanced-patterns",
    title: "TypeScript Advanced Patterns: Codebases at Scale",
    description: "Explore advanced utility types, mapped types, conditional assertions, and type narrowing tricks that make type-safe applications robust.",
    date: "June 28, 2026",
    readTime: "7 min read",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
    tags: ["TypeScript", "Programming", "Clean Code"],
    content: `
      <p>TypeScript has evolved far beyond standard interfaces and static type annotations. In large-scale React and Node.js codebases, utilizing advanced type patterns is essential to write self-documenting code that prevents run-time crashes.</p>

      <h2>1. Conditional Types & Infer keyword</h2>
      <p>Conditional types allow you to declare dynamic types that switch depending on checking rules. By coupling conditional types with the <code>infer</code> keyword, you can extract inner types from generic wrappers:</p>
      <pre><code>type UnwrapPromise&lt;T&gt; = T extends Promise&lt;infer U&gt; ? U : T;
type Result = UnwrapPromise&lt;Promise&lt;string&gt;&gt;; // Resolves to: string</code></pre>

      <h2>2. Mapped Types and Modifiers</h2>
      <p>Mapped types let you transform type properties. For example, if you want to create a utility that strips away read-only modifiers or makes all keys optional:</p>
      <pre><code>type Mutable&lt;T&gt; = {
  -readonly [P in keyof T]: T[P];
};</code></pre>
      <p>The <code>-readonly</code> modifier removes the read-only restriction on mapped keys, allowing mutability safely when processing clones.</p>

      <h2>3. Discriminated Unions for Clean State Management</h2>
      <p>When modeling fetch states in React, avoid separate optional flags like <code>loading: boolean, data?: Data, error?: string</code>. Instead, model them using a discriminated union:</p>
      <pre><code>type FetchState&lt;T&gt; = 
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };</code></pre>
      <p>By checking the <code>status</code> property, TypeScript narrows down the available fields in your code, preventing you from accessing data when the status is loading or error.</p>

      <p>Mastering these concepts transforms your codebase, reducing redundant checks and making refactoring a breeze.</p>
    `
  },
  {
    slug: "mastering-react-server-components",
    title: "Mastering React Server Components & Next.js Architecture",
    description: "A deep dive into the server/client component paradigm, explaining streaming, rendering lifecycles, and data-fetching patterns.",
    date: "June 15, 2026",
    readTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
    tags: ["React", "Next.js", "Architecture", "Web Dev"],
    content: `
      <p>React Server Components (RSC) represent the biggest paradigm shift in frontend development since hooks. By separating rendering tasks into server-only and client-interactive phases, RSCs deliver faster initial page loads and zero bundle-size overhead for static code libraries.</p>

      <h2>Server vs. Client Components</h2>
      <p>By default, components in Next.js App Router are <strong>Server Components</strong>. They render exclusively on the server side, meaning their import dependencies (like markdown parsers or date libraries) are not sent to the user's browser.</p>
      <p>If you need interactive features (like <code>useState</code>, <code>useEffect</code>, or event listeners), place the <code>"use client"</code> directive at the top of the file to mark it as a Client Component.</p>

      <h2>Key Architectural Advantages</h2>
      <ul>
        <li><strong>Smaller Bundle Size:</strong> Heavy server dependencies are omitted from the client bundle.</li>
        <li><strong>Direct Database Access:</strong> Fetch data directly from databases inside Server Components using async/await without building REST APIs.</li>
        <li><strong>Security:</strong> Secure backend operations like API keys and queries stay hidden on the server.</li>
      </ul>

      <h2>Data Fetching & Streaming</h2>
      <p>With RSC, you can stream content to the client using Suspense blocks. If a slow component is fetching data, Next.js can send the HTML shell first and stream the component as soon as it resolves, preventing the page load from being blocked.</p>
      
      <p>Adopting this architecture requires a shift in thinking, but the performance benefits for modern applications are massive.</p>
    `
  }
];
