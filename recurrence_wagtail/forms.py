from django import forms
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _
from django.contrib.staticfiles.storage import staticfiles_storage
from datetime import datetime
from recurrence.forms import RecurrenceWidget as OriginalRecurrenceWidget

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
            staticfiles_storage.url("recurrence/js/recurrence.js"),
            staticfiles_storage.url("recurrence/js/recurrence-widget.js"),
            staticfiles_storage.url("recurrence/js/recurrence-widget-wagtail.js"),
            staticfiles_storage.url("recurrence/js/recurrence-widget.init.js"),
        ]
        return forms.Media(
            js=js,
            css={
                "all": (staticfiles_storage.url("recurrence/css/recurrence_wagtail.css"),),
            },
        )

    media = property(get_media)

