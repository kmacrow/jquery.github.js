# jquery.github.js

This plugin is the easiest way to display your most recent GitHub contributions. Thanks to Bootstrap it is responsive from large displays all the way down to phones. In the future I may provided a hosted version on GitHub pages. 

<img src="http://kmacrow.github.com/images/jquery-github-js-screen.png" />

# Setup

To get started you'll need to include the latest versions of <a href="http://jquery.com/download/">jQuery</a> and <a href="https://github.com/twitter/bootstrap">Bootstrap</a> on your page. Then simply add a layer where you want the plugin to render:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<link href="bootstrap.min.css" rel="stylesheet" />
		<script src="jquery.min.js"></script>
	</head>
	<body>
		<div id="github">
			<!-- plugin will render here... -->
		</div>
	</body>
</html>
```  

And initialize it when the document loads:

```javascript
$(document).ready(function(){
	$('#github').github({
		// put your username here
		   'user': 'you',
		// number of commits to show
		'display': 5
	});
}); 
```

# Authors
<dl>
	<dt>Kalan MacRow</dt>
	<dd><a href="https://twitter.com/KalanMacRow">@KalanMacRow</a>, <a href="http://cs.ubc.ca/~kalanwm">Personal page</a></dd>
</dl>


# License

This code is licensed under the MIT license. It is provided "as is", without warranty of any kind, express or implied. Please see the LICENSE included with the code. 
