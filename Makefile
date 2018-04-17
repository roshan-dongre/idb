GithubID = kasrasadeghi
RepoName = idb
SHA      = c2387c9e85467deb5b1e88d2bf647bad09e3fdcf

githubid:
	@echo "roshan-dongre"

reponame:
	@echo "idb"

sha:
	@echo "FILL IN SHA HERE"

# make github   - prints link to github repo
github:
	@echo "http://www.github.com/roshan-dongre/idb"

# make issues   - prints link to current phase's issues
issues:
	@echo "http://www.github.com/roshan-dongre/idb/issues"

# make stories  - prints link to current phase's stories
stories:
	@echo "PUT LINK TO CURRENT PHASE STORIES HERE"

# make uml      - prints link to uml diagram
uml:
	@echo "NEED GIT SHA TO DO THIS"

# make selenium - runs selenium tests
selenium:
	python frontend/guitests.py

# make frontend - runs frontend tests
frontend:
	@(cd frontend; npm test)

# make backend  - runs backend tests
backend:
	python backend/tests.py

# make website  - prints link to a website
website:
	@echo "http://ontherun.me/"

# make report   - prints link to technical report
report:
	@echo "https://roshan-dongre.gitbooks.io/report/"

# make apidoc   - prints link to api documentation
apidoc:
	@echo "https://roshan-dongre.gitbooks.io/api/"

# make self     - prints link to self critique
self:
	@echo "https://roshan-dongre.gitbooks.io/report/self-critique.html"

# make other    - prints link to other critique
other:
	@echo "http://roshan-dongre.gitbooks.io/report/other-critique.html"