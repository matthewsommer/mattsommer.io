---
layout: page
title:  Tags
permalink: tags
---
<h1>Tags</h1>
<hr/>
{% for category in site.categories %}<a href="#{{ category | first }}" style="color:white;"><span class="badge badge-default"><i class="fa fa-tag" aria-hidden="true"></i> {{ category | first }}</span></a>{% unless forloop.last %} - {% endunless %}{% endfor %}
<h1>Posts by Tag</h1>
<hr/>
{% for tag in site.categories %} 
  <h2 id="{{ tag[0] }}"><span class="badge badge-default"><a name="{{ tag[0] }}" class="anchor"><i class="fa fa-tag" aria-hidden="true"></i> {{ tag[0] }}</a></span></h2>
  <ul class="post-list">
    {% assign pages_list = tag[1] %}  
    {% for post in pages_list %}
      {% if post.title != null %}
      {% if group == null or group == post.group %}
      <li><a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a></li>
      {% endif %}
      {% endif %}
    {% endfor %}
    {% assign pages_list = nil %}
    {% assign group = nil %}
  </ul>
{% endfor %}