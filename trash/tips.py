class TipsHandler(TemplateHandler):
    def calculate(self, bill, service):
        if service == "great":
            level = 0.2
        elif service == "good":
            level = 0.18
        elif service == "fair":
            level = 0.15
        elif service == "bad":
            level = 0.1
        else:
            level = 0
        tips = float(bill) * level
        total = tips + float(bill)
        return {'tips': "{:.2f}".format(tips),
            'total': "{:.2f}".format(total)
        }
    
    def post(self):
        bill = self.get_body_argument('bill', '0')
        service = self.get_body_argument('service', 'fair')
        if float(bill) < 0:
            self.render_template("tipsError.html", {})
        else:
            bills = self.calculate(bill, service)
            context = {
                'bill': bill,
                'tips': bills['tips'],
                'total': bills['total'],
                'service': service
            }
            self.render_template("tips.html", context)