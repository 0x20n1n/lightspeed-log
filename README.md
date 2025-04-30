# Lightspeed Log

A Laravel-based mini app to demonstrate automated API testing with Cypress.
Includes a POST endpoint and a test that programmatically clicks a button to verify API response behavior.

---

## Quick Start

### 1. Clone and Install Laravel
```bash
git clone https://github.com/0x20n1n/lightspeed-log.git
cd lightspeed-log
composer install
php artisan serve
```

App runs at: http://127.0.0.1:8000

### 2. Run Cypress E2E Test
```
npm install
npx cypress open
```

Then in the Cypress UI, select lightspeed-button.cy.js to run the test.

What It Does

- Serves a Laravel app with a POST endpoint (/api/v1/test-call)
- HTML button triggers the API call
- Cypress test clicks the button and logs success or error response

## Issues faced
During development, I encountered Laravel 12’s shift in route registration behavior.
- **Laravel 12 route registration:** Unlike previous versions, Laravel 12 does not automatically load `api.php` routes. I had to configure route loading explicitly via `bootstrap/app.php` and apply the appropriate `api` middleware group manually in `routes/web.php`. Verifying with `php artisan route:list` helped to confirm when Laravel actually picked up the registered path configurations.

- **419 Page Expired (CSRF) errors:** Initially caused by incorrect or missing CSRF exceptions. The first attempt used a blank `VerifyCsrfToken` class scaffolded via `php artisan make:middleware`, which lacked Laravel’s internal CSRF logic. Replacing it with the correct extended class and adding `'/api/v1/test-call'` to the `$except` array resolved it.

- **Bootstrap configuration quirks:** Laravel 12 centralizes middleware and routing configuration in `bootstrap/app.php`. Understanding and using the `withRouting()` and `withMiddleware()` methods was crucial to wire everything up properly.
