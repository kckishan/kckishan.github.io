+++
# Projects widget.
widget = "projects"  # Do not modify this line!
active = false  # Activate this widget? true/false

title = "Projects"
subtitle = ""

# Order that this section will appear in.
weight = 16

# Content.
# Display content from the following folder.
# For example, `folder = "project"` displays content from `content/project/`.
folder = "project"

# View.
#   1 = List
#   3 = Card
#   5 = Showcase
view = 3

# Widget layout
# Legend: 0 = two columns (default), 1 = single column
widget_layout = 1

# For Showcase view, flip alternate rows?
flip_alt_rows = true

# Filter toolbar.

# Default filter index (e.g. 0 corresponds to the first `[[filter]]` instance below).
filter_default = 0

# Add or remove as many filters (`[[filter]]` instances) as you like.
# To show all items, set `tag` to "*".
# To filter by a specific tag, set `tag` to an existing tag name.
# To remove toolbar, delete/comment all instances of `[[filter]]` below.
[[filter]]
  name = "All"
  tag = "*"

 [[filter]]
  name = "Data Science"
  tag = "data-science"

[[filter]]
  name = "Deep Learning"
  tag = "deep-learning"

[[filter]]
  name = "Graph Representation Learning"
  tag = "graph-representation-learning"

 [[filter]]
  name = "Software Engineering"
  tag = "software-engineering"
+++

