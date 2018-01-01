---
layout: page
title: Blog
permalink: /blog/
---
<h1>Blog Posts</h1>
{% for post in site.posts %}
  <hr/>
  <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
  <ul class="list-inline">
  {% for category in post.categories %}<li class="list-inline-item"><span class="badge badge-default"><a href="/tags#{{category}}" style="color: white;"><i class="fa fa-tag" aria-hidden="true"></i> <strong>{{category}}</strong></a></span></li>{% endfor %}
  </ul>
  <h6><a href="/">By {{post.author}}</a> - {{ post.date | date_to_long_string }}</h6>
{% endfor %}