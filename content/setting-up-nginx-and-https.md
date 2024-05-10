Title: Self-hosting a minimal website with nginx and HTTPS
Date: 2024-04-27
Category: Software
Tags: backend, nginx, https
Slug: setting-up-nginx-and-https

This website is now self-hosted on a Raspberry Pi server at home. I had
struggled with nginx and HTTPS in the past, so was rather pleasantly
surprised to see how straightforward it was.

I couldn't find anything on the web that walked one through the whole
process, so here are the steps that I took, in some order. (This isn't
meant to be a full tutorial, sorry.)

The site now serves static content using
[Pelican](https://getpelican.com). Much nicer than WordPress. More on
Pelican in a future post, but for now let us take it for granted that we
just want to serve static files in `/home/jmft2/jmft.dev/public_html`.


## DNS and firewall

* Add a suitable DNS record to your home network. I use
    [No-IP](https://noip.com) and then use an ALIAS record.
* Set up port forwarding on ports 80 and 443 on your firewall (in your
    router settings).


## Setting up nginx

* Install nginx:
```bash
sudo apt install nginx
```

* Create a minimal config file at `~/jmft.dev/nginx_config`:
```
server {
    server_name jmft.dev;

    access_log /home/jmft2/jmft.dev/logs/nginx-access.log;
    error_log /home/jmft2/jmft.dev/logs/nginx-error.log;

    location / {
        alias /home/jmft2/jmft.dev/public_html/;
        index index.html;
    }
}
```

* Make the directory for logs:
```
mkdir ~/jmft.dev/logs
```

* Make symlinks to the `sites-available` and `sites-enabled` directories
  in `/etc/nginx`:
```bash
sudo ln -s ~/jmft.dev/nginx_config /etc/nginx/sites-available/jmft.dev
sudo ln -s /etc/nginx/sites-available/jmft.dev /etc/nginx/sites-enabled/jmft.dev
```

* Make sure the `public_html` directory *and all its parents* are
    readable by the `www-data` user. One way is this:
```bash
chmod a+rX ~ ~/jmft.dev ~/jmft.dev/public_html
```

* Check the configuration, and if it is successful, load it:
```bash
sudo nginx -t && sudo systemctl reload nginx
```

At this point, going to `http://jmft.dev` (no https) should show you the
`index.html` page for the site.


## Setting up HTTPS

LetsEncrypt recommend using [Certbot](https://certbot.eff.org/), which
made the HTTPS installation process very straightforward.

* Certbot is managed by the Snap package manager, so it is first
    necessary to install that:
```bash
sudo apt install snapd
sudo systemctl restart snapd  # might be needed
sudo snap install core
sudo snap install --classic certbot
```
* Run Certbot and follow the instructions:
```bash
sudo certbox --nginx
```
* Reload the new nginx configurations:
```bash
sudo systemctl reload nginx
```
With this set up, going to `https://jmft.dev` should bring the site up.
