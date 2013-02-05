# jquery.github.js

An extremely simple plugin component based on jQuery and Bootstrap to display the <i>N</i> most recent commits across all of your repositories. It's modelled on GitHub's own <i>Commits</i> tab in the repository view.

# Quick Start

To get started just grab the script, include it on your page (along with jQuery and Bootstrap) and do something like the following:

```javascript
$(document).ready(function(){
	$('#my_github').github({
		'user': 'your-github-login',
		'display': 5
	});
}); 
```

