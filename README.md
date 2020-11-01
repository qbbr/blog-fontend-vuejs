# blog-frontend-vuejs

Blog Frontend App on Vue.js without `node_modules/` trash and any craps

see backend's:

 * [blog-backend-symfony](https://github.com/qbbr/blog-backend-symfony) on PHP7.4
 * [blog-backend-flask](https://github.com/qbbr/blog-backend-flask) on Python3

## depends

 * Any web server
 * Any browser support [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

## run

```bash
# start web server
busybox httpd -f -p 8666
# or use one of way:
#php -S 127.0.0.1:8666
#python -m http.server 8666
#python2 -m SimpleHTTPServer 8666
#ruby -r webrick -e 'WEBrick::HTTPServer.new(:Port => 8666, :DocumentRoot => Dir.pwd).start'
#ruby -run -e httpd . -p 8666
# open in browser
x-www-browser http://127.0.0.1:8666/
```
