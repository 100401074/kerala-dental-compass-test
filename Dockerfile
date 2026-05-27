FROM nginx:1.27

RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/
COPY kochi.html /usr/share/nginx/html/
COPY clinic-dentique.html /usr/share/nginx/html/
COPY cost-dental-implant.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY robots.txt /usr/share/nginx/html/
COPY sitemap.xml /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -fsS http://localhost/ > /dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
