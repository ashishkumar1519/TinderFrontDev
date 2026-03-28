# DevTinder

- Create a Vite + React application
- Remove unnecessary code and create a Hello World app
- Install Tailwind CSS
- Install Daisy UI
- Add NavBar component to App.jsx
- Create a NavBar.jsx separate Component file
- Install react router dom

Body

- NavBar
- Route=/  -> Feed
- Route=/login  -> Login
- Route=/connections  -> Connections
- Route=/profile  -> Profile

## Installation

```bash
npm install
```

## Running Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

## Deployment

### Prerequisites
- AWS Account
- EC2 instance access
- SSH key pair (.pem file)
- Node.js 16.17.0 or higher installed on your server

### Deployment Steps

1. **Sign up on AWS**
   - Create an AWS account and sign in to AWS Console

2. **Launch EC2 Instance**
   - Go to EC2 Dashboard
   - Click "Launch Instances"
   - Select Ubuntu 20.04 LTS AMI
   - Choose t2.micro or appropriate instance type
   - Complete the instance launch process

3. **Setup SSH Key**
   ```bash
   chmod 400 <secret>.pem
   ```
   - Replace `<secret>` with your actual key pair name

4. **Connect to Your Instance**
   ```bash
   ssh -i "devTinder-secret.pem" ubuntu@<your-ec2-public-ip>
   ```
   - Replace `<your-ec2-public-ip>` with your instance's public IP address

5. **Install Node.js**
   ```bash
   curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt-get install -y nodejs
   node --version  # Verify installation
   ```

6. **Clone Repository**
   ```bash
   git clone <your-repository-url>
   cd devtinderFrontEnd
   ```

7. **Install Dependencies**
   ```bash
   npm install
   ```

8. **Build Production Bundle**
   ```bash
   npm run build
   ```

9. **Update System and Install Nginx**
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

10. **Start and Enable Nginx**
    ```bash
    sudo systemctl start nginx
    sudo systemctl enable nginx
    ```

11. **Copy Build Files to Web Server**
    - Copy code from dist (build files) to /var/www/html/
    ```bash
    sudo scp -r dist/* /var/www/html/
    ```

12. **Configure Nginx for Frontend and API Proxy**
    ```bash
    sudo nano /etc/nginx/sites-available/default
    ```
    
    Replace content with:
    ```nginx
    server {
        listen 80 default_server;
        listen [::]:80 default_server;

        server_name _;

        # Frontend - Serve React app
        location / {
            root /var/www/html;
            try_files $uri $uri/ /index.html;
        }

        # Backend API Proxy
        location /api/ {
            proxy_pass http://localhost:3000/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```

13. **Test and Restart Nginx**
    ```bash
    sudo nginx -t
    sudo systemctl restart nginx
    ```

14. **Verify BaseUrl Configuration**
    - Ensure `BaseUrl` in `src/utils/constant/constant.js` is set to:
    ```javascript
    export const BaseUrl = "/api"
    ```
    - This proxies all API requests through Nginx to the backend

15. **Enable Port 80**
    - Configure security groups in AWS to allow port 80
    - Go to EC2 Security Groups → Inbound Rules
    - Add rule: Port 80 (HTTP)

### Post-Deployment
- Verify frontend is accessible at `http://<your-ec2-public-ip>`
- All API requests will be proxied through `/api` endpoint
- Configure SSL certificate for HTTPS (port 443)
- Set up domain name
- Monitor Nginx logs: `sudo tail -f /var/log/nginx/access.log`
- Monitor application performance

## Adding a Custom Domain Name

### Prerequisites
- Registered domain (from GoDaddy, Namecheap, etc.)
- Cloudflare account (free tier available)
- EC2 instance public IP address

### Domain Setup Steps

1. **Purchase Domain Name**
   - Buy a domain from GoDaddy or similar registrar
   - Example: `devtinder.in`

2. **Create Cloudflare Account**
   - Sign up at [https://www.cloudflare.com/](https://www.cloudflare.com/)
   - Add your domain to Cloudflare

3. **Update Nameservers on GoDaddy**
   - Go to GoDaddy domain settings
   - Find "Nameservers" settings
   - Replace with Cloudflare nameservers provided by Cloudflare
   - Save changes

4. **Wait for DNS Propagation**
   - Nameserver updates can take 15-30 minutes
   - You can check status at [https://www.whatsmydns.net/](https://www.whatsmydns.net/)

5. **Add DNS Record in Cloudflare**
   - Go to Cloudflare Dashboard → DNS
   - Create new A record:
     - **Type:** A
     - **Name:** @ (or your subdomain)
     - **IPv4 Address:** Your EC2 instance public IP (e.g., `43.204.96.49`)
     - **TTL:** Auto
     - **Proxy status:** Proxied (orange cloud)

6. **Enable SSL/TLS in Cloudflare**
   - Go to SSL/TLS tab
   - Set encryption mode to "Full" or "Full (strict)"
   - Wait for SSL certificate to be issued (usually instant)

7. **Update Nginx Configuration**
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```
   
   Update the server_name line:
   ```nginx
   server_name devtinder.in www.devtinder.in;
   ```
   
   Then restart Nginx:
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

8. **Verify Domain Setup**
   - Wait 2-5 minutes for DNS to propagate
   - Visit your domain: `https://devtinder.in`
   - Check SSL certificate: Click padlock icon in browser

### Troubleshooting Domain Issues

- **DNS not resolving:** Check nameservers are updated at GoDaddy
- **SSL certificate not showing:** Wait 10-15 minutes for Cloudflare to issue it
- **Domain not pointing to site:** Verify A record IP address matches EC2 instance
- **Check DNS:** `nslookup devtinder.in` or `dig devtinder.in`
- **View Nginx errors:** `sudo tail -f /var/log/nginx/error.log`
