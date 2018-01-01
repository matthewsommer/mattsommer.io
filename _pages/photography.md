---
layout: gallery
title: Photography
permalink: /photography/
---
<div id="mylightbox"></div>
<section id="photos">
{% assign image_files = site.static_files | where: "gallery", true %}
{% for myimage in image_files %}
<a href="#" data-featherlight="{{ myimage.path }}"><img src="{{ myimage.path }}"/></a>
{% endfor %}
</section>
