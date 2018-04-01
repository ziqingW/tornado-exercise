import os
import tornado.ioloop
import tornado.web
import tornado.log
import boto3
from jinja2 import \
    Environment, PackageLoader, select_autoescape

client = boto3.client(
    'ses', region_name="us-east-1",
    aws_access_key_id=os.environ.get('AWS_ACCESS_KEY'),
    aws_secret_access_key=os.environ.get('AWS_SECRET_KEY')
    )
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
        super().get()
        self.render_template("welcome.html", {})

class MainHandler(TemplateHandler):
    def get(self):
        super().get()
        name = self.get_query_argument('name', default='Cool guy')
        context = {
            'name': name
        }
        self.render_template("main.html", context)

class PageHandler(TemplateHandler):
    def get(self, page):
        super().get()
        page = page + ".html"
        self.render_template(page, {})

class TimeZoneHandler(TemplateHandler):
    def get(self):
        super().get()
        self.render_template("timezone.html", {})
        
    def post(self):
        pass

class MailformHandler(TemplateHandler):
    def get(self):
        super().get()
        self.render_template("mailform.html", {})
        
    def sendmail(self, name, subject, contents, rating):
        response = client.send_email(
            Destination={
            'ToAddresses': [
                'redtaq@hotmail.com',
            ],
            },
            Message={
            'Body': {
                'Html': {
                'Charset': 'UTF-8',
                'Data':  "<h3>{} sent you a mail, and he/she thought your site as \"{}\"!</h3><p>{}</p>".format(name, rating, contents)
            },
            'Text': {
                'Charset': 'UTF-8',
                'Data': "{} sent you a mail, and he/she thought your site as \"{}\"!\n\n{}".format(name, rating, contents)
            },
        },
        'Subject': {
            'Charset': 'UTF-8',
            'Data': subject,
        },
    },
    Source='mailer@bukarle.com',
    )
    
    def post(self):
        error = ""
        success = ""
        mailname = self.get_body_argument('mail-name', 'Cool guy')
        subject = self.get_body_argument('mail-title', None)
        contents = self.get_body_argument('contents', None)
        rating = self.get_body_argument('rating')
        if subject != None and contents != None:
            success = "Mail sent, thank you for your support!"
        else:
            error = "Fill the subject and contents plz"
        self.sendmail(mailname, subject, contents, rating)
        self.render_template("mailResponse.html", {'success': success, 'error': error})

def make_app():
    return tornado.web.Application([
        (r"/", WelcomeHandler),
        (r"/main", MainHandler),
        (r"/(tictactoe)", PageHandler),
        (r"/(wikiapp)", PageHandler),
        (r"/(simonsays)", PageHandler),
        (r"/(timezone)", PageHandler),
        (r"/mailform", MailformHandler),
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