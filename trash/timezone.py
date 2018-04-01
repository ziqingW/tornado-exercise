from datetime import datetime
from pytz import timezone
import pytz

    
class TimeZoneHandler(TemplateHandler):
    def get(self):
        super().get()
        self.render_template("timezone.html", {})
        
    def time_converter(self, localTime, localZone, destinationZone):
        fmt = '%m-%d-%Y %H:%M:%S'
        loc_zone = timezone(localZone)
        des_zone = timezone(destinationZone)
        t = loc_zone.localize(datetime.strptime(localTime, fmt))
        t.astimezone(pytz.UTC)
        return t.astimezone(des_zone).strftime(fmt)

    def post(self):
            local_date = self.get_body_argument('date', None)
            local_time = self.get_body_argument('time', None)
            local_datetime = "{} {}".format(local_date, local_time)
            local_zone = self.get_body_argument('local-timezone', None)
            destin_zone = self.get_body_argument('destin-timezone', None)
            destin_time = self.time_converter(local_datetime, local_zone, destin_zone)
            self.render_template("timezone_result.html", {'destin-time': destin_time})