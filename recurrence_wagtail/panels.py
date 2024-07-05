from wagtail.admin.panels import FieldPanel
from .forms import RecurrenceWidget

class RecurrencePanel(FieldPanel):
    def __init__(self, *args, **kwargs):
        kwargs['widget'] = RecurrenceWidget
        super().__init__(*args, **kwargs)

    def classes(self):
        return super().classes() + ["w-panel--nested"]

    class BoundPanel(FieldPanel.BoundPanel):
        pass
