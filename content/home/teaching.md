+++
# Custom widget.
# An example of using the custom widget to create your own homepage section.
# To create more sections, duplicate this file and edit the values below as desired.
widget = "custom"  # Do not modify this line!
active = false  # Activate this widget? true/false

# Note: a full width section format can be enabled by commenting out the `title` and `subtitle` with a `#`.
title = "Custom Section"
subtitle = ""

# Order that this section will appear in.
weight = 60
columns = "1"


# Background (optional).
#   Choose from a background color, gradient, or image.
#   Choose a dark or light text color, by setting `text_color_light`.
#   Delete or comment out (by prefixing `#`) any unused options.
[background]
  # Background color.
  # color = "navy"
  
  # Background gradient.
  gradient_start = "DeepSkyBlue"
  gradient_end = "SkyBlue"
  
  # Background image.
  # image = "headers/bubbles-wide.jpg"  # Name of image in `static/img/`.
  # image_darken = 0.6  # Darken the image? Range 0-1 where 0 is transparent and 1 is opaque.

  # Text color (true=light or false=dark).
  text_color_light = true

+++

{{% alert note %}}
This is an example of using the *custom* widget to create your own homepage section.

This section also demonstrates how to apply the *background* option to create an *image parallax* effect. Backgrounds can be applied to any section.
{{% /alert %}}

To remove this section, either delete `content/home/teaching.md` or edit the front matter of the file to deactivate the widget by setting `active = false`.
