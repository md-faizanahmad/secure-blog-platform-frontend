<h1 align="center">Secure Blog Platform</h1>

<p align="center">
Production-ready blog platform with authentication, private dashboard, public feed, and social interactions (likes & comments).
</p>

<hr />

<h2>🚀 Live Application</h2>

<ul>
  <li><strong>Frontend:</strong> https://secure-blog-platform-frontend.vercel.app/feed</li>
  <li><strong>Backend API:</strong> https://secure-blog-platform-v1xk.onrender.com</li>
</ul>

<hr />

<h2>🏗 Tech Stack</h2>

<h3>Backend</h3>
<ul>
  <li>NestJS (latest stable)</li>
  <li>TypeScript (strict mode)</li>
  <li>PostgreSQL</li>
  <li>Prisma ORM</li>
  <li>JWT Authentication</li>
  <li>bcrypt password hashing</li>
</ul>

<h3>Frontend</h3>
<ul>
  <li>Next.js 15 (App Router)</li>
  <li>TypeScript (strict mode enabled)</li>
  <li>Native fetch API</li>
  <li>Clean architecture (no unnecessary libraries)</li>
</ul>

<hr />

<h2>📂 Frontend Architecture</h2>

<pre>
frontend/
├── app/
│   ├── login/
│   ├── register/
│   ├── dashboard/
│   ├── feed/
│   └── blog/[slug]/
│
├── components/
│   ├── BlogCard.tsx
│   ├── BlogForm.tsx
│   ├── LikeButton.tsx
│   ├── CommentList.tsx
│   └── ProtectedRoute.tsx
│
├── lib/
│   ├── api.ts
│   ├── auth.ts
│   └── types.ts
│
├── hooks/
│   └── useAuth.ts
│
├── middleware.ts
└── .env.local
</pre>

<hr />

<h2>🧠 Architectural Decisions</h2>

<h3>1️⃣ API Abstraction Layer</h3>
<ul>
  <li>Centralized in <code>lib/api.ts</code></li>
  <li>JWT injection</li>
  <li>Standardized error handling</li>
  <li>Centralized 401 handling (auto logout)</li>
  <li>Strict generic typing</li>
</ul>

<h3>2️⃣ Strict TypeScript</h3>
<ul>
  <li><code>strict: true</code></li>
  <li><code>exactOptionalPropertyTypes: true</code></li>
  <li>No <code>any</code> used</li>
  <li>All API responses explicitly typed</li>
</ul>

<h3>3️⃣ Authentication Flow</h3>
<ul>
  <li>JWT stored in localStorage</li>
  <li><code>/auth/me</code> hydrates auth state</li>
  <li>Dashboard route protected</li>
  <li>Auto logout on token expiration</li>
</ul>

<p><strong>Tradeoff:</strong> localStorage chosen for simplicity. HttpOnly cookies would improve XSS resistance in production.</p>

<h3>4️⃣ Separation of Concerns</h3>
<ul>
  <li>UI contains no business logic</li>
  <li>All data fetching isolated in <code>lib/</code></li>
  <li>Reusable components</li>
  <li>Self-contained LikeButton logic</li>
</ul>

<h3>5️⃣ Optimistic UI (Likes)</h3>
<ul>
  <li>Instant UI updates</li>
  <li>Rollback on failure</li>
  <li>No full page refetch</li>
</ul>

<h3>6️⃣ Comment System</h3>
<ul>
  <li>Fetched per blog</li>
  <li>Newest-first order</li>
  <li>No page reload</li>
  <li>Proper loading & empty states</li>
</ul>

<h3>7️⃣ Pagination</h3>
<ul>
  <li>Page-based pagination</li>
  <li>Total count handling</li>
  <li>Disabled boundary controls</li>
  <li>No unnecessary re-renders</li>
</ul>

<hr />

<h2>🔐 Security Considerations</h2>

<ul>
  <li>Password hashing (bcrypt)</li>
  <li>JWT validation</li>
  <li>Protected routes</li>
  <li>Owner-only blog modification</li>
  <li>Unique DB constraint for likes (userId + blogId)</li>
  <li>No sensitive fields exposed</li>
  <li>Proper HTTP status codes</li>
</ul>

<hr />

<h2>🧪 Functional Features Implemented</h2>

<h3>Authentication</h3>
<ul>
  <li>Register</li>
  <li>Login</li>
  <li>JWT-based session</li>
  <li>Protected dashboard</li>
</ul>

<h3>Private Dashboard</h3>
<ul>
  <li>Create / Edit / Delete blog</li>
  <li>View own blogs</li>
  <li>Form validation</li>
  <li>Loading & error states</li>
</ul>

<h3>Public Feed</h3>
<ul>
  <li>Paginated</li>
  <li>Sorted newest first</li>
  <li>Like & comment count</li>
</ul>

<h3>Like System</h3>
<ul>
  <li>Authentication required</li>
  <li>Optimistic update</li>
  <li>Duplicate prevention (DB constraint)</li>
</ul>

<h3>Comment System</h3>
<ul>
  <li>Authentication required to post</li>
  <li>Newest-first</li>
  <li>No reload</li>
</ul>

<hr />

<h2>⚖️ Tradeoffs Made</h2>

<ul>
  <li>localStorage instead of HttpOnly cookies (simpler, less secure)</li>
  <li>Blog detail page implemented as client component (could be SSR)</li>
  <li>Basic UI styling (architecture prioritized over design)</li>
  <li>No global state manager (scope small enough for local state)</li>
</ul>

<hr />

<h2>📈 How I Would Improve This</h2>

<ul>
  <li>Implement refresh tokens with rotation</li>
  <li>Move auth to HttpOnly cookies</li>
  <li>Convert feed & blog detail to server components</li>
  <li>Add skeleton loaders</li>
  <li>Add rate limiting UI feedback</li>
  <li>Add structured logging visualization</li>
  <li>Introduce caching strategy</li>
</ul>

<hr />

<h2>🚀 How I Would Scale to 1M Users</h2>

<h3>Backend Scaling</h3>
<ul>
  <li>Horizontal scaling (multiple NestJS instances)</li>
  <li>Redis for caching & rate limiting</li>
  <li>Background job queue</li>
  <li>PostgreSQL read replicas</li>
</ul>

<h3>Infrastructure</h3>
<ul>
  <li>Load balancer</li>
  <li>Autoscaling</li>
  <li>Observability (Prometheus + Grafana)</li>
  <li>Centralized logging</li>
</ul>

<hr />

<h2>🛠 Setup Instructions</h2>

<h3>1️⃣ Clone</h3>

<pre>
git clone &lt;repo-url&gt;
cd frontend
</pre>

<h3>2️⃣ Install</h3>

<pre>
npm install
</pre>

<h3>3️⃣ Environment Variables</h3>

Create:

<pre>.env.local</pre>

Add:

<pre>
NEXT_PUBLIC_API_URL=https://secure-blog-platform-v1xk.onrender.com
</pre>

<h3>4️⃣ Run</h3>

<pre>
npm run dev
</pre>

Visit:

<pre>http://localhost:3000</pre>

<hr />

<h2>🎯 Evaluation Alignment</h2>

<p>
This implementation prioritizes clean architecture, strict typing, security practices,
separation of concerns, optimistic UX, and production-aware design decisions.
</p>

<p>
The focus was correctness and scalability over visual polish, aligned with assignment expectations.
</p>
