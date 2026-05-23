import asyncio
from fastapi import FastAPI, HTTPException
from playwright.async_api import async_playwright
from playwright_stealth import stealth
import uvicorn

app = FastAPI(title="Vortex Stealth Scraper")

async def scrape_site(url: str, selector: str):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Browser Fingerprinting Stealth: Create a context with a realistic user agent
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            viewport={'width': 1280, 'height': 800}
        )
        page = await context.new_page()
        # Apply stealth plugin to mask playwright fingerprint
        stealth(page)

        
        try:
            await page.goto(url, wait_until="networkidle", timeout=60000)
            # Basic content extraction
            content = await page.content()
            # Wait for specific content if selector is provided
            if selector:
                await page.wait_for_selector(selector, timeout=10000)
            
            # Simple extraction: Get all text from body or specific selector
            text = await page.inner_text(selector or "body")
            await browser.close()
            return text
        except Exception as e:
            await browser.close()
            raise e

@app.get("/scrape/reddit")
async def scrape_reddit(q: str):
    url = f"https://www.reddit.com/r/SaaS/search/?q={q}&sort=new"
    try:
        # On Reddit, we look for post containers
        text = await scrape_site(url, "main")
        return {"platform": "reddit", "data": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/scrape/twitter")
async def scrape_twitter(q: str):
    # Twitter usually requires login for search, but sometimes nitter or public search works
    # For a hackathon/MVP, public search or a guest token approach is better
    # Here we'll try a public search approach or a placeholder
    url = f"https://twitter.com/search?q={q}&src=typed_query&f=live"
    try:
        text = await scrape_site(url, "div[data-testid='cellInnerDiv']")
        return {"platform": "twitter", "data": text}
    except Exception as e:
        # If Twitter is blocked (highly likely), return a descriptive error or mock for demo
        return {"platform": "twitter", "data": f"Scrape failed (likely auth required): {str(e)}", "status": "blocked"}

@app.get("/scrape/linkedin")
async def scrape_linkedin(q: str):
    # LinkedIn is very aggressive. We'll use a public search URL
    url = f"https://www.google.com/search?q=site:linkedin.com+{q}"
    try:
        text = await scrape_site(url, "#search")
        return {"platform": "linkedin", "data": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
