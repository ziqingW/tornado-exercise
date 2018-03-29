import os
import tornado.ioloop
import tornado.web
import tornado.log
from jinja2 import \
    Environment, PackageLoader, select_autoescape

ENV = Environment(
    loader=PackageLoader('myapp', 'templates'),
    autoescape=select_autoescape(['html', 'xml']))
    
class TemplateHandler(tornado.web.RequestHandler):
    def render_template(self, tpl, context):
        template = ENV.get_template(tpl)
        self.write(template.render(**context))
        
    def get(self):
        self.set_header('Cache-Control',
      'no-store, no-cache, must-revalidate, max-age=0')
        
class WelcomeHandler(TemplateHandler):
    def get(self):
        self.render_template("welcome.html", {})

class MainHandler(TemplateHandler):
    def get(self):
        name = self.get_query_argument('name', default='Cool guy')
        context = {
            'name': name
        }
        self.render_template("main.html", context)

class TicHandler(TemplateHandler):
    def get(self):
        self.render_template("tictactoe.html", {})
        
class WikiHandler(TemplateHandler):
    def get(self):
        self.render_template("wikiapp.html", {})        

def make_app():
    return tornado.web.Application([
        (r"/", WelcomeHandler),
        (r"/main", MainHandler),
        (r"/tictactoe", TicHandler),
        (r"/wikiapp", WikiHandler),
        (r"/static/(.*)", tornado.web.StaticFileHandler,
        {'path': 'myapp/static'})
        ],
        autoreload=True)

if __name__ == "__main__":
    tornado.log.enable_pretty_logging()
    app = make_app()
    PORT = int(os.environ.get('PORT', '2000'))
    app.listen(PORT)
    print('starting...')
    tornado.ioloop.IOLoop.current().start()