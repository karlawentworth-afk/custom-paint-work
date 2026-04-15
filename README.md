# Custom Paint Works

Single-page marketing site for Custom Paint Works — classic vehicle restoration & custom paint.

**Tagline:** *We bring old classics back to life with precision paint work.*

## Files

```
custom-paint-works/
├── index.html      # markup + structure
├── styles.css      # aged-parchment / deep-red aesthetic
├── main.js         # smooth scroll + form handler (Supabase placeholder)
└── README.md
```

Plain HTML/CSS/JS — no build step, no frameworks.

## Running locally

Just open `index.html` in a browser, or serve the folder:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then visit http://localhost:8000.

## Next step: Supabase

Open `main.js` and find the block labeled:

```js
// SUPABASE CONNECTION GOES HERE
```

Replace the simulated submit with the real Supabase client call, and add the Supabase JS library to `index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

You'll need a `quote_requests` table with columns: `name`, `email`, `phone`, `message`, `created_at`.

---

## Deploying to Netlify via GitHub

### 1. Push the project to GitHub

From inside the `custom-paint-works` folder:

```bash
git init
git add .
git commit -m "Initial commit — Custom Paint Works site"
git branch -M main
git remote add origin https://github.com/<your-username>/custom-paint-works.git
git push -u origin main
```

(Create the empty repo on github.com first, without a README, so the push isn't rejected.)

### 2. Connect Netlify

1. Sign in at [app.netlify.com](https://app.netlify.com).
2. Click **Add new site → Import an existing project**.
3. Choose **GitHub** and authorize Netlify.
4. Pick the `custom-paint-works` repository.
5. Build settings — leave them blank/defaults:
   - **Build command:** *(leave empty)*
   - **Publish directory:** `.` (the repo root)
6. Click **Deploy site**.

Netlify assigns a random `*.netlify.app` URL immediately. You can rename it in **Site settings → Change site name**, or connect a custom domain under **Domain management**.

### 3. Continuous deploys

Every `git push` to `main` re-deploys automatically. No further action needed.

### 4. Environment variables (for Supabase)

When you wire up Supabase:

1. In Netlify → **Site settings → Environment variables**.
2. Add `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
3. Reference them in `main.js` (or inject via a small build step / Netlify function).

> ⚠️ The anon key is safe to expose on the client *only* if your Supabase Row Level Security policies restrict the `quote_requests` table to `insert` only.

---

## Credits

- Fonts: [Oswald](https://fonts.google.com/specimen/Oswald) & [Lato](https://fonts.google.com/specimen/Lato) (Google Fonts)
- Placeholder imagery: [Unsplash](https://unsplash.com)
