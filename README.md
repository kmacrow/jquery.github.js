# github.jquery.js

github.jquery.js is an extremely simple plugin component based on jQuery and Bootstrap to
display the <i>N</i> most recent commits across all of your repositories. It's
modelled after GitHub's own Commits tab in the repository view.

To get started just grab the script, include it on your page along with jQuery and do
something like the following:

```
$(document).ready(function(){
	$('#my_github').github({
		'user': 'your-github-login',
		'display': 5
	});
}); 
```

