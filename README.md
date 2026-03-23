# K2 Bistro static rebuild

This is a cleaned static rebuild of the public K2 Bistro website.

## What was fixed

- Replaced broken or non-wired call-to-action text with real links.
- Added working section anchors for About, Menu, Hours, and Contact.
- Added a working mobile menu.
- Removed the empty social-links widget.
- Improved copy, accessibility, alt text, and page structure.
- Kept French and English pages consistent.
- Added direct links for ordering, phone, and Google Maps.

## Project structure

- `index.html` — French homepage
- `index_en.html` — English homepage
- `assets/css/styles.css` — shared styles
- `assets/js/site.js` — small mobile-nav script
- `assets/img/` — local site images copied from the public site assets
- `nginx/k2bistro.conf` — sample Nginx server block

## Local preview

From the project folder, run either of these:

### Python

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

### Node (optional)

```bash
npx serve .
```

## Production setup with Nginx on Ubuntu

### 1. Install Nginx

```bash
sudo apt update
sudo apt install -y nginx
```

### 2. Copy the site to the web root

Choose a final directory, for example:

```bash
sudo mkdir -p /var/www/k2bistro
sudo cp -r ./* /var/www/k2bistro/
sudo chown -R www-data:www-data /var/www/k2bistro
```

### 3. Create the server block

Copy the sample config:

```bash
sudo cp nginx/k2bistro.conf /etc/nginx/sites-available/k2bistro
```

Edit these two lines to match your real domain:

- `server_name your-domain.com www.your-domain.com;`
- `root /var/www/k2bistro;`

### 4. Enable the site

```bash
sudo ln -s /etc/nginx/sites-available/k2bistro /etc/nginx/sites-enabled/k2bistro
sudo nginx -t
sudo systemctl reload nginx
```

### 5. Open the firewall if needed

```bash
sudo ufw allow 'Nginx Full'
```

### 6. Add HTTPS with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Domain and DNS

Point your domain's DNS `A` record to your server's public IP.
If you use `www`, add either another `A` record or a `CNAME` depending on your DNS setup.

## Notes

- The online-ordering links currently point to `k2plusbistro.ca`, which appears to be the public ordering domain connected to the restaurant. If you have a better or more current ordering URL, replace it in both HTML files.
- Update the canonical URLs in the `<head>` once you know the real production domain.
