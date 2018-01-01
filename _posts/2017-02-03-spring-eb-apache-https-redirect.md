---
layout: post
title:  "Redirect HTTP to HTTPS - Spring Boot - Elastic Beanstalk Load Balancer"
date:   2017-02-03 12:00:00 -0800
categories: HTTPS Elastic-Beanstalk Load-Balancer AWS
permalink: spring-eb-apache-https-redirect
comments: true
redirect_from: "/blog/spring-eb-apache-https-redirect.html"
author: Matt Sommer
---
Yesterday I had a difficult time getting [AWS Elastic Beanstalk][AWSEB]{:target="_blank"} redirecting HTTP traffic to HTTPS with an AWS classic load balancer and a Spring Boot app. I'm using a simple standard configuration for high-availablity Elastic Beanstalk: 64bit Amazon Linux 2016.09 v2.5.1 running Tomcat 8 Java 8. My app is set to use provided Tomcat so my solution cannot use the Spring Boot TomcatEmbeddedServletContainerFactory which some solutions on they internet suggest. Also I didn't want to ssh into any EC2 instances as that solution wouldn't scale.

When AWS refers to Classic Load Balancer they're talking about Apache2 load balancer. You could also set up NGINX but I don't discuss that here, you should be able to figure it out with this post (and poke around the AWS Labs Github repo linked below). AWS' has new options for [Application Load Balancing][ALB]{:target="_blank"} but this is something you'll have to enable.

There are a few stackoverflow posts which helped me come up with a solution, but [this QA][STACK_QA]{:target="_blank"} was by far the most helpful with [Zags][ZAGS]{:target="_blank"} answer giving me the guidance I needed. In their solution rewrite_module isn't enabled by default so you'll get an error "Invalid command 'RewriteEngine', perhaps misspelled or defined by a module not included in the server configuration". It seems like this was a change from Apache2.2 but I couldn't find anything in the change logs. There is an easy fix, load the module first:
<hr/>
    LoadModule rewrite_module modules/mod_rewrite.so
<hr/>
The other issue I dealt with was finding the correct directory location to put my .ebextensions conf files. What worked for
me was putting the file here:
<hr/>
    /src/main/webapp/.ebextensions/httpd/conf.d/elasticbeanstalk.conf
<hr/>
[Apache Module mod_rewrite documentation][MOD_REWRITE]{:target="_blank"} explains the syntax for mod_rewrite and there are also some [helpful examples given here][RewriteHTTPToHTTPS]{:target="_blank"}. The code I ended up using is from [AWS Labs][AWSLABS]{:target="_blank"} and is shown here (be careful copying and pasting, whitespace matters):
<hr/>
{% highlight bash %}
&lt;VirtualHost *:80&gt;
    LoadModule rewrite_module modules/mod_rewrite.so
    
    RewriteEngine On
    RewriteCond %{HTTP:X-Forwarded-Proto} !https
    RewriteCond %{HTTP_USER_AGENT} !ELB-HealthChecker
    RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI}
    
    &lt;Proxy *&gt;
        Order deny,allow
        Allow from all
    &lt;/Proxy&gt;
    
    ProxyPass / http://localhost:8080/ retry=0
    ProxyPassReverse / http://localhost:8080/
    ProxyPreserveHost on
    
    ErrorLog /var/log/httpd/elasticbeanstalk-error_log
    
&lt;/VirtualHost&gt;
{% endhighlight %}
<hr/>
I found this code here: [AWS Labs .ebextensions HTTPS redirection for Java and Tomcat][HTTPS_REDIRECT]{:target="_blank"}

I'm most likly going to change the rewrite rule to include HTTP response status 301 to indicate a perminant redirect.'
<hr/>
    RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
<hr/>
If you notice another wrong with this post or know a better way, please [create an issue on github.][ISSUES]{:target="_blank"}

I've created an example Spring Boot app to help get you started: [<i class="fa fa-github-square fa-2x" aria-hidden="true"></i> Github Example Code][EXAMPLE_CODE]{:target="_blank"}

[AWSEB]: https://aws.amazon.com/elasticbeanstalk/
[HTTPS_REDIRECT]:https://raw.githubusercontent.com/awslabs/elastic-beanstalk-docs/a34abd27ee0a2a8d1eb17ef07b1f383fe624f97d/configuration-files/aws-provided/security-configuration/https-redirect/java-tomcat/https-redirect-java-tomcat/httpd/conf.d/elasticbeanstalk.conf
[MOD_REWRITE]: http://httpd.apache.org/docs/current/mod/mod_rewrite.html
[AWSLABS]: https://github.com/awslabs
[RewriteHTTPToHTTPS]: https://wiki.apache.org/httpd/RewriteHTTPToHTTPS
[ALB]: https://aws.amazon.com/elasticloadbalancing/applicationloadbalancer/
[ZAGS]: http://stackoverflow.com/users/2800876/zags
[STACK_QA]: http://stackoverflow.com/questions/14693852/how-to-force-https-on-elastic-beanstalk
[EXAMPLE_CODE]: https://github.com/matthewsommer/spring-elasticbeanstalk-loadbalancer-https-redirect
[ISSUES]: https://github.com/matthewsommer/matthewsommer.github.io/issues