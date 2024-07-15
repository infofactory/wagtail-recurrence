from django import forms
from recurrence.forms import RecurrenceWidget as OriginalRecurrenceWidget
from wagtail.admin.staticfiles import versioned_static

class RecurrenceWidget(OriginalRecurrenceWidget):
    template_name = "recurrence/recurrence_widget_wagtail.html"

    def get_context(self, name, value, attrs):
        context = super().get_context(name, value, attrs)

        context["panel_template_attrs"] = {
            "data-recurrence-template": "panel",
        }
        return context

    def get_media(self):
        js = [
            versioned_static("recurrence/js/recurrence.js"),
            versioned_static("recurrence/js/recurrence-widget.js"),
            versioned_static("recurrence/js/recurrence-widget-wagtail.js"),
            versioned_static("recurrence/js/recurrence-widget.init.js"),
        ]
        return forms.Media(
            js=js,
            css={
                "all": (versioned_static("recurrence/css/recurrence_wagtail.css"),),
            },
        )

    media = property(get_media)

