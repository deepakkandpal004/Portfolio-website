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
    slug: "auth-from-scratch-scrypt-jwt-refresh-tokens",
    title: "Auth From Scratch: scrypt, Short-Lived JWTs and Rotating Refresh Tokens",
    description: "Why I skipped the auth library for my URL shortener — and how scrypt hashing, 15-minute access tokens and rotating refresh tokens in HttpOnly cookies actually work.",
    date: "September 26, 2026",
    readTime: "8 min read",
    coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=60",
    tags: ["Auth", "Node.js", "Security", "JWT"],
    content: `
      <p>For my URL shortener Trim, I made a deliberate decision: no auth library. Not because libraries are bad — but because auth is one of those things every developer uses and few truly understand. Here's what building it from scratch taught me.</p>

      <h2>1. Hashing passwords with scrypt</h2>
      <p>Most tutorials reach for bcrypt. It's fine — but Node.js ships <code>scrypt</code> in the <code>crypto</code> module, and it's memory-hard by design, which makes GPU-based brute forcing much more expensive:</p>
      <pre><code>import { scrypt, randomBytes, timingSafeEqual } from "node:crypto";

function hashPassword(password: string): Promise&lt;string&gt; {
  return new Promise((resolve, reject) =&gt; {
    const salt = randomBytes(16).toString("hex");
    scrypt(password, salt, 64, (err, derived) =&gt; {
      if (err) reject(err);
      else resolve(salt + ":" + derived.toString("hex"));
    });
  });
}</code></pre>
      <p>Two details matter: a unique random salt per user (so rainbow tables are useless), and <code>timingSafeEqual</code> when comparing hashes (so attackers can't measure response times to guess the hash byte-by-byte).</p>

      <h2>2. Short-lived access tokens</h2>
      <p>The access JWT lives for 15 minutes. That's it. If a token leaks — via logs, a compromised tab, anything — its blast radius is a quarter of an hour, not a month. The JWT carries only the user id and nothing sensitive.</p>

      <h2>3. Rotating refresh tokens in HttpOnly cookies</h2>
      <p>This is the part most tutorials skip. The refresh token lives in an HttpOnly, Secure, SameSite cookie — JavaScript can never read it, which kills XSS theft. And it <strong>rotates</strong>: every time you use a refresh token, the server verifies it, deletes it, and issues a brand-new pair.</p>
      <p>Why rotation? Theft detection. If an attacker steals a refresh token and uses it, the legitimate user's copy stops working — the server sees a reused token and can invalidate the whole session family. That reuse signal is something non-rotating tokens can never give you.</p>
      <pre><code>// refresh flow (simplified)
const stored = await db.refreshToken.findUnique({ where: { hash } });
if (!stored) throw new Error("reuse detected - kill all sessions");
await db.refreshToken.delete({ where: { hash } }); // one-time use
const next = createRefreshToken(userId);
await db.refreshToken.create({ data: { hash: sha256(next), userId } });
setCookie(res, "refresh", next, { httpOnly: true, secure: true, sameSite: "strict" });</code></pre>
      <p>Note the tokens are stored hashed (SHA-256) — a database leak shouldn't hand out live sessions.</p>

      <h2>What I'd do differently</h2>
      <p>For a client project with deadlines, I'd still reach for a battle-tested library. But building it once from scratch means I now read auth code with understanding instead of trust. That's worth a weekend.</p>
    `
  },
  {
    slug: "prisma-query-optimization-dashboard",
    title: "3 Prisma Query Fixes That Made My Dashboard Actually Fast",
    description: "Composite indexes, select over include, and cursor pagination — the three changes that took my expense tracker dashboard from sluggish to instant.",
    date: "September 20, 2026",
    readTime: "7 min read",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    tags: ["Prisma", "PostgreSQL", "Performance"],
    content: `
      <p>Finora's dashboard was fine with 50 transactions. At 2,000, it felt broken. Three Prisma changes fixed it — no caching layer, no rewrite.</p>

      <h2>1. A composite index that matches the query</h2>
      <p>Every dashboard query looked like this: <em>this user's transactions, newest first, in a date range.</em> Without an index, PostgreSQL scans the whole table. The fix is one line in the Prisma schema:</p>
      <pre><code>model Transaction {
  id        String   @id @default(cuid())
  userId    String
  date      DateTime
  amount    Decimal
  // ...
  @@index([userId, date(sort: Desc)])
}</code></pre>
      <p>Column order matters: <code>userId</code> first because every query filters by user (equality), then <code>date</code> descending because every query sorts by it. An index on <code>(date, userId)</code> would be nearly useless here. Verify with <code>EXPLAIN ANALYZE</code> — look for "Index Scan" instead of "Seq Scan".</p>

      <h2>2. select instead of include</h2>
      <p>My dashboard cards needed four fields. I was fetching entire rows plus relations:</p>
      <pre><code>// before: fetches everything, including the category relation
const txs = await prisma.transaction.findMany({ where, include: { category: true } });

// after: fetches exactly what the UI renders
const txs = await prisma.transaction.findMany({
  where,
  select: { id: true, amount: true, date: true, category: { select: { name: true } } },
});</code></pre>
      <p>Less data over the wire, less memory, faster serialization. Boring — and effective.</p>

      <h2>3. Cursor pagination for infinite lists</h2>
      <p>Offset pagination (<code>skip: page * 20</code>) gets slower the deeper you go — the database still walks every skipped row. Cursor pagination doesn't:</p>
      <pre><code>const txs = await prisma.transaction.findMany({
  where,
  take: 20,
  ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
  orderBy: { date: "desc" },
});</code></pre>
      <p>Each page starts exactly where the last one ended. Constant-time pages, no matter how far you scroll.</p>

      <p>The lesson: performance work is mostly about matching the database to the query pattern. Indexes, projections, pagination — in that order.</p>
    `
  },
  {
    slug: "ats-friendly-resume-pdf-generation",
    title: "Making Resume PDFs That Survive ATS Parsers",
    description: "What I learned building CareerForge: why most generated PDFs fail applicant tracking systems, and how structured data plus clean PDF generation fixes it.",
    date: "September 12, 2026",
    readTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=60",
    tags: ["PDF", "AI", "CareerForge"],
    content: `
      <p>Building CareerForge taught me an uncomfortable truth: a beautiful resume that an ATS can't parse is a resume that doesn't exist. Here's what actually matters.</p>

      <h2>1. Why PDFs break parsers</h2>
      <p>Most ATS parsers don't "see" your resume — they extract the text layer and guess the reading order. PDFs commonly break this three ways:</p>
      <ul>
        <li><strong>Text rendered as vector paths or images</strong> — looks perfect, extracts as nothing.</li>
        <li><strong>Multi-column layouts</strong> — the parser reads across columns: "Senior Engineer 2024 React Company".</li>
        <li><strong>Tables and text boxes</strong> — reading order becomes unpredictable.</li>
      </ul>

      <h2>2. Structured data first, PDF second</h2>
      <p>The fix that worked in CareerForge: never treat the PDF as the source of truth. The resume lives as structured JSON — name, title, experience array, skills array — and the PDF is just a render target:</p>
      <ul>
        <li>Single-column layout, standard section headings ("Experience", "Education", "Skills").</li>
        <li>Real selectable text — no rasterized sections, no text-as-image.</li>
        <li>Standard fonts, chronological order, dates in the same text flow.</li>
      </ul>
      <p>Because the data is structured, the ATS score checker can do exact keyword matching against a job description — the same structured data powers both the PDF and the score.</p>

      <h2>3. Scoring honestly</h2>
      <p>Our ATS score is deliberately simple: keyword coverage from the job description, weighted by section (skills and titles weigh more than summaries), plus checks for contact info, quantifiable achievements and standard headings. It's an estimate, not a guarantee — and the UI says so. A score that cries wolf trains users to ignore it.</p>

      <p>The takeaway: design for the parser first, the human second. The human only ever sees the resumes the parser let through.</p>
    `
  },
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
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60",
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
    coverImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60",
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
