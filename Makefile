#
# jquery.github.js
# Copyright (C) Kalan MacRow, 2013
# This code is MIT licensed <http://opensource.org/licenses/MIT>
#

DATE=$(shell date +%I:%M%p)

default:
	@echo "Building jquery.github.min.js..."
	@uglifyjs jquery.github.js -nc > jquery.github.min.js
	@echo "jquery.github successfully built at ${DATE}."
	