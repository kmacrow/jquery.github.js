# Example

This section provides a complete, working example. 

* Download the minified plugin <code>jquery.github.min.js</code>
* Copy and paste the following code into a new file <code>github.html</code>

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<!-- Bootstrap CDN -->
		<link href="http://bit.ly/WcHlyO" rel="stylesheet">
		<!-- jQuery CDN -->
		<script src="http://code.jquery.com/jquery-latest.js"></script>
		<!-- GitHub plugin -->
		<script src="jquery.github.min.js"></script>

		<script type="text/javascript">
			$(document).ready(function(){
				$('#github').github({
					// put your username here
					   'user': 'you',
					// number of commits to show
					'display': 5
				});
			});
		</script>
	</head>
	<body>
		<div id="github">
			<!-- plugin will render here... -->
		</div>
	</body>
</html>

```

* Replace 'you' (in the code) with your GitHub user name.

* Start a web server in the directory where <code>github.html</code> lives:
```bash
$ python -m SimpleHTTPServer 8888
```
* Navigate to http://localhost:8888/github.html in Google Chrome (or any browser that does not enforce same-origin when running under localhost.)
