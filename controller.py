import os
import tornado.ioloop
import tornado.web
from jinja2 import \
    Environment, PackageLoader, select_autoescape

ENV = Environment(
    loader=PackageLoader('myapp', 'templates'),
    autoescape=select_autoescape(['html', 'xml']))
    
class TemplateHandler(tornado.web.RequestHandler):
    def render_template(self, tpl, context):
        template = ENV.get_template(tpl)
        self.write(template.render(**context))
        
class MainHandler(TemplateHandler):
    def get(self):
        self.set_header('Cache-Control',
      'no-store, no-cache, must-revalidate, max-age=0')
        self.render_template("modal.html", {})

class NameHandler(TemplateHandler):
    def get(self):
        self.set_header('Cache-Control',
      'no-store, no-cache, must-revalidate, max-age=0')
        name = self.get_query_argument('name', 'Cool guy')
        context = {
            'name': name
        }
        self.render_template("name.html", context)

class AnotherHandler(TemplateHandler):
    def get(self, name):
        self.set_header('Cache-Control',
      'no-store, no-cache, must-revalidate, max-age=0')
        self.write("Hello, {}".format(name))
    
def make_app():
    return tornado.web.Application([
        (r"/", NameHandler),
        (r"/name/(.*)", AnotherHandler),
        (r"/static/(.*)", tornado.web.StaticFileHandler,
        {'path': 'myapp/static'})
        ],
        autoreload=True)

if __name__ == "__main__":
    app = make_app()
    PORT = int(os.environ.get('PORT', '2000'))
    app.listen(PORT)
    tornado.ioloop.IOLoop.current().start()
