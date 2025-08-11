import time
from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    email = f"test-{int(time.time())}@example.com"
    password = "Password123!"

    try:
        # 1. Navigate to the sign-up page
        page.goto("http://localhost:5173/signup")

        # 2. Fill out the sign-up form
        page.locator('input[id="name"]').fill("Test User")
        page.locator('input[id="email"]').fill(email)
        page.locator('input[id="password"]').fill(password)
        page.locator('input[id="confirmPassword"]').fill(password)

        # Check agreement boxes
        page.locator('label:has-text("I agree to the Terms of Service")').locator('input[type="checkbox"]').check()
        page.locator('label:has-text("I agree to the Privacy Policy")').locator('input[type="checkbox"]').check()

        # 3. Click the create account button
        create_account_button = page.locator('button:has-text("Create Account")')
        expect(create_account_button).to_be_enabled()
        create_account_button.click()

        # 4. Wait for navigation to the dashboard and then go to the home page.
        page.wait_for_url("**/dashboard", timeout=10000)
        page.goto("http://localhost:5173/")

        # 5. Wait for the page to load and the notification bell to be visible
        notification_bell = page.locator('button:has(svg.lucide-bell)')
        expect(notification_bell).to_be_visible(timeout=10000)

        # 6. Click the notification bell
        notification_bell.click()

        # 7. Wait for the dropdown to appear
        notification_dropdown = page.locator('div.absolute.right-0.mt-2')
        expect(notification_dropdown).to_be_visible()

        # 8. Take a screenshot
        page.screenshot(path="jules-scratch/verification/verification.png")

    finally:
        # 9. Close the browser
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
