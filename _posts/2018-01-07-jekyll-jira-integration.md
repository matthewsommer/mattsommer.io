---
layout: post
title:  "Integrating Jira into a website hosted on GitHub Pages and built on Jekyll"
date:   2018-01-05 19:21:00 -0800
categories: Productivity Jira Jekyll GitHub-Pages
permalink: jekyll-jira-integration
comments: true
author: Matt Sommer
custom_js:
- jekyll-jira-chart
---
#### Some History

The past few years I've been struggling to find a task management tool good enough to sufficiently cooridinate the complexity of my life. On the surface it may seem like a simple problem to solve, there are thousands of tasks management tools surely one of them would be sufficient right? Nope; not in my opinion.

The thing is I'm not really looking for a task management tool, I'm looking for a life management tool. Task management tools are great for managing simple things such as 'mow the lawn' or 'go to the store' but with the increasing complexity of living life many of these task tracking tools break down. After all these years I'm still looking for some tool and I even tried to build my own product called Brisbe (unfortunately it didn't work out).

Until I find that holy grail of a productivity tool I'm going to use a tool called Jira. Jira is a popular, feature rich task tracking tool that I help implement at Tesla Motors, GoPro, and some other start-ups. Most people laugh when I tell them I use Jira to organize my personal life because Jira seem to them to be overkill for personal life but I think it's not poweful enough. I'll discuss why I think it's not good enough in fugure blog posts but for this blog post I'll give some insight into how I'm extending Jira by integrating it with my personal website MattSommer.io.

#### There are three main components to my setup:

1. Jira Configuration
2. Static website hosted on Github Pages
3. Displaying dyanmic Jira data within the webpage

#### 1. Jira Configuration
I've learned a lot over the years on how people work and collaborate, I'll write a book about it someday but for this blog post I'm going to be as high level as possible.

The most important insight I can provide is to group tasks by their function and to properly estimate the complexity of tasks.

To organize my work by function I create projects in Jira by functionality instead of the traditional idea of a project. So instead of creating a project "Remodel the upstairs bathroom" I created a project called "Household" and any work that is a function of my household, such as a bathroom remodel, would go into this project.

The second important part is properly estimating the complexity of tasks. I like using the terminology 'Epic', 'Story', and 'Task'. An Epic is a task which is complex and usually involves many people and needs cross-functional work to be completed. Stories are the most important, they are single function and usually all the work is done by a one person. A simple Task is a small amount of work to be done by a single person and can be completed in a short amount of time. Epics are made up of Stories, Stories are made up of Tasks.

That's the basics. There is a lot more involved then when I could type here but starting with what I've recommended here I've set up a great model to be able to be more organized with my life.

#### 2. Static website hosted on Github Pages

GitHub Pages is a webhosting service that's becoming popular and it's easy to see why. Simple, great versioning with Git, serverless, and you can't beat the free price! I have one location for the website source code and I don't have to manage any servers. Great!


#### 3. Displaying dyanmic Jira data within the webpage

Jira is a great tool but the UI/UX is just okay and has some shortcomings, hence why I wanted to build my own tool. To get a better visualization I wanted to be able to control my UX but still use Jira has the backend database/controller. So tying it all together I used Javascript Ajax to get data from my Jira instance and display it on my website.

I've glossed over a lot here but to help get a better visual here are some examples. All the information shown is pulled from Jira.

##### Examples
* [Education related tasks such as taking an online course][Android Nanodegree]{:target="_blank"}
* [My Epic I used for working on this project and blog post][MATTSOMMERV1.1]{:target="_blank"}
* [Last spring I took a 3 month trip in my RV][RV Trip]{:target="_blank"}
* [I track my reading list in Jira][Reading]{:target="_blank"}

I'm happy with what I have so far but I feel this is only the tip of the iceberg. There are some cool features I want to implement such as displaying book cover images for my reading list and using Google maps to display location information. There are also some code issues such as page data refreshing I need to fix. Time to start planning MattSommer.io V1.2!

[MattSommer.io]: https://mattsommer.io
[MATTSOMMERV1.1]: https://mattsommer.io/task/?id=21599
[Android Nanodegree]: https://mattsommer.io/task/?id=13201
[RV Trip]: https://mattsommer.io/task/?id=21618
[Reading]: https://mattsommer.io/reading/