<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    
    <title>Twitter / Authorize an application</title>
    <meta name="HandheldFriendly" content="True" />
    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />
    <link rel="stylesheet" type="text/css" href="https://abs-0.twimg.com/login/m2-oauth.9c2ec1c97fe0a9ad6b322ec265dca275a39f4876.css">
  </head>

  <body class="oauth western en" id="authorize">
    <div class="timeline-head">
      <div><img alt="Twitter" class="logo" src="https://abs.twimg.com/a/1422040412/images/twttr_bird_tos.gif"></div>
    </div>

    <br clear="all" />


    <div class="head">
      <h1>Authorize Application</h1>
    </div>

    <div class="body">
          <h3>
  <img alt="" class="app-icon" src="https://abs.twimg.com/a/1404172626/images/oauth_application.png" title="book2img">
  <b>book2img</b>
</h3>

<p class="app-info">
  
  <br>aa1.versus.jp/revolt/
  <br><a href="http://aa1.versus.jp/revolt/callback.php?denied=F0gGmgAAAAAAwXjpAAABXqos4Dg" class="deny"> Return to app</a>
</p>
    <br/>
    
<div class="permissions allow">
  <p><strong>This application will be able to:</strong></p>
  <ul>
      <li>Read Tweets from your timeline.</li>


      <li>See who you follow, and follow new people.</li>
      <li>Update your profile.</li>
      <li>Post Tweets for you.</li>



  </ul>
</div>


    <form action="https://api.twitter.com/oauth/authorize" id="login_form" method="post" target="_self">
      <div>
        <input name="authenticity_token" type="hidden" value="d733b2d6607ace382f8782cc1c62bf032f71881d">
        <input name="redirect_after_login" type="hidden" value="https://api.twitter.com/oauth/authorize?oauth_token=F0gGmgAAAAAAwXjpAAABXqos4Dg">
      </div>
      <input id="oauth_token" name="oauth_token" type="hidden" value="F0gGmgAAAAAAwXjpAAABXqos4Dg">
      <input id="lang" name="lang" type="hidden" value="en">

        <div class="oauth-step"><b>Username or email</b></div>
        <div class="oauth-step"><input class="text" id="username_or_email" name="session[username_or_email]" type="text" value=""></div>
        <div class="oauth-step"><b>Password</b></div>
        <div class="oauth-step"><input class="password" id="session[password]" name="session[password]" type="password" value=""></div>
        <br />
          <input type="hidden" name="ui_metrics" autocomplete="off">
          <script src="https://twitter.com/i/js_inst?c_name=ui_metrics" async></script>

      <div class="buttons">
        <input type="submit" class="" name="" id="allow" tabindex="" value="Authorize">
        <input type="submit" class="" name="cancel" id="cancel" tabindex="" value="Cancel">
      </div>

    </form>


      <p class="not-signed-up">
        Don't have a Twitter account?
        <a href="https://twitter.com/signup?context=oauth&amp;oauth_token=F0gGmgAAAAAAwXjpAAABXqos4Dg" class="register alternate-context">Sign up for Twitter</a>.</p>
      <br />


    <div class="permissions deny">
  <p><strong>Will not be able to:</strong></p>
  <ul>

      <li>Access your direct messages.</li>

      <li>See your email address.</li>

    <li>See your Twitter password.</li>
  </ul>
</div>
    <br/>
    <div class="disclaimer" role="contentinfo">

      
  <p class="tip">You can revoke access to any application at any time from the <a href="https://twitter.com/settings/applications" target="_blank">Applications tab</a> of your Settings page.</p>
  <p><small>By authorizing an application you continue to operate under <a href="https://twitter.com/tos" target="_blank">Twitter's Terms of Service</a>. In particular, some usage information will be shared back with Twitter. For more, see our <a href="https://twitter.com/privacy" target="_blank">Privacy Policy</a>.</small></p>


    </div>


    </div>

    <div class="footer">
      <br /><br />
      &#169; 2006-2017 Twitter, Inc.
    </div>
  </body>
</html>
